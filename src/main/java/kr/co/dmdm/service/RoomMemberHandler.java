package kr.co.dmdm.service;

import kr.co.dmdm.dto.fight.ChatUserDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * packageName    : kr.co.dmdm.service
 * fileName       : RoomMemberHandler
 * author         : 최기환
 * date           : 2025-01-24
 * description    : 채팅창 연결 목록 조회 서비스
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-24        최기환       최초 생성
 */
@Service
public class RoomMemberHandler {

    private final Map<Long, List<ChatUserDto>> chatUsers = new ConcurrentHashMap<>();

    public List<ChatUserDto> getChatUsers(Long roomId) {
        return chatUsers.computeIfAbsent(roomId, id -> new ArrayList<>());
    }

    /**
     * 사용자 참여
     * @param request 사용자 정보
     * @param chatRoomId 방번호
     * @return 유저리스트
     */
    public List<ChatUserDto> joinUser(ChatUserDto request, Long chatRoomId) {
        for(ChatUserDto element : getChatUsers(chatRoomId)){
            if( element.getUsername().equals(request.getUsername()) &&
                element.getNickname().equals(request.getNickname())
            ) {
                return getChatUsers(chatRoomId);
            }
        }

        getChatUsers(chatRoomId).add(request);
        return getChatUsers(chatRoomId);
    }

    /**
     * 사용자 퇴장
     * @param request 사용자 정보
     * @param chatRoomId 방번호
     * @return 유저리스트
     */
    public List<ChatUserDto> leaveUser(ChatUserDto request, Long chatRoomId) {
        getChatUsers(chatRoomId).remove(request);
        return getChatUsers(chatRoomId);
    }

    /**
     * 사용장 목록 삭제
     * @param chatRoomId 방번호
     */
    public void deleteUserList(Long chatRoomId) {
        chatUsers.remove(chatRoomId);
    }
}
