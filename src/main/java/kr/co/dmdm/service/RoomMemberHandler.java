package kr.co.dmdm.service;

import kr.co.dmdm.dto.ChatUserDto;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * packageName    : kr.co.dmdm.service
 * fileName       : RoomMemberHandler
 * author         : 최기환
 * date           : 2025-01-24
 * description    :
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

    public List<ChatUserDto> joinUser(ChatUserDto request, Long chatRoomId) {
        getChatUsers(chatRoomId).add(request);
        return getChatUsers(chatRoomId);
    }

    public List<ChatUserDto> leaveUser(ChatUserDto request, Long chatRoomId) {
        getChatUsers(chatRoomId).remove(request);
        return getChatUsers(chatRoomId);
    }
}
