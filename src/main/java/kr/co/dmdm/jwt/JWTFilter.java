package kr.co.dmdm.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.dmdm.entity.User;
import io.jsonwebtoken.ExpiredJwtException;
import kr.co.dmdm.security.CustomUserDetails;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.io.PrintWriter;

public class JWTFilter extends OncePerRequestFilter {

    private final JWTUtil jwtUtil;

    public JWTFilter(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        // 헤더에서 access키에 담긴 토큰을 꺼냄
        String accessToken = request.getHeader("access");

        System.out.println("🔍 JWTFilter 실행됨! 요청 URI: " + request.getRequestURI());

        // 🔹 토큰이 없으면 그냥 다음 필터로 넘김 (예외 발생 방지)
        if (accessToken == null || accessToken.trim().isEmpty()) {
            System.out.println("🔹 Access Token 없음, 다음 필터로 이동");
            filterChain.doFilter(request, response);
            return;
        }

        // 🔹 토큰 만료 여부 확인, 만료시 클라이언트에 401 응답
        try {
            jwtUtil.isExpired(accessToken);
        } catch (ExpiredJwtException e) {
            System.out.println("🔹 Access Token 만료됨! 401 응답 반환");
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Access token expired\"}");
            return;
        } catch (Exception e) {
            System.out.println("🔹 JWT 검증 실패: " + e.getMessage());
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json");
            response.getWriter().write("{\"error\": \"Invalid token\"}");
            return;
        }

        // 토큰이 access인지 확인 (발급시 페이로드에 명시)
        String category = jwtUtil.getCategory(accessToken);

        if (!category.equals("access")) {

            //response body
            PrintWriter writer = response.getWriter();
            writer.print("invalid access token");

            //response status code
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            return;
        }

        String username = jwtUtil.getUsername(accessToken);
        String role = jwtUtil.getRole(accessToken);

        User userEntity = new User();
        userEntity.setUserId(username);
        userEntity.setUserRole(role);
        CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(authToken);

        filterChain.doFilter(request, response);
    }
}
