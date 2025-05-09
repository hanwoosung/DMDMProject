package kr.co.dmdm.repository.jpa;

import kr.co.dmdm.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : kr.co.dmdm.repository.jpa
 * fileName       : UserRepository
 * author         : 한우성
 * date           : 2025-01-22
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-22        한우성       최초 생성
 */
public interface UserRepository extends JpaRepository<User, String> {
    User findByUserEmail(String email); //TODO : TYPE 검증도 할 건지 추후에 생각
    User findByUserName(String userName);
    User findByUserId(String userId);
}