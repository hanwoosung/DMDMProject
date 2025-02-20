package kr.co.dmdm.dto.common.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * packageName    : kr.co.dmdm.dto.common.request
 * fileName       : FileRequestDto
 * author         : 한우성
 * date           : 2025-02-18
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-18        한우성       최초 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class FileRequestDto {
    private String fileType;
    private String fileRef;
}
