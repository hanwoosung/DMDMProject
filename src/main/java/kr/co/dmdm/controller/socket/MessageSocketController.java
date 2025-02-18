package kr.co.dmdm.controller.socket;

import kr.co.dmdm.component.chat.VoteHandler;
import kr.co.dmdm.dto.fight.request.ChatMessageRequestDto;
import kr.co.dmdm.dto.fight.response.ChatMessageResponseDto;
import kr.co.dmdm.dto.fight.request.VoteRequestDto;
import kr.co.dmdm.dto.fight.response.VoteResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : kr.co.dmdm.controller
 * fileName       : MessageController
 * author         : 최기환
 * date           : 2025-01-22
 * description    : 메시지 관련 컨트롤러
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-22        최기환       최초 생성
 * 2025-01-23        최기환       투표 기능 추가
 */
@RestController
@RequiredArgsConstructor
public class MessageSocketController extends BaseWebSocketController {

    private final VoteHandler voteManager;

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

    @MessageMapping("/vote.{chatRoomId}")
    @SendTo("/subscribe/vote.{chatRoomId}")
    public VoteResponseDto sendVote(
            @Payload(required = false) VoteRequestDto request,
            @DestinationVariable Long chatRoomId
    ) {
        return voteManager.registerVote(chatRoomId, request);
    }
}
