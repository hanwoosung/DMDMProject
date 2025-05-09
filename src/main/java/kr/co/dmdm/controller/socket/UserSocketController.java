package kr.co.dmdm.controller.socket;

import kr.co.dmdm.component.chat.ChatRoomManager;
import kr.co.dmdm.dto.fight.ChatUserDto;
import kr.co.dmdm.repository.dao.fight.ChatRoomDao;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.controller
 * fileName       : UserSocketController
 * author         : 최기환
 * date           : 2025-01-24
 * description    : 채팅창 연결 인원 관리 컨트롤러
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-24        최기환       최초 생성
 */
@RestController
@RequiredArgsConstructor
public class UserSocketController extends BaseWebSocketController {

    private final ChatRoomManager chatRoomManager;
    private final ChatRoomDao chatRoomDao;

    @MessageMapping("/chatRoom/join/{chatRoomId}")
    @SendTo("/subscribe/chatRoom.{chatRoomId}")
    public List<ChatUserDto> joinChatRoom(
            ChatUserDto request,
            @DestinationVariable Long chatRoomId
    ) {
        System.out.println("입실발생!!!!!!!!!!!!!!" + request);
        return chatRoomManager.joinUser(request, chatRoomId);
    }

    @MessageMapping("/chatRoom/leave/{chatRoomId}")
    @SendTo("/subscribe/chatRoom.{chatRoomId}")
    public List<ChatUserDto> leaveChatRoom(ChatUserDto request, @DestinationVariable Long chatRoomId) {
        System.out.println("퇴실 발생!!!!!!!!!!!!!!" + request);
        return chatRoomManager.leaveUser(request, chatRoomId);
    }
}
