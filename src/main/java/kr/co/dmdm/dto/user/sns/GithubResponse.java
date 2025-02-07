package kr.co.dmdm.dto.user.sns;

import kr.co.dmdm.dto.common.OAuth2Response;
import lombok.RequiredArgsConstructor;

import java.util.Map;

/**
 * packageName    : kr.co.dmdm.dto.user.sns
 * fileName       : GithubResponse
 * author         : 한우성
 * date           : 2025-02-04
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-04        한우성       최초 생성
 */
@RequiredArgsConstructor
public class GithubResponse implements OAuth2Response {
    private final Map<String, Object> attribute;

    @Override
    public String getProvider() {
        return "GITHUB";
    }

    @Override
    public String getProviderId() {
        return attribute.get("id").toString();
    }


    @Override
    public String getEmail() {
        return  attribute.get("email") != null ? attribute.get("email").toString() : null;
    }

    @Override
    public String getNickname() {
        return attribute.get("login").toString();
    }

    @Override
    public String getBirthday() {
        return null;
    }

    @Override
    public String getBirthyear() {
        return null;
    }
}
