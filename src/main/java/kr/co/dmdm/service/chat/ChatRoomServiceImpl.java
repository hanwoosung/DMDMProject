package kr.co.dmdm.service.chat;

import kr.co.dmdm.dto.fight.request.ChatRoomRequestDto;
import kr.co.dmdm.repository.dao.fight.ChatRoomDao;
import kr.co.dmdm.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

/**
 * packageName    : kr.co.dmdm.service.chat
 * fileName       : ChatRoomServiceImpl
 * author         : 최기환
 * date           : 2025-02-14
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        최기환       최초 생성
 */
@Service
@RequiredArgsConstructor
public class ChatRoomServiceImpl implements ChatRoomService {
    private final UserRepository userRepository;
    private final ChatRoomDao chatRoomDao;

    @Override
    public String insertChatRoom(ChatRoomRequestDto requestDto) {
        if (userRepository.findById(requestDto.getReceiveUserId()).isEmpty()) {
            return "존재하지 않는 아이디입니다";
        }

        if (chatRoomDao.findSendAndReceiveChattingRoom(
                requestDto.getSendUserId(),
                requestDto.getReceiveUserId()
        )) {

            return "채팅방이 이미 존재합니다";
        }

        if (chatRoomDao.insertChatRoom(requestDto) != 0) {
            return "채팅방 생성 성공";
        }

        return "채팅방 생성 실패";
    }
}
