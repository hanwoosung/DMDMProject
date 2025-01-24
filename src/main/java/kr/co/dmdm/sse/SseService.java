package kr.co.dmdm.sse;

import reactor.core.publisher.Flux;

public interface SseService {
    Flux<String> streamNotifications(String userId);
    void sendAlarmToUser(String userId, String message);
}