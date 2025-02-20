package kr.co.dmdm.component.chat;

import kr.co.dmdm.dto.fight.ChatUserDto;
import kr.co.dmdm.dto.fight.request.RoomUpdateRequestDto;
import kr.co.dmdm.dto.fight.request.VoteRequestDto;
import kr.co.dmdm.dto.fight.response.ChatMessageResponseDto;
import kr.co.dmdm.dto.fight.response.VoteResponseDto;
import kr.co.dmdm.repository.dao.fight.ChatRoomDao;
import kr.co.dmdm.type.FightNotice;
import kr.co.dmdm.type.FightStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * packageName    : kr.co.dmdm.component.chat
 * fileName       : ChatRoomManager
 * author         : 최기환
 * date           : 2025-02-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-20        최기환       최초 생성
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ChatRoomManager {
    private final Map<Long, Integer> chatRoomTimers = new ConcurrentHashMap<>();
    private final Map<Long, List<ChatUserDto>> chatUsers = new ConcurrentHashMap<>();
    private final Map<Long, Map<String, FightStatus>> chatRoomRequest = new ConcurrentHashMap<>();
    private final Map<Long, Map<String, String>> userVotes = new ConcurrentHashMap<>();
    private final ChatRoomDao chatRoomDao;
    private final SimpMessagingTemplate messagingTemplate;

    @Scheduled(fixedRate = 1000) // 1초마다 실행
    public void updateTimers() {
        // 타이머가 없으면 조기에 종료
        if (chatRoomTimers.isEmpty()) {
            return;
        }

        chatRoomTimers.forEach((chatRoomId, remainingTime) -> {
            if (remainingTime <= 0) {
                deleteInfo(chatRoomId);
            } else {
                chatRoomTimers.put(chatRoomId, remainingTime - 1);
                messagingTemplate.convertAndSend("/subscribe/timer." + chatRoomId, remainingTime - 1);
            }
        });
    }

    public List<ChatUserDto> getChatUsers(Long roomId) {
        return chatUsers.computeIfAbsent(roomId, id -> new ArrayList<>());
    }

    public Map<String, FightStatus> getRoomRequest(Long chatRoomId) {
        return chatRoomRequest.computeIfAbsent(chatRoomId, id -> new ConcurrentHashMap<>());
    }

    public Map<String, String> getVoteData(Long chatRoomId) {
        return userVotes.computeIfAbsent(chatRoomId, id -> new ConcurrentHashMap<>());
    }

    /**
     * 토론 시간 요청 처리 함수
     */
    public void handleRequest(Long chatRoomId, FightStatus fightStatus) {
        switch (fightStatus) {
            case START:
                startTimer(chatRoomId);
                break;
            case END:
                stopTimer(chatRoomId);
                break;
            case EXTEND:
                extendTimer(chatRoomId);
                break;
            default:
                break;
        }
    }

    /**
     * 토론 시작
     */
    private void startTimer(Long chatRoomId) {
        System.out.println(chatRoomId + "번 방, 타이머 시작" + 3600);
        chatRoomTimers.put(chatRoomId, 3600);
    }

    /**
     * 토론 마감
     */
    private void stopTimer(Long chatRoomId) {
        System.out.println("토론 중지");
        deleteInfo(chatRoomId);
        messagingTemplate.convertAndSend("/subscribe/timer." + chatRoomId, 0);
    }

    /**
     * 토론 연장
     */
    private void extendTimer(Long chatRoomId) {
        System.out.println("토론 연장");
        chatRoomTimers.compute(chatRoomId, (k, remainingTime) -> (remainingTime == null ? 0 : remainingTime) + 1800);
    }

    /**
     * 사용자 참여
     */
    public List<ChatUserDto> joinUser(ChatUserDto request, Long chatRoomId) {
        for (ChatUserDto element : getChatUsers(chatRoomId)) {
            if (element.getUsername().equals(request.getUsername()) &&
                    element.getNickname().equals(request.getNickname())
            ) {
                return getChatUsers(chatRoomId);
            }
        }

        getChatUsers(chatRoomId).add(request);
        return getChatUsers(chatRoomId);
    }

    /**
     * 사용자 퇴장
     */
    public List<ChatUserDto> leaveUser(ChatUserDto request, Long chatRoomId) {
        getChatUsers(chatRoomId).remove(request);
        // todo 토론자일시 중지 요청
        return getChatUsers(chatRoomId);
    }

    /**
     * 요청 추가 및 요청 처리
     *
     * @return 메시지 DTO
     */
    public ChatMessageResponseDto requestInsert(Long chatRoomId, String username, String request) {
        Map<String, FightStatus> requestMap = getRoomRequest(chatRoomId);

        FightStatus fightStatus = FightStatus.getFightStatus(request);

        if (fightStatus != null) {
            //클라에서 보낸 값이 fightStatus 값이 있는지 확인
            boolean proceed = requestMap.containsValue(fightStatus);

            //동일 K, V면 null 반환
            if (fightStatus.equals(requestMap.get(username))) {
                return null;
            }

            //두 변수와 값이 일치하는 enum 선언
            FightNotice fightNotice = FightNotice.getFightNotice(fightStatus, proceed);

            //요청 Map 에 요청 추가
            requestMap.put(username, fightStatus);

            //동일 K, V를 넣어도 작동함 이에 유의 바람(이점은 위에서 해결)
            //값이 있으면 요청 Map clear 및 요청 실행
            if (proceed) {
                requestMap.clear();
                handleRequest(chatRoomId, fightStatus);
            }

            //요청 처리 후 메시지 반환
            return new ChatMessageResponseDto("NOTICE", (!proceed ? username + "님이 " : "") + fightNotice.getMessage());
        }
        return null;
    }

    /**
     * 투표 등록
     *
     * @return 투표결과 반환
     */
    public VoteResponseDto registerVote(Long chatRoomId, VoteRequestDto request) {
        Map<String, String> votes = getVoteData(chatRoomId);

        if (request == null) {
            return voteResult(votes);
        }

        if (request.getVote() == null) {
            votes.remove(request.getUsername());
        } else {
            votes.put(request.getUsername(), request.getVote());
        }

        return voteResult(votes);
    }

    /**
     * 투표 결과
     */
    public VoteResponseDto voteResult(Map<String, String> votes) {
        VoteResponseDto voteResult = new VoteResponseDto(0, 0);

        for (String key : votes.keySet()) {
            if (votes.get(key).equals("LEFT")) {
                voteResult.setLeftVote(voteResult.getLeftVote() + 1);
            } else if (votes.get(key).equals("RIGHT")) {
                voteResult.setRightVote(voteResult.getRightVote() + 1);
            }
        }

        return voteResult;
    }

    /**
     * 채팅방 정보 삭제
     */
    public void deleteInfo(Long chatRoomId) {
        VoteResponseDto voteResponse = voteResult(getVoteData(chatRoomId));

        chatRoomDao.updateChatRoom(
            new RoomUpdateRequestDto(
                Math.toIntExact(chatRoomId),
                voteResponse.getLeftVote(),
                voteResponse.getRightVote()
            )
        );

        chatRoomTimers.remove(chatRoomId);
        chatUsers.remove(chatRoomId);
        chatRoomRequest.remove(chatRoomId);
        userVotes.remove(chatRoomId);
    }
}
