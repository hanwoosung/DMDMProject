package kr.co.dmdm.dto.user.response;

import kr.co.dmdm.dto.common.FileDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

/**
 * packageName    : kr.co.dmdm.dto.user.response
 * fileName       : UserProfileDto
 * author         : 한우성
 * date           : 2025-02-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-20        한우성       최초 생성
 */
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserProfileDto {
    private String userId;
    private String userName;
    private LocalDate userBirth;
    private String userEmail;
    private Character userEmailPushYn;
    private Integer userPoint;
    private Integer userExp;
    private FileDto fileDto;
    private boolean isProfileDeleted;
}
