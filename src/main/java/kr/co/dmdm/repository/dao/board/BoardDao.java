package kr.co.dmdm.repository.dao.board;

import kr.co.dmdm.dto.board.BoardListDto;
import org.apache.ibatis.annotations.Mapper;

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

    List<BoardListDto> getBoardList(String boardType, String status);

}
