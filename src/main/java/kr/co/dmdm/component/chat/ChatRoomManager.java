package kr.co.dmdm.component.chat;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

/**
 * packageName    : kr.co.dmdm.component.chat
 * fileName       : ChatRoomManager
 * author         : 최기환
 * date           : 2025-02-18
 * description    : 채팅방 일괄 관리용 컴포넌트
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-18        최기환       최초 생성
 */
@Component
@RequiredArgsConstructor
public class ChatRoomManager {
    private final ChatTimeHandler chatTimeHandler;
    private final RoomMemberHandler roomMemberHandler;
    private final TimerRequestHandler timerRequestHandler;
    private final VoteHandler voteHandler;

    public void deleteInfo(Long roomId){
        // 투표 결과 가져오기
        chatTimeHandler.timerDelete(roomId);
        roomMemberHandler.deleteUserList(roomId);
        timerRequestHandler.deleteRequest(roomId);
        voteHandler.voteDelete(roomId);
    }
}
