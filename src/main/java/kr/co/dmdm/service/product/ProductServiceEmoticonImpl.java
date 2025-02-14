package kr.co.dmdm.service.product;

import kr.co.dmdm.dto.product.request.ProductRequestDto;
import kr.co.dmdm.type.ProductType;
import kr.co.dmdm.utils.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;

/**
 * packageName    : kr.co.dmdm.service.product
 * fileName       : ProductServiceEmoticonImpl
 * author         : 황승현
 * date           : 2025-02-14
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        황승현       최초 생성
 */
@Service
@RequiredArgsConstructor
@Primary
public class ProductServiceEmoticonImpl implements ProductService {

    private final FileUploadUtil fileUploadUtil;

    @Override
    public void saveProduct(ProductRequestDto productRequestDto) {
        System.out.println(productRequestDto);
    }
}
