package kr.co.dmdm.repository.jpa;

import kr.co.dmdm.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : kr.co.dmdm.repository.jpa
 * fileName       : MesageRepository
 * author         : 한우성
 * date           : 2025-02-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-21        한우성       최초 생성
 */
public interface MessageRepository extends JpaRepository<Message, Integer> {
    Message findById(int id);
}
