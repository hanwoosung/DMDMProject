package kr.co.dmdm.dto.board;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 패키지명        : kr.co.dmdm.dto.board
 * 파일명          : CommentRequestDto
 * 작성자          : 김상준
 * 일자            : 2025-02-18
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-18        김상준            최초 생성
 */

@Data
public class CommentRequestDto {

    private Integer commentId;        // 댓글 번호 (PK)
    private Integer parentCommentId;  // 부모 댓글 ID (대댓글 관계)
    private Integer boardId;          // 게시판 ID (어떤 게시글의 댓글인지)
    private Integer depth;            // 댓글 깊이 (0: 원댓글, 1 이상: 대댓글)
    private String commentContent;    // 댓글 내용
    private String commentType;       // 댓글 타입 (EMOTICON: 이모티콘, TEXT: 글)
    private String userId;            // 작성자 ID
    private LocalDateTime insertDt;   // 등록 일시
    private LocalDateTime updateDt;   // 수정 일시
    private String status;            // 댓글 상태 (ACTIVE: 활성화, DEACTIVE: 비활성화, DELETE: 삭제)

}
