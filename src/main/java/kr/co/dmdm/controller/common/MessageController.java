package kr.co.dmdm.controller.common;

import kr.co.dmdm.dto.Alarm.request.MessageDto;
import kr.co.dmdm.dto.Alarm.response.MessageResponseDto;
import kr.co.dmdm.service.MessageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
public class MessageController {
    private final MessageService messageService;

    @PostMapping
    public String saveMessage(@RequestBody MessageDto message) {
        return messageService.sendMessage(message);
    }

    @PostMapping("/ok")
    public MessageResponseDto ok(@RequestBody Map<String, Integer> request) {
        int messageId = request.get("messageId");
        return messageService.getMessage(messageId);
    }

}
