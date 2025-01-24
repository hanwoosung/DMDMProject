package kr.co.dmdm.controller.common;

import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.service.common.ReissueService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : kr.co.dmdm.controller.common
 * fileName       : ReissueController
 * author         : 한우성
 * date           : 2025-01-24
 * description    :refresh 토큰으로 재발급 요청 처리, refresh rotate 적용
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-24        한우성       최초 생성
 */
@RestController
@RequiredArgsConstructor
public class ReissueController {
    private final ReissueService reissueService;

}
