package kr.co.dmdm.repository.dao.main;

import kr.co.dmdm.dto.main.response.MainBoardDto;
import kr.co.dmdm.dto.main.response.UserRankingDto;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.repository.dao.main
 * fileName       : MainDao
 * author         : 한우성
 * date           : 2025-02-11
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-11        한우성       최초 생성
 */
@Mapper
public interface MainDao {
    List<MainBoardDto> findBoardList(@Param("userId") String userId, @Param("type") String type);

    List<MainBoardDto> findTodayRankBoardList();

    List<MainBoardDto> findWeekRankBoardList();

    List<UserRankingDto> findLevelUserList();

    List<UserRankingDto> findTotalUserList();
}
