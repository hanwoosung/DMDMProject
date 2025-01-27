package kr.co.dmdm.component;

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
 * description    : 채팅방 타이머 설정
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-27        최기환       최초 생성
 */

@Component
@RequiredArgsConstructor
public class TimerScheduler {

    private final SimpMessagingTemplate messagingTemplate;
    private final Map<Long, Integer> chatRoomTimers = new ConcurrentHashMap<>();
    private final Map<Long, Map<String, String>> chatRoomRequest = new ConcurrentHashMap<>();

    @Scheduled(fixedRate = 1000) // 1초마다 실행
    public void updateTimers() {
        // 타이머가 없으면 조기에 종료
        if (chatRoomTimers.isEmpty()) {
            return;
        }

        chatRoomTimers.forEach((chatRoomId, remainingTime) -> {
            if (remainingTime <= 0) {
                chatRoomTimers.remove(chatRoomId);
                messagingTemplate.convertAndSend("/subscribe/timer." + chatRoomId, 0);
            } else {
                chatRoomTimers.put(chatRoomId, remainingTime - 1);
                messagingTemplate.convertAndSend("/subscribe/timer." + chatRoomId, remainingTime - 1);
            }
        });
    }

//    // 방번호 존재 여부 확인
//    public Map<String, String> getRoomRequest(Long chatRoomId) {
//        return chatRoomRequest.computeIfAbsent(chatRoomId, id -> new ConcurrentHashMap<>());
//    }
//
//    // 채팅방 요청
//    public boolean requestEqual(Long chatRoomId, String username, String request) {
//        Map<String, String> roomRequest = getRoomRequest(chatRoomId);
//
//        // 동일 id, 동일 요청 => 요청 삭제, false
//        if (roomRequest.containsKey(username) &&
//                roomRequest.get(username).equals(request)
//        ) {
//            roomRequest.remove(username);
//            return false;
//        }
//
//        // 다른 id, 같은 요청 => 요청 삭제, true
//        if (roomRequest.containsValue(request)) {
//            roomRequest.remove(request);
//            return true;
//        }
//
//        roomRequest.put(username, request);
//        return false;
//    }
//
//    public void toggleStartTimer(Long chatRoomId, String username, int durationInSeconds) {
//        System.out.println(chatRoomId + "번 방, 타이머 시작" + durationInSeconds);
//
//        if (requestEqual(chatRoomId, username, "CHAT_START")) {
//            chatRoomTimers.put(chatRoomId, durationInSeconds);
//        }
//    }

    public void startTimer(Long chatRoomId, int durationInSeconds) {
        System.out.println(chatRoomId + "번 방, 타이머 시작" + durationInSeconds);
        chatRoomTimers.put(chatRoomId, durationInSeconds);
    }

    public void stopTimer(Long chatRoomId) {
        System.out.println("토론 중지");
        chatRoomTimers.remove(chatRoomId);
        messagingTemplate.convertAndSend("/subscribe/timer." + chatRoomId, 0);
    }

    public void extendTimer(Long chatRoomId, int time) {
        System.out.println("토론 연장");
        chatRoomTimers.compute(chatRoomId, (k, remainingTime) -> (remainingTime == null ? 0 : remainingTime) + time);
    }
}
