package kr.co.dmdm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * packageName    : kr.co.dmdm.dto
 * fileName       : VoteRequestDto
 * author         : 최기환
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        최기환       최초 생성
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class VoteRequestDto {
    private String username;
    private String vote;
}
