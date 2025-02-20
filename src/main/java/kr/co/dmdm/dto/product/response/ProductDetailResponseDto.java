package kr.co.dmdm.dto.product.response;

import kr.co.dmdm.entity.product.Product;
import lombok.Getter;

import java.util.List;

@Getter
public class ProductDetailResponseDto {
    private final Integer productId;
    private final String productName;
    private final String productType;
    private final Integer productPrice;
    private final String productDetail;
    private final String mainImage;
    private final List<String> emoticonImages;

    public ProductDetailResponseDto(Product product, String mainImage, List<String> emoticonImages) {
        this.productId = product.getId();
        this.productName = product.getProductName();
        this.productType = product.getProductType();
        this.productPrice = product.getProductPrice();
        this.productDetail = product.getProductDetail();
        this.mainImage = mainImage;
        this.emoticonImages = emoticonImages;
    }
}