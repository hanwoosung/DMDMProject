package kr.co.dmdm.repository.dao.fight;

import kr.co.dmdm.dto.fight.request.ChatRoomRequestDto;
import kr.co.dmdm.dto.fight.response.ChatRoomResponseDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.repository.dao.fight
 * fileName       : ChatRoomDao
 * author         : 최기환
 * date           : 2025-02-14
 * description    : 채팅룸 정보 저장용 dao
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        최기환       최초 생성
 */
@Mapper
public interface ChatRoomDao {
    int insertChatRoom(@Param("C") ChatRoomRequestDto chatRoomRequestDto);
    int updateChatRoom(@Param("C") ChatRoomRequestDto chatRoomRequestDto);
    boolean findById(int fightId);
    List<ChatRoomResponseDto> findChattingRoom(@Param("start")int startIdx, @Param("amount")int amount);
    boolean findSendAndReceiveChattingRoom(@Param("send") String sendId, @Param("receive") String receiveId);
}
