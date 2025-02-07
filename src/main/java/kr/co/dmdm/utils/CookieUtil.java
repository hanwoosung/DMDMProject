package kr.co.dmdm.utils;
import jakarta.servlet.http.Cookie;
/**
 * packageName    : kr.co.dmdm.utils
 * fileName       : Cookie
 * author         : 한우성
 * date           : 2025-01-24
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-24        한우성       최초 생성
 */
public class CookieUtil {
    public static Cookie createCookie(String key, String value , Integer expiredS) {
        Cookie cookie = new Cookie(key, value);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(expiredS);
        return cookie;
    }
}
