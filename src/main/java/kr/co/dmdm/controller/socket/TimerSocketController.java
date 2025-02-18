package kr.co.dmdm.controller.socket;

import kr.co.dmdm.component.chat.TimerRequestHandler;
import kr.co.dmdm.dto.fight.response.ChatMessageResponseDto;
import kr.co.dmdm.dto.fight.request.TimerRequestDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : kr.co.dmdm.controller.socket
 * fileName       : TimerSocketController
 * author         : 최기환
 * date           : 2025-01-27
 * description    : 채팅방 제한시간 컨트롤러
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-27        최기환       최초 생성
 */
@RestController
@RequiredArgsConstructor
public class TimerSocketController extends BaseWebSocketController {

    private final TimerRequestHandler timerRequestHandler;

    @MessageMapping("/example/timer.{chatRoomId}")
    @SendTo("/subscribe/fighter.{chatRoomId}")
    public ChatMessageResponseDto startExampleTimer(@DestinationVariable Long chatRoomId, TimerRequestDto requestDto) {
        return timerRequestHandler.requestInsert(chatRoomId, requestDto.getUsername(), requestDto.getRequest());
    }
}