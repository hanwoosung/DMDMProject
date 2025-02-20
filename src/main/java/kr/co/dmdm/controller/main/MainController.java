package kr.co.dmdm.controller.main;

import kr.co.dmdm.dto.main.response.MainDataDto;
import kr.co.dmdm.service.main.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : kr.co.dmdm.controller.main
 * fileName       : MainController
 * author         : 한우성
 * date           : 2025-02-11
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-11        한우성       최초 생성
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/main")
public class MainController {
    private final MainService mainService;

    @GetMapping()
    public MainDataDto main() {
        return mainService.findBoardList(null);
    }


}
