package kr.co.dmdm.dto.board;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

/**
 * 패키지명        : kr.co.dmdm.dto.board
 * 파일명          : BoardDetailDto
 * 작성자          : 김상준
 * 일자            : 2025-02-18
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-18        김상준            최초 생성
 */

@Data
public class BoardDetailDto {
    private Long boardId;
    private String boardType;
    private String boardTypeName;
    private String boardTitle;
    private String boardContent;
    private String userId;
    private String userName;
    private Integer userLevel;
    private String insert;
    private LocalDateTime insertDt;
    private LocalDateTime updateDt;
    private String status;
    private Integer vCnt;
    private Integer likeCnt;
    private Integer hateCnt;
    private String loginLikes;
    private String filePath;
    private String tag;
    private List<String> tags = new ArrayList<>();
}
