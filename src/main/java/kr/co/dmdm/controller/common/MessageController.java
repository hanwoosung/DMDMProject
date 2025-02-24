package kr.co.dmdm.controller.common;

import kr.co.dmdm.dto.Alarm.request.MessageDto;
import kr.co.dmdm.dto.Alarm.response.MessageResponseDto;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.service.MessageService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

/**
 * packageName    : kr.co.dmdm.controller.common
 * fileName       : MessageController
 * author         : 한우성
 * date           : 2025-02-21
 * description    : 메시지(쪽지임 ㅎㅎ)
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-21        한우성       최초 생성
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/message")
@Slf4j

public class MessageController {

    private final MessageService messageService;
    private final JWTUtil jwtUtil;

    @PostMapping
    public String saveMessage(@RequestBody MessageDto message) {
        return messageService.sendMessage(message);
    }

    @PostMapping("/ok")
    public MessageResponseDto ok(@RequestBody Map<String, Integer> request) {
        int messageId = request.get("messageId");
        return messageService.getMessage(messageId);
    }

    @GetMapping("/all")
    public List<MessageResponseDto> getMessages(@RequestHeader("access") String token) {

        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            log.error("세션없음 빈값처리");
        }

        return messageService.getMessages(sess);
    }

}
