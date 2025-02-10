package kr.co.dmdm.config;

import kr.co.dmdm.entity.User;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.security.CustomUserDetails;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.Message;
import org.springframework.messaging.MessageChannel;
import org.springframework.messaging.simp.stomp.StompCommand;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.messaging.support.ChannelInterceptor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

/**
 * packageName    : kr.co.dmdm.config
 * fileName       : WebSocketInterseptor
 * author         : 최기환
 * date           : 2025-01-22
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-22        최기환       최초 생성
 */
@Component
@Slf4j
@RequiredArgsConstructor
public class WebSocketInterceptor implements ChannelInterceptor {

    private final JWTUtil jwtUtil;

    @Override
    public Message<?> preSend(Message<?> message, MessageChannel channel) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(message);
        StompCommand command = accessor.getCommand();

        if (command == StompCommand.SUBSCRIBE) {
            String destination = accessor.getDestination();
            String token = accessor.getFirstNativeHeader("access");

            if (token == null || token.trim().isEmpty()) {
                throw new IllegalArgumentException("❌ 구독 실패: JWT 없음");
            }

            try {
                jwtUtil.isExpired(token);

                String userId = jwtUtil.getUsername(token);
                String role = jwtUtil.getRole(token);

                User userEntity = new User();
                userEntity.setUserId(userId);
                userEntity.setUserRole(role);
                CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);

                Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authToken);

                log.info("✅ 구독 허용: " + destination);
            } catch (Exception e) {
                throw new IllegalArgumentException("❌ 구독 실패: JWT 유효하지 않음");
            }
        }

        return message;
    }

}
