package kr.co.dmdm.controller.fight;

import kr.co.dmdm.dto.fight.request.ChatRoomRequestDto;
import kr.co.dmdm.dto.fight.response.ChatRoomResponseDto;
import kr.co.dmdm.repository.dao.fight.ChatRoomDao;
import kr.co.dmdm.service.chat.ChatRoomService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.controller.fight
 * fileName       : FightRoomController
 * author         : 최기환
 * date           : 2025-02-14
 * description    : 방 생성, 마감을 담당하는 컨트롤러
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        최기환       최초 생성
 */
@RestController
@RequestMapping("/api/v1/chat-room")
@RequiredArgsConstructor
public class ChatRoomController {

    private final ChatRoomDao chatRoomDao;
    private final ChatRoomService chatRoomService;

    //방 생성
    @PostMapping
    public String chatRoomMaker(@RequestBody ChatRoomRequestDto requestDto) {
        return chatRoomService.insertChatRoom(requestDto);
    }
    //방 마감
    @PutMapping
    public boolean chatRoomUpdate(@RequestBody ChatRoomRequestDto requestDto) {
        return chatRoomDao.updateChatRoom(requestDto) != 0;
    }
    //방 마감여부 확인
    @GetMapping("/{fightId}")
    public boolean chatRoomGet(@PathVariable int fightId) {
        return chatRoomDao.findById(fightId);
    }

    @GetMapping
    public List<ChatRoomResponseDto> getChatRooms() {
        return chatRoomDao.findChattingRoom(0,10);
    }
}
