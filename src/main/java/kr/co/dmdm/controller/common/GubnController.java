package kr.co.dmdm.controller.common;

import kr.co.dmdm.dto.common.GubnDto;
import kr.co.dmdm.entity.Gubn;
import kr.co.dmdm.entity.GubnCompositeKey;
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
@RequestMapping("/api/v1/gubn")
public class GubnController {
    private final GubnService gubnService;

    @PostMapping
    public List<GubnDto> findGubnList(@RequestBody GubnDto gubnDto) {
        return gubnService.findAllByIdParentCode(gubnDto.getParentCode());
    }

    @PostMapping("/{parentCode}/{code}")
    public GubnDto findGubnById(@PathVariable String parentCode, @PathVariable String code) {
        if(parentCode.equals("-")) {
            parentCode = "";
        }
        return gubnService.findByParentCodeAndCode(parentCode, code);
    }

    @PostMapping("/child")
    public List<GubnDto> findChildGubnList(@RequestBody GubnDto gubnDto) {
        return gubnService.findAllByIdChildCode(gubnDto.getParentCode());
    }

    @PostMapping("/save")
    public GubnDto saveGubn(@RequestBody GubnDto gubnDto) {
        return gubnService.saveGubn(gubnDto);
    }

    @PostMapping("/update-status")
    public void updateStatus(@RequestParam String status, @RequestBody List<GubnCompositeKey> gubnKeys) {
        gubnService.updateStatus(gubnKeys, status);
    }
}
