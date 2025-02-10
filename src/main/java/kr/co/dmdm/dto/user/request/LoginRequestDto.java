package kr.co.dmdm.dto.user.request;

import lombok.Getter;
import lombok.Setter;

/**
 * packageName    : kr.co.dmdm.dto.user.request
 * fileName       : LoginRequest
 * author         : 한우성
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        한우성       최초 생성
 */
@Getter
@Setter
public class LoginRequestDto {
    private String userId;
    private String userPw;
}