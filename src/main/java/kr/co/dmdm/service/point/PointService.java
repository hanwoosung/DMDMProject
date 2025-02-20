package kr.co.dmdm.service.point;

import kr.co.dmdm.dto.point.request.PointHistoryRequestDto;

/**
 * packageName    : kr.co.dmdm.service.point
 * fileName       : PointService
 * author         : 황승현
 * date           : 2025-02-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-20        황승현       최초 생성
 */
public interface PointService {
    void savePoint(PointHistoryRequestDto pointDto);
}
