package kr.co.dmdm.repository.jpa.board;

import kr.co.dmdm.entity.board.Board;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * 패키지명        : kr.co.dmdm.repository.jpa.board
 * 파일명          : BoardRepository
 * 작성자          : 김상준
 * 일자            : 2025-01-24
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-01-24        김상준            최초 생성
 */

public interface BoardRepository extends JpaRepository<Board, Integer> {

    List<Board> findAllByBoardTypeAndStatus(String boardType, String status);
}
