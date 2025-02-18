package kr.co.dmdm.dto.fight.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * packageName    : kr.co.dmdm.dto
 * fileName       : ChatRoomDto
 * author         : 최기환
 * date           : 2025-02-14
 * description    : 채팅방 요청용 dto
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        최기환       최초 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRoomResponseDto {
    int fightId;
    String fightTitle;
    String sendUserId;
    String receiveUserId;
    String winUserId;
    LocalDateTime insertDt;
    int SendVote;
    int receiveVote;
    String sendId;
    String sendName;
    String sendBadge;
    int sendLevel;
    String receiveId;
    String receiveName;
    String receiveBadge;
    int receiveLevel;
}
