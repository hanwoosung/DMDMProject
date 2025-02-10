package kr.co.dmdm.controller.common;

import kr.co.dmdm.dto.common.GubnDto;
import kr.co.dmdm.entity.Gubn;
import kr.co.dmdm.service.common.GubnService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.controller.common
 * fileName       : GubnController
 * author         : 한우성
 * date           : 2025-01-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        한우성       최초 생성
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class GubnController {
    private final GubnService gubnService;

    @PostMapping("/gubn")
    public List<GubnDto> findGubnList(@RequestBody GubnDto gubnDto) {
        System.out.println("반가워~~~~~~~~~~~~~" + gubnDto.toString());
        System.out.println("asd;kalsda;sld@@@@@@@@@@@@@@@@@@@@2222222222" + gubnService.findAllByIdParentCode(gubnDto.getParentCode()).toString());
        return gubnService.findAllByIdParentCode(gubnDto.getParentCode());
    }

    @PostMapping("/gubn/{code}/{parentCode}")
    public GubnDto findGubnById(@PathVariable String code, @PathVariable String parentCode) {
        return gubnService.findByParentCodeAndCode(code, parentCode);
    }
}
