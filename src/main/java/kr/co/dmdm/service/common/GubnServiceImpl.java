package kr.co.dmdm.service.common;

import kr.co.dmdm.dto.common.GubnDto;
import kr.co.dmdm.repository.jpa.common.GubnRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.service.common
 * fileName       : GubnServiceImpl
 * author         : 한우성
 * date           : 2025-01-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        한우성       최초 생성
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class GubnServiceImpl implements GubnService {

    private final GubnRepository gubnRepository;

    public List<GubnDto> findAllByIdParentCode(String parentCode) {
        log.info("findAllByIdParentCode  : {}", parentCode );
        return gubnRepository.findByParentCode(parentCode);
    }
}
