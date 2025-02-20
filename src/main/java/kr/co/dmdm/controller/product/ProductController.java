package kr.co.dmdm.controller.product;

import kr.co.dmdm.dto.product.request.ProductRequestDto;
import kr.co.dmdm.dto.product.response.ProductDetailResponseDto;
import kr.co.dmdm.service.product.ProductService;
import kr.co.dmdm.service.product.factory.ProductServiceFactory;
import kr.co.dmdm.type.ProductType;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.controller.product
 * fileName       : ProductController
 * author         : 황승현
 * date           : 2025-02-14
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        황승현       최초 생성
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/product")
public class ProductController {
    private final ProductServiceFactory productServiceFactory;

    @PostMapping("/{productType}")
    public void saveProduct(
            @PathVariable String productType,
            @RequestParam("files") List<MultipartFile> files,
            @RequestParam("productName") String productName,
            @RequestParam("productDetail") String productDetail,
            @RequestParam("productPrice") int productPrice
    ) {
        ProductService productService = getProductService(productType);

        ProductRequestDto productRequestDto = new ProductRequestDto();
        productRequestDto.setFiles(files);
        productRequestDto.setProductName(productName);
        productRequestDto.setProductDetail(productDetail);
        productRequestDto.setProductPrice(productPrice);

        productService.saveProduct(productRequestDto);
    }

    @GetMapping("/{productType}/detail")
    public ProductDetailResponseDto getProductDetail(@PathVariable String productType, @RequestParam Integer productId) {
        ProductService productService = getProductService(productType);
        return productService.getProductDetail(productId);
    }

    @GetMapping("/{productType}")
    public List<ProductDetailResponseDto> getProduct(@PathVariable String productType) {
        ProductService productService = getProductService(productType);
        return productService.getProduct();
    }

    @PostMapping("/{productType}/{productId}")
    public void buyEmoticon(@PathVariable String productType, @PathVariable Integer productId) {
        ProductService productService = getProductService(productType);
        productService.buyProduct("yiok79", productId);
    }

    private ProductService getProductService(String productType) {
        return productServiceFactory.getService(ProductType.valueOf(productType.toUpperCase()));
    }

}
