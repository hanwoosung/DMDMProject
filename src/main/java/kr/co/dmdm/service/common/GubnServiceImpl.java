package kr.co.dmdm.service.common;

import kr.co.dmdm.dto.common.GubnDto;
import kr.co.dmdm.entity.Gubn;
import kr.co.dmdm.entity.GubnCompositeKey;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import kr.co.dmdm.repository.jpa.common.GubnRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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
    private final ModelMapper modelMapper;

    public List<GubnDto> findAllByIdParentCode(String parentCode) {
        log.info("findAllByIdParentCode  : {}", parentCode);
        return gubnRepository.findByParentCode(parentCode);
    }

    @Override
    public GubnDto findByParentCodeAndCode(String parentCode, String code) {

        Optional<Gubn> result = gubnRepository.findById(new GubnCompositeKey(parentCode, code));

        if (result.isPresent()) {

            Gubn gubn = result.get();

            return new GubnDto(
                    parentCode,
                    code,
                    gubn.getName(),
                    gubn.getFirstSpecial(),
                    gubn.getFirstSpecialDescription(),
                    gubn.getSecondSpecial(),
                    gubn.getSecondSpecialDescription(),
                    gubn.getThirdSpecial(),
                    gubn.getThirdSpecialDescription(),
                    gubn.getStatus()
            );
        }

        throw new CustomException(ExceptionEnum.DATABASE_ERROR);
    }

    @Transactional
    public GubnDto saveGubn(GubnDto gubnDto) {
        Gubn gubn = modelMapper.map(gubnDto, Gubn.class);
        Gubn savedEntity = gubnRepository.save(gubn);
        return modelMapper.map(savedEntity, GubnDto.class);
    }

    @Transactional
    public void updateStatus(List<GubnCompositeKey> gubnKeys, String status) {
        List<String> codes = gubnKeys.stream().map(GubnCompositeKey::getCode).toList();
        List<String> parentCodes = gubnKeys.stream().map(GubnCompositeKey::getParentCode).toList();
        gubnRepository.updateStatusByCodesAndParentCodes(codes, parentCodes, status);
    }

    @Override
    public List<GubnDto> findAllByIdChildCode(String parentCode) {
        return gubnRepository.findChildCodeByParentCode(parentCode);
    }
}
