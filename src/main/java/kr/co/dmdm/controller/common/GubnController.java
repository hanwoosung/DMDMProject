package kr.co.dmdm.controller.common;

import kr.co.dmdm.dto.common.GubnDto;
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
    public List<GubnDto> findGubnList(@RequestBody GubnDto gubnDto){
        return gubnService.findAllByIdParentCode(gubnDto.getParentCode());
    }

    @PostMapping("/gubn/{parentCode}")
    public GubnDto findGubnById(@PathVariable("parentCode") String parentCode){
        return null;
    }
}
