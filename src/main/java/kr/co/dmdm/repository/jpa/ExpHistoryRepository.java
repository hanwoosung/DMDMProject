package kr.co.dmdm.repository.jpa;

import kr.co.dmdm.entity.ExpHistory;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * 패키지명        : kr.co.dmdm.repository.jpa
 * 파일명          : ExpHistoryRepository
 * 작성자          : 김상준
 * 일자            : 2025-02-23
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-23        김상준            최초 생성
 */

public interface ExpHistoryRepository extends JpaRepository<ExpHistory, Long> {
}
