package kr.co.dmdm.repository.jpa.point;

import kr.co.dmdm.entity.PointHistory;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : kr.co.dmdm.repository.jpa
 * fileName       : PointHistoryRepository
 * author         : 황승현
 * date           : 2025-02-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-20        황승현       최초 생성
 */
public interface PointHistoryRepository extends JpaRepository<PointHistory, Integer> {
}
