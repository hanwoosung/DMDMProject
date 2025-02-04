package kr.co.dmdm.component;

import kr.co.dmdm.dto.ChatMessageResponseDto;
import kr.co.dmdm.type.FightNotice;
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


    // 채팅방 타이머 최신화 메서드
    @Scheduled(fixedRate = 1000) // 1초마다 실행
    public void updateTimers() {
        // 타이머가 없으면 조기에 종료
        if (chatRoomTimers.isEmpty()) {
            return;
        }

        chatRoomTimers.forEach((chatRoomId, remainingTime) -> {
            if (remainingTime <= 0) {
                chatRoomTimers.remove(chatRoomId);
            } else {
                chatRoomTimers.put(chatRoomId, remainingTime - 1);
                messagingTemplate.convertAndSend("/subscribe/timer." + chatRoomId, remainingTime - 1);
            }
        });
    }

    //방의 요청목록 찾기, 없으면 생성
    public Map<String, String> getRoomRequest(Long chatRoomId) {
        return chatRoomRequest.computeIfAbsent(chatRoomId, id -> new ConcurrentHashMap<>());
    }

    public ChatMessageResponseDto requestInsert(Long chatRoomId, String username, String request) {
        Map<String, String> requestMap = getRoomRequest(chatRoomId);

        if (request.equals(requestMap.get(username))) {
            return requestMessage(username, request, false);
        }

        if (requestMap.containsValue(request)) {
            requestMap.clear();
            handleRequest(chatRoomId, request);
            return requestMessage(username, request, true);
        }

        requestMap.put(username, request);
        return requestMessage(username, request, false);
    }

    private ChatMessageResponseDto requestMessage(String username, String request, boolean proceed) {
        String noticeContent = switch (request) {
            case "start" ->
                    proceed ? FightNotice.START_PROCEED.getMessage() : FightNotice.START_REQUEST.getUserName(username);
            case "stop" ->
                    proceed ? FightNotice.END_PROCEED.getMessage() : FightNotice.END_REQUEST.getUserName(username);
            case "extend" ->
                    proceed ? FightNotice.EXTEND_PROCEED.getMessage() : FightNotice.EXTEND_REQUEST.getUserName(username);
            default -> "unknown error!";
        };

        return new ChatMessageResponseDto("NOTICE", noticeContent);
    }

    private void handleRequest(Long chatRoomId, String request) {
        switch (request) {
            case "start":
                startTimer(chatRoomId, 3600);
                break;
            case "stop":
                stopTimer(chatRoomId);
                break;
            case "extend":
                extendTimer(chatRoomId, 1800);
                break;
            default:
                break;
        }
    }

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
