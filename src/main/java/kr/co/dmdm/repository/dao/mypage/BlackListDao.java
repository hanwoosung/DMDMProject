package kr.co.dmdm.repository.dao.mypage;

import kr.co.dmdm.dto.mypage.blackList.ResponseBlackListDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 패키지명        : kr.co.dmdm.repository.dao.mypage
 * 파일명          : BlackListDao
 * 작성자          : 김상준
 * 일자            : 2025-02-21
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-21        김상준            최초 생성
 */

@Mapper
public interface BlackListDao {

    List<ResponseBlackListDto> getBlackList(String sess, int page, int size);

    int getBlackListCnt(String sess);

    void deleteBlackList(String sess, List<ResponseBlackListDto> receivedUserId);

    void saveBlackList(String userId, String sess);

}
