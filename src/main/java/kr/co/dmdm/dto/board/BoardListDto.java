package kr.co.dmdm.dto.board;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

/**
 * 패키지명        : kr.co.dmdm.dto.board
 * 파일명          : BoardListDto
 * 작성자          : 김상준
 * 일자            : 2025-02-04
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-04        김상준            최초 생성
 */

@Data
public class BoardListDto {
    private Long boardId;
    private String boardType;
    private String boardTitle;
    private String boardContent;
    private String userId;
    private String insert;  // fnc_timestamp() 적용 값
    private LocalDateTime insertDt;
    private LocalDateTime updateDt;
    private String status;
    private Long vCnt;
    private String userName;
    private int userLevel;
    private String filePath;
    private String tag;
    private List<String> tagList;
}
