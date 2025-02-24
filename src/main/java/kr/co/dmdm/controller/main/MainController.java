package kr.co.dmdm.controller.main;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.HttpServletRequest;
import kr.co.dmdm.dto.main.response.MainDataDto;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.service.main.MainService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
public class MainController {
    private final MainService mainService;
    private final JWTUtil   jwtUtil;
    @GetMapping()
    public MainDataDto main(HttpServletRequest request) {

        String accessToken = request.getHeader("access");
        String userId = null;

        if (accessToken != null && !accessToken.trim().isEmpty()) {
            try {
                jwtUtil.isExpired(accessToken);
                userId = jwtUtil.getUsername(accessToken);
            } catch (ExpiredJwtException e) {
                log.info("토큰 만료");
            } catch (Exception e) {
                log.error("에러용 ,{}",e.getMessage());
            }
        } else {
            System.out.println("토큰 없음");
        }

        return mainService.findBoardList(userId);
    }


}
