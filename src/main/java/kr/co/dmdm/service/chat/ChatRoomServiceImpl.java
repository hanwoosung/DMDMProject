package kr.co.dmdm.service.chat;

import kr.co.dmdm.dto.fight.request.ChatRoomRequestDto;
import kr.co.dmdm.global.Response;
import kr.co.dmdm.global.Result;
import kr.co.dmdm.repository.dao.fight.ChatRoomDao;
import kr.co.dmdm.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public Response<?> insertChatRoom(ChatRoomRequestDto requestDto) {
        if (userRepository.findById(requestDto.getReceiveUserId()).isEmpty()) {
            return new Response<>(
                    HttpStatus.NOT_FOUND,
                    Result.FAILURE,
                    "요청 실패",
                    "존재하지 않는 아이디입니다"
            );
        }

        if (chatRoomDao.findSendAndReceiveChattingRoom(
                requestDto.getSendUserId(),
                requestDto.getReceiveUserId()
        )) {
            return new Response<>(
                    HttpStatus.CONFLICT,
                    Result.FAILURE,
                    "요청 실패",
                    "채팅방이 이미 존재합니다"
            );
        }

        chatRoomDao.insertChatRoom(requestDto);
        if (requestDto.getFightId() != 0) {
            return new Response<>(
                    HttpStatus.CREATED,
                    Result.SUCCESS,
                    "요청 성공",
                    requestDto.getFightId()
            );
        }

        return Response.failure(HttpStatus.INTERNAL_SERVER_ERROR, "채팅방 생성 실패");
    }
}
