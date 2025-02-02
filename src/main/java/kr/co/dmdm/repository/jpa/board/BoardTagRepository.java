package kr.co.dmdm.repository.jpa.board;

import kr.co.dmdm.entity.board.BoardTag;
import kr.co.dmdm.entity.board.BoardTagId;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BoardTagRepository extends JpaRepository<BoardTag, BoardTagId> {

    List<BoardTag> findByIdBoardId(Integer boardId);

    List<BoardTag> findByIdTag(String tag);
}
