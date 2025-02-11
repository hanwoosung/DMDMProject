package kr.co.dmdm.sse;

import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;

@RestController
public class SseController {

    private final SseService sseService;

    public SseController(SseService sseService) {
        this.sseService = sseService;
    }

    @GetMapping(value = "/sse/notifications", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public Flux<String> streamNotifications(@RequestParam String userId) {
        return sseService.streamNotifications(userId);
    }
}