package kr.co.dmdm.service.board;

import kr.co.dmdm.dto.board.BoardDto;

import java.util.List;
import java.util.Map;
import java.util.Objects;

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

    List<BoardDto> getBoards(String boardType, String status);
}
