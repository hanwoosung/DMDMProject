package kr.co.dmdm.service.main;

import kr.co.dmdm.dto.main.response.MainBoardDto;
import kr.co.dmdm.dto.main.response.MainDataDto;
import kr.co.dmdm.repository.dao.main.MainDao;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.service.main
 * fileName       : MainServiceImpl
 * author         : 한우성
 * date           : 2025-02-11
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-11        한우성       최초 생성
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class MainServiceImpl implements MainService {

    private final MainDao mainDao;

    @Override
    public MainDataDto findBoardList(String userId) {

        MainDataDto mainData = new MainDataDto();

        mainData.setFreeBoardList(mainDao.findBoardList(userId, "FREE"));
        mainData.setQnaBoardList(mainDao.findBoardList(userId, "QNA"));
        mainData.setTodayBoardList(mainDao.findTodayRankBoardList());
        mainData.setWeekBoardList(mainDao.findWeekRankBoardList());
        mainData.setUserLevelRankingList(mainDao.findLevelUserList());
        mainData.setUserTotalRankingList(mainDao.findTotalUserList());

        return mainData;
    }
}
