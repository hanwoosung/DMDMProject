package kr.co.dmdm.repository.dao.board;

import kr.co.dmdm.dto.board.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * 패키지명        : kr.co.dmdm.repository.dao.board
 * 파일명          : BoardDao
 * 작성자          : 김상준
 * 일자            : 2025-02-04
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-04        김상준            최초 생성
 */

@Mapper
public interface BoardDao {

    List<BoardListDto> getBoardList(String boardType,
                                    String status,
                                    int page,
                                    int size,
                                    String searchType,
                                    String searchData,
                                    String sortType,
                                    String sess);

    int getBoardCnt(String boardType,
                    String status,
                    String searchType,
                    String searchData);

    BoardDetailDto getBoard(int boardId, String sess);

    List<CommentDto> getComments(int boardId, String sess);

    void addViewCount(int boardId);

    void insertLikes(@Param("likes") LikesDto likes);

    void deleteLikes(@Param("likes") LikesDto likes);

    void saveComment(@Param("comment") CommentRequestDto comment);

    void deleteBoard(@Param("boardId") Long boardId);

    void deleteComment(@Param("commentId") Long commentId);

}
