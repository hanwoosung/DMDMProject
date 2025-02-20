package kr.co.dmdm.service.board;

import kr.co.dmdm.dto.board.BoardListDto;
import kr.co.dmdm.dto.board.CommentDto;
import kr.co.dmdm.dto.board.CommentRequestDto;
import kr.co.dmdm.dto.board.LikesDto;

import java.util.List;
import java.util.Map;

/**
 * 패키지명        : kr.co.dmdm.service.board
 * 파일명          : BoardService
 * 작성자          : 김상준
 * 일자            : 2025-01-24
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-01-24        김상준            최초 생성
 */

public interface BoardService {

    void saveBoard(Map<String, Object> params);

    Map<String, Object> getBoards(String boardType,
                                  String status,
                                  int page,
                                  int size,
                                  String searchType,
                                  String searchData,
                                  String sortType,
                                  String sess);

    Map<String, Object> getBoard(int boardId, String sess);

    void setLikes(LikesDto likes);

    List<CommentDto> saveComment(CommentRequestDto comment);

    void deleteBoard(Long boardId);

    void deleteComment(Long commentId);
}
