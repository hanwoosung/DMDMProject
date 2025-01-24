package kr.co.dmdm.sse;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Sinks;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class SseServiceImpl implements SseService {
    private final Map<String, Sinks.Many<String>> userSinks = new ConcurrentHashMap<>();
    private final ObjectMapper objectMapper = new ObjectMapper(); // JSON 직렬화 객체

    @Override
    public Flux<String> streamNotifications(String userId) {
        Sinks.Many<String> sink = userSinks.computeIfAbsent(userId, id -> Sinks.many().multicast().onBackpressureBuffer());

        return sink.asFlux()
//                .map(data -> "data: " + data + "\n\n") // SSE 형식 유지
                .doOnSubscribe(subscription -> System.out.println("Client connected: " + userId))
                .doFinally(signalType -> {
                    System.out.println("Client disconnected: " + userId);
                    userSinks.remove(userId);
                });
    }

    @Override
    public void sendAlarmToUser(String userId, String message) {
        Sinks.Many<String> sink = userSinks.get(userId);
        if (sink != null) {
            try {
                String jsonMessage = objectMapper.writeValueAsString(Map.of("message", message));
                sink.tryEmitNext(jsonMessage);
            } catch (Exception e) {
                System.err.println("Failed to convert message to JSON: " + e.getMessage());
            }
        } else {
            System.out.println("No active connection for userId: " + userId);
        }
    }
}