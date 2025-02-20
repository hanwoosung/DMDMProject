package kr.co.dmdm.dto.fight.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * packageName    : kr.co.dmdm.dto.fight.request
 * fileName       : RoomUpdateRequestDto
 * author         : 최기환
 * date           : 2025-02-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-20        최기환       최초 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class RoomUpdateRequestDto {
    private int fightId;
    private int leftVote;
    private int rightVote;
}
