package kr.co.dmdm.utils;

import kr.co.dmdm.security.CustomUserDetails;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

/**
 * packageName    : kr.co.dmdm.utils
 * fileName       : SecurityUtil
 * author         : 최기환
 * date           : 2025-02-10
 * description    : 인증된 사용자 정보 가져오기
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-10        최기환       최초 생성
 */
@Component
public class SecurityUtil {

    public Map<String, Object> getCurrentUserInfo() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        // 인증되지 않은 사용자
        if (authentication == null || authentication.getPrincipal() == null ||
                authentication.getPrincipal() instanceof String) {
            System.out.println("인증안됨...................");
            Map<String, Object> guestInfo = new HashMap<>();
            guestInfo.put("id", "GUEST");
            guestInfo.put("name", "GUEST_USER");
            return guestInfo;
        }

        // 인증된 사용자 정보 반환
        CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
        Map<String, Object> userInfo = new HashMap<>();
        userInfo.put("id", userDetails.getUsername());
        userInfo.put("name", userDetails.getUserNickName());
        return userInfo;
    }
}
