package kr.co.dmdm.service.product;

import kr.co.dmdm.dto.common.GubnDto;
import kr.co.dmdm.dto.product.request.ProductRequestDto;
import kr.co.dmdm.dto.product.response.ProductDetailResponseDto;
import kr.co.dmdm.entity.product.PointShopProduct;
import kr.co.dmdm.entity.product.detail.EmoticonDetail;
import kr.co.dmdm.entity.product.detail.EmoticonDetailId;
import kr.co.dmdm.repository.jpa.product.ProductRepository;
import kr.co.dmdm.repository.jpa.product.detail.EmoticonRepository;
import kr.co.dmdm.service.common.FileService;
import kr.co.dmdm.service.common.GubnService;
import kr.co.dmdm.type.ProductType;
import kr.co.dmdm.utils.ConvertUtils;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Primary;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    private final FileService fileService;
    private final GubnService gubnService;
    private final String productType = ProductType.EMOTICON.name();
    private final ProductRepository productRepository;
    private final EmoticonRepository emoticonRepository;

    @SneakyThrows
    @Override
    public void saveProduct(ProductRequestDto productRequestDto) {
        System.out.println(productRequestDto);

        String userId = "yiok79";

        String parentCode = ConvertUtils.convertToSnakeCase(ProductType.class.getSimpleName());

        GubnDto byParentCodeAndCode = gubnService.findByParentCodeAndCode(parentCode, productType);
        String tableName = byParentCodeAndCode.getFirstSpecial();

        PointShopProduct product = PointShopProduct.builder()
                .productName(productRequestDto.getProductName())
                .productType(productType)
                .productPrice(productRequestDto.getProductPrice())
                .productDetail(productRequestDto.getProductDetail())
                .userId(userId)
                .build();
        System.out.println(product);

        PointShopProduct savedProduct = productRepository.save(product);

        List<MultipartFile> multipartFiles = productRequestDto.getFiles();

        String stringId = savedProduct.getId().toString();

        for (int i = 0; i < multipartFiles.size(); i++) {
            if (i == 0) {
                fileService.saveFile(multipartFiles.get(i), "PRODUCT_IMAGE", stringId, userId);
            }
            EmoticonDetail emoticonDetail = new EmoticonDetail();

            EmoticonDetailId emoticonDetailId = new EmoticonDetailId();
            emoticonDetailId.setProductId(savedProduct.getId());
            emoticonDetailId.setOrderNo(i);

            emoticonDetail.setId(emoticonDetailId);

            emoticonRepository.save(emoticonDetail);
            fileService.saveFile(multipartFiles.get(i), tableName, stringId + "/" + i, userId);
        }
    }

    @Override
    public ProductDetailResponseDto getProductDetail(Integer productId) {
        PointShopProduct product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다. productId: " + productId));

        List<String> imageUrls = emoticonRepository.findByIdProductId(productId).stream()
                .map(detail -> fileService.findFileByRefNoAndFileType(productId + "/" + detail.getId().getOrderNo(), "tbl_emoticon_detail").getFilePath())
                .collect(Collectors.toList());

        String mainImageUrl = fileService.findFileByRefNoAndFileType(productId.toString(), "PRODUCT_IMAGE").getFilePath();

        return new ProductDetailResponseDto(product, mainImageUrl, imageUrls);
    }


    @Override
    public List<ProductDetailResponseDto> getProduct() {
        return productRepository.findAll().stream()
                .map(product -> {
                    String mainImageUrl = fileService.findFileByRefNoAndFileType(product.getId().toString(), "PRODUCT_IMAGE").getFilePath();
                    List<String> imageUrls = emoticonRepository.findByIdProductId(product.getId()).stream()
                            .map(detail -> fileService.findFileByRefNoAndFileType(product.getId() + "/" + detail.getId().getOrderNo(), "tbl_emoticon_detail").getFilePath())
                            .collect(Collectors.toList());
                    return new ProductDetailResponseDto(product, mainImageUrl, imageUrls);
                })
                .collect(Collectors.toList());
    }
}
