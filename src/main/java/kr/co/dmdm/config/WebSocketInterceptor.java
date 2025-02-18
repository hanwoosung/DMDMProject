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
import org.springframework.messaging.support.MessageHeaderAccessor;
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
        StompHeaderAccessor accessor = MessageHeaderAccessor.getAccessor(message, StompHeaderAccessor.class);
        StompCommand command = accessor.getCommand();

        if (command == StompCommand.SUBSCRIBE || command == StompCommand.CONNECT || command == StompCommand.SEND) {
            String accessToken = accessor.getFirstNativeHeader("access");

            if (accessToken == null || accessToken.trim().isEmpty()) {
                log.info("❌ 실패: JWT 없음");
                throw new IllegalArgumentException("❌ 실패: JWT 없음");
            }

//            try {
//                jwtUtil.isExpired(accessToken);
//            } catch (Exception e) {
//                e.printStackTrace();
//            }
        }

        return message;
    }

}
