package kr.co.dmdm.security;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.service.common.TokenService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import java.io.IOException;
import java.net.URLEncoder;

import static kr.co.dmdm.utils.CookieUtil.createCookie;

/**
 * OAuth2 로그인 성공 후 JWT 발급
 * access, refresh -> httpOnly 쿠키
 * 리다이렉트 되기 때문에 헤더로 전달 불가능
 */
@RequiredArgsConstructor
public class CustomOAuth2SuccessHandler extends SimpleUrlAuthenticationSuccessHandler {
    private final JWTUtil jwtUtil;
    private final TokenService tokenService;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        CustomOAuth2User customOAuth2User = (CustomOAuth2User) authentication.getPrincipal();

        String name = customOAuth2User.getName();
        String userId = customOAuth2User.getUsername();
        String role = authentication.getAuthorities().iterator().next().getAuthority();

        String access = jwtUtil.createJwt("access", userId, role, 43200000L);
        String refresh = jwtUtil.createJwt("refresh", userId, role, 86400000L);

        tokenService.saveRefreshToken(userId, refresh);

        response.addCookie(createCookie("access", access, 24 * 60 * 60));
        response.addCookie(createCookie("refresh", refresh, 24 * 60 * 60));

        String encodedName = URLEncoder.encode(name, "UTF-8");
        String encodedRole = URLEncoder.encode(role, "UTF-8");
        String encodedUserId = URLEncoder.encode(userId, "UTF-8");
        response.sendRedirect("http://localhost:3000/oauth2-jwt-header?name=" + encodedName + "&role=" + encodedRole + "&userId=" + encodedUserId);
    }

}
