package kr.co.dmdm.component.chat;

import kr.co.dmdm.type.FightStatus;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * packageName    : kr.co.dmdm.service.chat
 * fileName       : ChatRoomServiceImpl
 * author         : 최기환
 * date           : 2025-02-04
 * description    : 채팅방 시간 관리 및 요청 처리 서비스
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-04        최기환       최초 생성
 * todo TimerScheduler 과 병합하기
 */
@Slf4j
@Component
@RequiredArgsConstructor
public class ChatTimeHandler {

    private final Map<Long, Integer> chatRoomTimers = new ConcurrentHashMap<>();
    private final SimpMessagingTemplate messagingTemplate;
    private final ChatRoomManager chatRoomManager;

    @Scheduled(fixedRate = 1000) // 1초마다 실행
    public void updateTimers() {
        // 타이머가 없으면 조기에 종료
        if (chatRoomTimers.isEmpty()) {
            return;
        }

        chatRoomTimers.forEach((chatRoomId, remainingTime) -> {
            if (remainingTime <= 0) {
                timerDelete(chatRoomId);
                chatRoomManager.deleteInfo(chatRoomId);
            } else {
                chatRoomTimers.put(chatRoomId, remainingTime - 1);
                messagingTemplate.convertAndSend("/subscribe/timer." + chatRoomId, remainingTime - 1);
            }
        });
    }

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

    public void timerDelete(Long chatRoomId) {
        chatRoomTimers.remove(chatRoomId);
    }

    private void startTimer(Long chatRoomId) {
        System.out.println(chatRoomId + "번 방, 타이머 시작" + 3600);
        chatRoomTimers.put(chatRoomId, 3600);
    }

    private void stopTimer(Long chatRoomId) {
        System.out.println("토론 중지");
        chatRoomTimers.remove(chatRoomId);
        chatRoomManager.deleteInfo(chatRoomId);
        messagingTemplate.convertAndSend("/subscribe/timer." + chatRoomId, 0);
    }

    private void extendTimer(Long chatRoomId) {
        System.out.println("토론 연장");
        chatRoomTimers.compute(chatRoomId, (k, remainingTime) -> (remainingTime == null ? 0 : remainingTime) + 1800);
    }

}
