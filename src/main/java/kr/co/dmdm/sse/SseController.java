package kr.co.dmdm.sse;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
public class SseController {

    private final Map<String, Sinks.Many<String>> userSinks = new ConcurrentHashMap<>();

    @GetMapping(value = "/sse/notifications", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamNotifications(@RequestParam String userId) {
        Sinks.Many<String> sink = userSinks.computeIfAbsent(userId, id -> Sinks.many().multicast().onBackpressureBuffer());

        return sink.asFlux()
                .map(data -> "data: " + data + "\n\n") // SSE 형식으로 변환
                .doOnSubscribe(subscription -> System.out.println("Client connected: " + userId))
                .doFinally(signalType -> {
                    System.out.println("Client disconnected: " + userId);
                    userSinks.remove(userId);
                });
    }


    public void sendAlarmToUser(String userId, String message) {
        Sinks.Many<String> sink = userSinks.get(userId);
        if (sink != null) {
            sink.tryEmitNext(message);
        } else {
            System.out.println("No active connection for userId: " + userId);
        }
    }
}
