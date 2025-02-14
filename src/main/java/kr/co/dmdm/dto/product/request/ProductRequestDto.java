package kr.co.dmdm.dto.product.request;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.dto.product.request
 * fileName       : ProductRequestDto
 * author         : 황승현
 * date           : 2025-02-14
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        황승현       최초 생성
 */
@Data
public class ProductRequestDto {
    private List<MultipartFile> files;
    private String productName;
    private String productDetail;
    private int productPrice;
}
