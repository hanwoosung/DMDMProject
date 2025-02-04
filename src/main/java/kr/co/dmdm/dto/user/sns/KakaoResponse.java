package kr.co.dmdm.dto.user.sns;

import kr.co.dmdm.dto.common.OAuth2Response;
import lombok.RequiredArgsConstructor;

import java.util.Map;

/**
 * packageName    : kr.co.dmdm.dto.user.sns
 * fileName       : KakaoResponse
 * author         : 한우성
 * date           : 2025-02-04
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-04        한우성       최초 생성
 */
@RequiredArgsConstructor
public class KakaoResponse implements OAuth2Response {
    private final Map<String, Object> attribute;

    @Override
    public String getProvider() {
        return "KAKAO";
    }

    @Override
    public String getProviderId() {
        return attribute.get("id").toString();
    }

    @Override
    public String getEmail() {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attribute.get("kakao_account");
        if (kakaoAccount != null && kakaoAccount.containsKey("email")) {
            return kakaoAccount.get("email").toString();
        }
        return null;
    }

    @Override
    public String getNickname() {
        if (attribute.containsKey("properties")) {
            Map<String, Object> properties = (Map<String, Object>) attribute.get("properties");
            if (properties.containsKey("nickname")) {
                return properties.get("nickname").toString();
            }
        }

        if (attribute.containsKey("kakao_account")) {
            Map<String, Object> kakaoAccount = (Map<String, Object>) attribute.get("kakao_account");
            if (kakaoAccount.containsKey("profile")) {
                Map<String, Object> profile = (Map<String, Object>) kakaoAccount.get("profile");
                if (profile.containsKey("nickname")) {
                    return profile.get("nickname").toString();
                }
            }
        }

        return "";
    }

    @Override
    public String getBirthday() {
        return "";
    }

    @Override
    public String getBirthyear() {
        return "";
    }
}
