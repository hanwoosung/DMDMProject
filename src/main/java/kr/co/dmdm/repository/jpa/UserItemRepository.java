package kr.co.dmdm.repository.jpa;

import kr.co.dmdm.entity.UserItem;
import kr.co.dmdm.entity.UserItemId;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : kr.co.dmdm.repository.jpa
 * fileName       : UserItemRepsitory
 * author         : 황승현
 * date           : 2025-02-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-21        황승현       최초 생성
 */
public interface UserItemRepository extends JpaRepository<UserItem, UserItemId> {
}
