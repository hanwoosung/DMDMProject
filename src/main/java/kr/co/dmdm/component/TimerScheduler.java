package kr.co.dmdm.component;

import kr.co.dmdm.dto.ChatMessageResponseDto;
import kr.co.dmdm.service.chat.ChatRoomService;
import kr.co.dmdm.type.FightNotice;
import kr.co.dmdm.type.FightStatus;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
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
    private final ChatRoomService chatRoomService;


    //방의 요청목록 찾기, 없으면 생성
    public Map<String, FightStatus> getRoomRequest(Long chatRoomId) {
        return chatRoomRequest.computeIfAbsent(chatRoomId, id -> new ConcurrentHashMap<>());
    }

    public ChatMessageResponseDto requestInsert(Long chatRoomId, String username, String request) {
        Map<String, FightStatus> requestMap = getRoomRequest(chatRoomId);

        FightStatus fightStatus = FightStatus.getFightStatus(request);

        if(fightStatus != null) {
            boolean proceed = requestMap.containsValue(fightStatus);

            if (fightStatus.equals(requestMap.get(username))) {
                return null;
            }

            FightNotice fightNotice = FightNotice.getFightNotice(fightStatus, proceed);

            requestMap.put(username, fightStatus);

            if(proceed) {
                requestMap.clear();
                chatRoomService.handleRequest(chatRoomId, fightStatus);
            }

            return new ChatMessageResponseDto("NOTICE", (!proceed ? username + "님이 " : "") + fightNotice.getMessage());
        }
        return null;
    }

}
