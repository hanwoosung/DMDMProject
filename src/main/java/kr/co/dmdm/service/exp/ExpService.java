package kr.co.dmdm.service.exp;

import kr.co.dmdm.type.ExpHistoryType;

/**
 * 패키지명        : kr.co.dmdm.service.exp
 * 파일명          : ExpService
 * 작성자          : 김상준
 * 일자            : 2025-02-23
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-23        김상준            최초 생성
 */

public interface ExpService {

    void saveExp(ExpHistoryType expHistoryType, Integer exp, String userId);

}
