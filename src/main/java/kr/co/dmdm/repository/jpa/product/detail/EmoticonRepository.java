package kr.co.dmdm.repository.jpa.product.detail;

import kr.co.dmdm.entity.product.detail.EmoticonDetail;
import kr.co.dmdm.entity.product.detail.EmoticonDetailId;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.repository.jpa.product.detail
 * fileName       : EmoticonRepository
 * author         : 황승현
 * date           : 2025-02-18
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-18        황승현       최초 생성
 */
public interface EmoticonRepository extends JpaRepository<EmoticonDetail, EmoticonDetailId> {
    List<EmoticonDetail> findByIdProductId(Integer productId);
}
