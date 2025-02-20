package kr.co.dmdm.repository.jpa.product;

import kr.co.dmdm.entity.product.Product;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * packageName    : kr.co.dmdm.repository.jpa.product
 * fileName       : ProductRepository
 * author         : 황승현
 * date           : 2025-02-18
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-18        황승현       최초 생성
 */
public interface ProductRepository extends JpaRepository<Product, Integer> {
}
