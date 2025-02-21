package kr.co.dmdm.service.product;

import kr.co.dmdm.dto.common.GubnDto;
import kr.co.dmdm.dto.point.request.PointHistoryRequestDto;
import kr.co.dmdm.dto.product.request.ProductRequestDto;
import kr.co.dmdm.dto.product.response.ProductDetailResponseDto;
import kr.co.dmdm.entity.User;
import kr.co.dmdm.entity.UserItem;
import kr.co.dmdm.entity.UserItemId;
import kr.co.dmdm.entity.product.Product;
import kr.co.dmdm.entity.product.detail.EmoticonDetail;
import kr.co.dmdm.entity.product.detail.EmoticonDetailId;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import kr.co.dmdm.repository.jpa.UserItemRepository;
import kr.co.dmdm.repository.jpa.UserRepository;
import kr.co.dmdm.repository.jpa.product.ProductRepository;
import kr.co.dmdm.repository.jpa.product.detail.EmoticonRepository;
import kr.co.dmdm.service.common.FileService;
import kr.co.dmdm.service.common.GubnService;
import kr.co.dmdm.service.point.PointServiceImpl;
import kr.co.dmdm.type.PointHistoryType;
import kr.co.dmdm.type.ProductType;
import kr.co.dmdm.utils.ConvertUtils;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import org.springframework.context.annotation.Primary;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
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
    private final ProductType productType = ProductType.EMOTICON;
    private final String productTypeName = productType.name();
    private final ProductRepository productRepository;
    private final EmoticonRepository emoticonRepository;
    private final UserRepository userRepository;
    private final PointServiceImpl pointServiceImpl;
    private final UserItemRepository userItemRepository;

    @SneakyThrows
    @Override
    public void saveProduct(ProductRequestDto productRequestDto) {
        System.out.println(productRequestDto);

        String userId = productRequestDto.getUserId();

        final int emoticonRegisterPointUnit = 50;
        int emoticonRegisterPoint = emoticonRegisterPointUnit * productRequestDto.getFiles().size();

        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new CustomException(ExceptionEnum.USER_NOT_FOUND);
        }

        int userPoint = user.getUserPoint();
        if (user.getUserPoint() < emoticonRegisterPoint) {
            int lackPoint = (userPoint - emoticonRegisterPoint) * -1;
            throw new CustomException(HttpStatus.BAD_REQUEST, "등록을 위한 포인트 " + lackPoint + " 부족합니다.");
        }

        String parentCode = ConvertUtils.convertToSnakeCase(ProductType.class.getSimpleName());

        GubnDto byParentCodeAndCode = gubnService.findByParentCodeAndCode(parentCode, productTypeName);
        String tableName = byParentCodeAndCode.getFirstSpecial();

        Product product = Product.builder()
                .productName(productRequestDto.getProductName())
                .productType(productTypeName)
                .productPrice(productRequestDto.getProductPrice())
                .productDetail(productRequestDto.getProductDetail())
                .userId(userId)
                .build();
        System.out.println(product);

        Product savedProduct = productRepository.save(product);

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
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다. productId: " + productId));

        List<String> imageUrls = emoticonRepository.findByIdProductId(productId).stream()
                .map(detail -> fileService.findFileByRefNoAndFileType(productId + "/" + detail.getId().getOrderNo(), "tbl_emoticon_detail").getFilePath())
                .collect(Collectors.toList());

        String mainImageUrl = fileService.findFileByRefNoAndFileType(String.valueOf(productId), "PRODUCT_IMAGE").getFilePath();

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

    @Transactional
    @Override
    public void buyProduct(String userId, Integer productId) {
        Product product = productRepository.findById(productId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.PRODUCT_NOT_FOUND));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ExceptionEnum.USER_NOT_FOUND));

        int productPrice = product.getProductPrice();
        int userPoint = user.getUserPoint();

        if (productPrice > userPoint) {
            int lackPoint = (userPoint - productPrice) * -1;
            throw new CustomException(HttpStatus.BAD_REQUEST, lackPoint + "포인트가 부족합니다.\n현재 포인트: " + userPoint);
        }

        PointHistoryRequestDto pointHistoryRequestDto = new PointHistoryRequestDto();
        pointHistoryRequestDto.setUserId(userId);
        pointHistoryRequestDto.setRemark(String.valueOf(productId));
        pointHistoryRequestDto.setPoint(productPrice * -1);
        pointHistoryRequestDto.setPointHistoryType(PointHistoryType.BUY_PRODUCT);

        pointServiceImpl.savePoint(pointHistoryRequestDto);

        UserItemId userItemId = new UserItemId();
        userItemId.setItemId(productId);
        userItemId.setItemType(productTypeName);

        UserItem userItem = userItemRepository.findById(userItemId).orElse(null);
        if(userItem != null) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "이미 구매한 이모티콘입니다.");
        }

        userItemRepository.save(UserItem.builder()
                .id(userItemId)
                .userId(userId)
                .build());
    }
}
