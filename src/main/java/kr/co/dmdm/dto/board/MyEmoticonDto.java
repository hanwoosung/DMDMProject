package kr.co.dmdm.dto.board;

import lombok.Data;

/**
 * 패키지명        : kr.co.dmdm.dto.board
 * 파일명          : MyEmoticonDto
 * 작성자          : 김상준
 * 일자            : 2025-02-21
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-21        김상준            최초 생성
 */

@Data
public class MyEmoticonDto {
    private Long itemId;
    private String itemType;
    private String userId;
    private String orderNo;
    private String filePath;
}
