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
@RequiredArgsConstructor
public class ProductServiceFactory {
    private final Map<ProductType, ProductService> productServiceMap;

    @Autowired
    public ProductServiceFactory(List<ProductService> productServices) {
        this.productServiceMap = productServices.stream()
                .collect(Collectors.toMap(
                        service -> getProductType(service.getClass()),
                        service -> service
                ));
    }

    public ProductService getService(ProductType productType) {
        return productServiceMap.get(productType);
    }

    private ProductType getProductType(Class<? extends ProductService> serviceClass) {
        if (serviceClass == ProductServiceEmoticonImpl.class) {
            return ProductType.EMOTICON;
        }
        throw new IllegalArgumentException("지원되지 않는 ProductType입니다.");
    }
}