package kr.co.dmdm.repository.jpa.board;

import kr.co.dmdm.entity.board.BoardTag;
import kr.co.dmdm.entity.board.BoardTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardTagRepository extends JpaRepository<BoardTag, BoardTagId> {

    // 특정 게시판 ID에 해당하는 태그 리스트 조회
    List<BoardTag> findByBoardId(Integer boardId);

    // 특정 태그로 게시판 ID 조회
    List<BoardTag> findByTag(String tag);
}
