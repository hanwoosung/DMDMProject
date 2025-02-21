package kr.co.dmdm.service.mypage.blackList;

import kr.co.dmdm.dto.mypage.blackList.ResponseBlackListDto;

import java.util.List;
import java.util.Map;

/**
 * 패키지명        : kr.co.dmdm.service.mypage.blackList
 * 파일명          : BlackListService
 * 작성자          : 김상준
 * 일자            : 2025-02-21
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-21        김상준            최초 생성
 */

public interface BlackListService {

    Map<String, Object> getBlackList(String sess, int page, int size);

    void deleteBlackList(String sess, List<ResponseBlackListDto> receivedUserIds);

}
