package kr.co.dmdm.dto.board;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 패키지명        : kr.co.dmdm.dto.board
 * 파일명          : BoardDto
 * 작성자          : 김상준
 * 일자            : 2025-01-24
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-01-24        김상준            최초 생성
 */

@Data
public class BoardDto {

    private Integer boardId; // 게시판 번호
    private String boardType; // 카테고리 (NOTICE, EVENT 등)
    private String boardTitle; // 게시판 제목
    private String boardContent; // 게시판 내용
    private String userId; // 유저 아이디
    private LocalDateTime insertDt; // 등록일시
    private LocalDateTime updateDt; // 수정일시
    private String status; // 게시글 상태 (ACTIVE, DEACTIVE, DELETE)

}
