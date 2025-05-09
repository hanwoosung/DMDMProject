package kr.co.dmdm.service.common;

import kr.co.dmdm.dto.common.GubnDto;
import kr.co.dmdm.entity.Gubn;
import kr.co.dmdm.entity.GubnCompositeKey;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.service.common
 * fileName       : GubnService
 * author         : 한우성
 * date           : 2025-01-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        한우성       최초 생성
 */
@Service
public interface GubnService {

    List<GubnDto> findAllByIdParentCode(String parentCode);

    GubnDto findByParentCodeAndCode(String parentCode, String code);


    GubnDto saveGubn(GubnDto gubnDto);

    void updateStatus(List<GubnCompositeKey> gubnKeys, String status);

    List<GubnDto> findAllByIdChildCode(String parentCode);
}
