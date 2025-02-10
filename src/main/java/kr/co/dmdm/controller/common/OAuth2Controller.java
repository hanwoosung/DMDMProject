package kr.co.dmdm.controller.common;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.dmdm.service.common.OAuth2JwtHeaderService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * OAuth2 로그인 시 바로 응답을 할 수 없기 때문에 리다이렉트 하여 쿠키로 토큰을 보냄 (액세스+리프레시)
 * -> 백엔드 서버로 재요청하여 헤더에 담아서 보냄. 프론트엔드는 로컬스토리지에 액세스 토큰 저장
 */
@RestController
@RequiredArgsConstructor
public class OAuth2Controller {
    private final OAuth2JwtHeaderService oAuth2JwtHeaderService;

    @PostMapping("/oauth2-jwt-header")
    public String oauth2JwtHeader(HttpServletRequest request, HttpServletResponse response) {
        return oAuth2JwtHeaderService.oauth2JwtHeaderSet(request, response);
    }
}
