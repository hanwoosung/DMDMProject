package kr.co.dmdm.controller;

import kr.co.dmdm.dto.chat.ChatMessageRequestDto;
import kr.co.dmdm.dto.chat.ChatMessageResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : kr.co.dmdm.controller
 * fileName       : MessageController
 * author         : 최기환
 * date           : 2025-01-22
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-22        최기환       최초 생성
 */
@RestController
@Slf4j
public class MessageController {
    @MessageMapping("/observer.{chatRoomId}")
    @SendTo("/subscribe/observer.{chatRoomId}")
    public ChatMessageResponseDto sendObserverMessage(
            ChatMessageRequestDto request,
            @DestinationVariable Long chatRoomId
    ) {
        return new ChatMessageResponseDto(request.getUsername(), request.getContent());
    }

    @MessageMapping("/fighter.{chatRoomId}")
    @SendTo("/subscribe/fighter.{chatRoomId}")
    public ChatMessageResponseDto sendFighterMessage(
            ChatMessageRequestDto request,
            @DestinationVariable Long chatRoomId
    ) {
        return new ChatMessageResponseDto(request.getUsername(), request.getContent());
    }

    @MessageExceptionHandler
    public void handleException(RuntimeException e) {
        log.info("Exception: {}", e.getMessage());
    }
}
