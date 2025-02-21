package kr.co.dmdm.dto.main.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * packageName    : kr.co.dmdm.dto.main.response
 * fileName       : UserRankingDto
 * author         : 한우성
 * date           : 2025-02-14
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        한우성       최초 생성
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRankingDto {
    private String userId;
    private String userName;
    private String filePath;
    private int userLevel;
    private int goldMedal;
    private int silverMedal;
    private int bronzeMedal;
}
