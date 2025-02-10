package kr.co.dmdm.dto.user.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

/**
 * packageName    : kr.co.dmdm.dto.user.response
 * fileName       : UserDto
 * author         : 한우성
 * date           : 2025-01-22
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-22        한우성       최초 생성
 */

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDto {
    private String userId;
    private String userPw;
    private String userName;
    private LocalDate userBirth;
    private String userEmail;
    private Character userEmailPushYn;
    private String userRole;
    private String userJoinType;
    private String userBadge;
    private Integer userPoint;
    private Integer userLevel;
    private Integer userExp;
    private String status;
    private Integer goldMedal;
    private Integer silverMedal;
    private Integer bronzeMedal;
}
