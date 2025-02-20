package kr.co.dmdm.dto.board;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 패키지명        : kr.co.dmdm.dto.board
 * 파일명          : CommentDto
 * 작성자          : 김상준
 * 일자            : 2025-02-18
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-18        김상준            최초 생성
 */

@Data
public class CommentDto {

    private Long boardId;
    private Long commentId;
    private Long parentCommentId;
    private Integer depth;
    private String commentContent;
    private String commentType;
    private String userId;
    private String userName;
    private Integer userLevel;
    private String insert;
    private LocalDateTime insertDt;
    private LocalDateTime updateDt;
    private String status;
    private Integer likeCnt;
    private Integer hateCnt;
    private String loginLikes;
    private String blackListYn;

}
