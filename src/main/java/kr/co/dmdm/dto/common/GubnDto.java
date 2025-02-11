package kr.co.dmdm.dto.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

/**
 * packageName    : kr.co.dmdm.dto.common
 * fileName       : GubnDto
 * author         : 한우성
 * date           : 2025-01-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        한우성       최초 생성
 * 2025-02-10        황승현       ToString 추가
 */
@Getter
@AllArgsConstructor
@ToString
public class GubnDto {
    private String parentCode;
    private String code;
    private String name;
    private String firstSpecial;
    private String firstSpecialDescription;
    private String secondSpecial;
    private String secondSpecialDescription;
    private String thirdSpecial;
    private String thirdSpecialDescription;
    private String status;
}
