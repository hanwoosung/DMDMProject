package kr.co.dmdm.dto.main.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

/**
 * packageName    : kr.co.dmdm.dto.main.response
 * fileName       : MainBoardDto
 * author         : 한우성
 * date           : 2025-02-11
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-11        한우성       최초 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MainBoardDto {
    private Long boardId;
    private String boardTitle;
    private String boardContent;
    private String userId;
    private String userName;
    private String userLevel;
    private String filePath;
    private String insert;
    private LocalDateTime insertDt;
    private int vCnt;
    private int commentCount;
    private int likeCount;
}
