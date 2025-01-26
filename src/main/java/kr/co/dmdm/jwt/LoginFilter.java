package kr.co.dmdm.jwt;

import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import kr.co.dmdm.dto.user.request.LoginRequestDto;
import kr.co.dmdm.global.Response;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.security.CustomUserDetails;
import kr.co.dmdm.service.common.TokenService;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;
import java.util.concurrent.TimeUnit;

import static kr.co.dmdm.utils.CookieUtil.createCookie;

public class LoginFilter extends UsernamePasswordAuthenticationFilter {

    private final TokenService tokenService;
    private final AuthenticationManager authenticationManager;
    private final JWTUtil jwtUtil;

    public LoginFilter(TokenService tokenService, AuthenticationManager authenticationManager, JWTUtil jwtUtil) {
        this.tokenService = tokenService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) throws AuthenticationException {

        try {
            ObjectMapper objectMapper = new ObjectMapper();
            LoginRequestDto loginRequest = objectMapper.readValue(request.getInputStream(), LoginRequestDto.class);

            String username = loginRequest.getUserId();
            String password = loginRequest.getUserPw();

            System.out.println("Received username: " + username);

            if (username == null || password == null) {
                throw new CustomException(HttpStatus.BAD_REQUEST, "Username or password is missing");
            }

            UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(username, password, null);

            return authenticationManager.authenticate(authToken);

        } catch (IOException e) {
            throw new CustomException(HttpStatus.BAD_REQUEST, "Invalid JSON request");
        }
    }

    @Override
    protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain, Authentication authentication) {

        CustomUserDetails customUserDetails = (CustomUserDetails) authentication.getPrincipal();

        String userId = customUserDetails.getUsername();
        String userNickName = customUserDetails.getUserNickName();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();


        String access = jwtUtil.createJwt("access",userId, role, 600000L);
        String refresh = jwtUtil.createJwt("refresh",userId, role, 86400000L);
        tokenService.saveRefreshToken(userId, refresh);

        Response<String> successResponse = Response.successNoTime("로그인 성공",userNickName);

        try {
            response.setHeader("access", access);
            response.addCookie(createCookie("refresh", refresh,24*60*60));

            response.setStatus(HttpServletResponse.SC_OK);
            response.setContentType("application/json;charset=UTF-8");

            ObjectMapper objectMapper = new ObjectMapper();
            response.getWriter().write(objectMapper.writeValueAsString(successResponse));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    protected void unsuccessfulAuthentication(HttpServletRequest request, HttpServletResponse response, AuthenticationException failed) {
        String errorMessage = "아이디 또는 비밀번호를 확인해주세요.";

        Response<Void> errorResponse = Response.failureNoTime(HttpStatus.UNAUTHORIZED, errorMessage);

        try {
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType("application/json;charset=UTF-8");

            ObjectMapper objectMapper = new ObjectMapper();
            response.getWriter().write(objectMapper.writeValueAsString(errorResponse));
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

}
