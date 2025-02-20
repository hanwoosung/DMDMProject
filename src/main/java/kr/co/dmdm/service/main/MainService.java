package kr.co.dmdm.service.main;

import kr.co.dmdm.dto.main.response.MainDataDto;

/**
 * packageName    : kr.co.dmdm.service.main
 * fileName       : MainService
 * author         : 한우성
 * date           : 2025-02-11
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-11        한우성       최초 생성
 */
public interface MainService {

    MainDataDto findBoardList(String userId);

}
