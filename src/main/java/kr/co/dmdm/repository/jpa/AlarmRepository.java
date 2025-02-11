package kr.co.dmdm.repository.jpa;

import kr.co.dmdm.entity.Alarm;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : kr.co.dmdm.repository.jpa
 * fileName       : AlarmRepository
 * author         : 황승현
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        황승현       최초 생성
 */
public interface AlarmRepository extends JpaRepository<Alarm, Integer> {
}
