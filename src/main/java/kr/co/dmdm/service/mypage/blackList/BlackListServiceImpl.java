package kr.co.dmdm.service.mypage.blackList;

import kr.co.dmdm.dto.mypage.blackList.ResponseBlackListDto;
import kr.co.dmdm.repository.dao.mypage.BlackListDao;
import kr.co.dmdm.utils.PagingUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 패키지명        : kr.co.dmdm.service.mypage.blackList
 * 파일명          : BlackListServiceImpl
 * 작성자          : 김상준
 * 일자            : 2025-02-21
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-21        김상준            최초 생성
 */

@Service
@RequiredArgsConstructor
public class BlackListServiceImpl implements BlackListService {

    private final BlackListDao blackListDao;

    @Override
    public Map<String,Object> getBlackList(String sess, int page, int size) {

        Map<String,Object> result = new HashMap<>();

        int blackList = getBlackListCnt(sess);

        int start = (page - 1) * size;
        int end = Math.min(start + size, blackList);

        PagingUtil pagingUtil = new PagingUtil(blackList, page, size, 10);

        result.put("paging", pagingUtil);
        result.put("blackList", blackListDao.getBlackList(sess, start, size));

        return result;
    }

    @Override
    public void deleteBlackList(String sess, List<ResponseBlackListDto> receivedUserIds) {
        blackListDao.deleteBlackList(sess, receivedUserIds);
    }

    private int getBlackListCnt(String sess){
        return blackListDao.getBlackListCnt(sess);
    }
}
