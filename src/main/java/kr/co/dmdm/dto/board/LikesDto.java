package kr.co.dmdm.dto.board;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 패키지명        : kr.co.dmdm.dto.board
 * 파일명          : LikesDto
 * 작성자          : 김상준
 * 일자            : 2025-02-18
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-18        김상준            최초 생성
 */

@Data
public class LikesDto {
    private Integer likeTarget;         // 대상 ID
    private String likeTargetType;  // BOARD: 게시판, COMMENT: 댓글
    private String userId;          // 유저 아이디
    private String likeType;        // LIKE: 좋아요, HATE: 싫어요
    private String loginLikes;       //현재상태
    private LocalDateTime insertDt; // 등록일시
}
