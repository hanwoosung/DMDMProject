package kr.co.dmdm.interceptor;

import jakarta.servlet.http.HttpServletRequest;
import kr.co.dmdm.entity.User;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.security.CustomUserDetails;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.http.server.ServletServerHttpRequest;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.WebSocketHandler;
import org.springframework.web.socket.server.HandshakeInterceptor;

import java.util.Map;

/**
 * packageName    : kr.co.dmdm.interceptor
 * fileName       : JwtWebSocketInterceptor
 * author         : 최기환
 * date           : 2025-02-10
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-10        최기환       최초 생성
 */
@Component
public class JwtWebSocketInterceptor implements HandshakeInterceptor {

    private final JWTUtil jwtUtil;

    public JwtWebSocketInterceptor(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public boolean beforeHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Map<String, Object> attributes) throws Exception {
        if (request instanceof ServletServerHttpRequest) {
            HttpServletRequest servletRequest = ((ServletServerHttpRequest) request).getServletRequest();
            String token = servletRequest.getHeader("access");

            System.out.println("✔ 토큰 값" + token);

            if (token == null || token.trim().isEmpty()) {
                System.out.println("❌ WebSocket 연결 거부: JWT 없음");
                return false;
            }

            try {
                jwtUtil.isExpired(token);
                String userId = jwtUtil.getUsername(token);
                String role = jwtUtil.getRole(token);
                attributes.put("id", userId);
                attributes.put("role", role);


                User userEntity = new User();
                userEntity.setUserId(userId);
                userEntity.setUserRole(role);
                CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);

                Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);

                System.out.println("✅ WebSocket 인증 성공: " + userId);
                return true;
            } catch (Exception e) {
                System.out.println("❌ WebSocket 연결 거부: JWT 유효하지 않음");
                return false;
            }
        }
        return false;
    }

    @Override
    public void afterHandshake(ServerHttpRequest request, ServerHttpResponse response, WebSocketHandler wsHandler, Exception exception) {
    }
}

