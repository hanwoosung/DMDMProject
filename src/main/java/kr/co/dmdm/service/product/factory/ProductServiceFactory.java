package kr.co.dmdm.service.product.factory;

import kr.co.dmdm.service.product.ProductService;
import kr.co.dmdm.service.product.ProductServiceEmoticonImpl;
import kr.co.dmdm.type.ProductType;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Component
public class ProductServiceFactory {
    private final Map<ProductType, ProductService> productServiceMap;

    @Autowired
    public ProductServiceFactory(List<ProductService> productServices) {
        System.out.println("🔥 등록된 서비스들: " + productServices); // 로그 추가
        this.productServiceMap = productServices.stream()
                .collect(Collectors.toMap(
                        this::getProductType,
                        service -> service
                ));
    }

    public ProductService getService(ProductType productType) {
        return productServiceMap.get(productType);
    }

    private ProductType getProductType(ProductService service) {
        if (service instanceof ProductServiceEmoticonImpl) {
            return ProductType.EMOTICON;
        }
        throw new IllegalArgumentException("지원되지 않는 ProductType입니다: " + service.getClass().getSimpleName());
    }
}
