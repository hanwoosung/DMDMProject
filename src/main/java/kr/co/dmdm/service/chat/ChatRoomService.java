package kr.co.dmdm.service.chat;

import kr.co.dmdm.dto.fight.request.ChatRoomRequestDto;
import kr.co.dmdm.global.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 * packageName    : kr.co.dmdm.service.chat
 * fileName       : ChatRoomService
 * author         : 최기환
 * date           : 2025-02-14
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        최기환       최초 생성
 */
@Service
public interface ChatRoomService {
    Response<?> insertChatRoom(ChatRoomRequestDto requestDto);
}
