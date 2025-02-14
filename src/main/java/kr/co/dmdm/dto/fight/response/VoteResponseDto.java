package kr.co.dmdm.dto.fight.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * packageName    : kr.co.dmdm.dto
 * fileName       : VoteResponseDto
 * author         : 최기환
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        최기환       최초 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class VoteResponseDto {
    private int leftVote;
    private int rightVote;
}
