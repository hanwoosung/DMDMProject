package kr.co.dmdm.component;

import kr.co.dmdm.dto.fight.response.ChatMessageResponseDto;
import kr.co.dmdm.service.chat.ChatRoomSocketService;
import kr.co.dmdm.type.FightNotice;
import kr.co.dmdm.type.FightStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * packageName    : kr.co.dmdm.component
 * fileName       : TimerScheduler
 * author         : 최기환
 * date           : 2025-01-27
 * description    : 채팅방 타이머 요청 컨트롤
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-27        최기환       최초 생성
 * 2025-02-04        황승현       타이머 설정 처리, 요청 분리
 */
@Component
@RequiredArgsConstructor
public class TimerScheduler {

    private final Map<Long, Map<String, FightStatus>> chatRoomRequest = new ConcurrentHashMap<>();
    private final ChatRoomSocketService chatRoomSocketService;


    //방의 요청목록 찾기, 없으면 생성
    public Map<String, FightStatus> getRoomRequest(Long chatRoomId) {
        return chatRoomRequest.computeIfAbsent(chatRoomId, id -> new ConcurrentHashMap<>());
    }

    public ChatMessageResponseDto requestInsert(Long chatRoomId, String username, String request) {
        Map<String, FightStatus> requestMap = getRoomRequest(chatRoomId);

        FightStatus fightStatus = FightStatus.getFightStatus(request);

        if(fightStatus != null) {
            //fightStatus 값이 있는지 확인
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
            if(proceed) {
                requestMap.clear();
                chatRoomSocketService.handleRequest(chatRoomId, fightStatus);
            }

            //요청 처리 후 메시지 반환
            return new ChatMessageResponseDto("NOTICE", (!proceed ? username + "님이 " : "") + fightNotice.getMessage());
        }
        return null;
    }

}
