package kr.co.dmdm.service.common;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.dmdm.jwt.JWTUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import static kr.co.dmdm.utils.CookieUtil.createCookie;

@Service
@RequiredArgsConstructor
public class ReissueService {

    private final JWTUtil jwtUtil;
    private final TokenService tokenService;

    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response) {
        String refresh = null;
        Cookie[] cookies = request.getCookies();
        for (Cookie cookie : cookies) {
            if (cookie.getName().equals("refresh")) {
                refresh = cookie.getValue();
            }
        }

        if (refresh == null) {
            return new ResponseEntity<>("refresh token null", HttpStatus.BAD_REQUEST);
        }

        // 레디스에서 리프레시 토큰 확인
        String userId = jwtUtil.getUsername(refresh);
        String storedRefreshToken = tokenService.getRefreshToken(userId);

        if (storedRefreshToken == null || !storedRefreshToken.equals(refresh)) {
            return new ResponseEntity<>("invalid or expired refresh token", HttpStatus.BAD_REQUEST);
        }

        // 토큰 만료 여부 확인
        try {
            jwtUtil.isExpired(refresh);
        } catch (ExpiredJwtException e) {
            return new ResponseEntity<>("refresh token expired", HttpStatus.BAD_REQUEST);
        }

        // 토큰이 리프레시 토큰인지 확인
        String category = jwtUtil.getCategory(refresh);
        if (!category.equals("refresh")) {
            return new ResponseEntity<>("invalid refresh token", HttpStatus.BAD_REQUEST);
        }

        // 기존 리프레시 토큰 삭제
        tokenService.deleteRefreshToken(userId);

        // 새로운 액세스 및 리프레시 토큰 생성
        String role = jwtUtil.getRole(refresh);
        String newAccess = jwtUtil.createJwt("access", userId, role, 600000L);
        String newRefresh = jwtUtil.createJwt("refresh", userId, role, 86400000L);

        // 새로운 리프레시 토큰을 레디스에 저장
        tokenService.saveRefreshToken(userId, newRefresh);

        // 응답에 토큰 추가
        response.setHeader("access", newAccess);
        response.addCookie(createCookie("refresh", newRefresh,24*60*60));

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
