package kr.co.dmdm.service.product;

import kr.co.dmdm.dto.product.request.ProductRequestDto;
import kr.co.dmdm.dto.product.response.ProductDetailResponseDto;
import kr.co.dmdm.type.ProductType;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.service.product
 * fileName       : ProductService
 * author         : 황승현
 * date           : 2025-02-14
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        황승현       최초 생성
 */
public interface ProductService {
    void saveProduct(ProductRequestDto productRequestDto);

    ProductDetailResponseDto getProductDetail(Integer productId);

    List<ProductDetailResponseDto> getProduct();
}
