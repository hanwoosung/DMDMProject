package kr.co.dmdm.service.board;

import kr.co.dmdm.dto.board.BoardListDto;

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
                                  String sortType);
}
