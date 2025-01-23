package kr.co.dmdm.dto.common;

import lombok.Data;

/**
 * packageName    : kr.co.dmdm.dto.common
 * fileName       : CaptchaDto
 * author         : 한우성
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        한우성       최초 생성
 */
@Data
public class CaptchaDto {
    private String captchaToken;
}