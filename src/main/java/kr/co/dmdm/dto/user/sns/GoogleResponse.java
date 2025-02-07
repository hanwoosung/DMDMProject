package kr.co.dmdm.dto.user.sns;

import kr.co.dmdm.dto.common.OAuth2Response;
import lombok.RequiredArgsConstructor;

import java.util.Map;

/**
 * packageName    : kr.co.dmdm.dto.user.sns
 * fileName       : GoogleResponse
 * author         : 한우성
 * date           : 2025-02-04
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-04        한우성       최초 생성
 */
@RequiredArgsConstructor
public class GoogleResponse implements OAuth2Response {
    private final Map<String, Object> attribute;
    private String birthyear; // 🔹 수정: 값을 저장할 수 있도록 필드 유지
    private String birthday;

    @Override
    public String getProvider() {
        return "GOOGLE";
    }

    @Override
    public String getProviderId() {
        return attribute.get("sub").toString();
    }

    @Override
    public String getEmail() {
        return attribute.get("email").toString();
    }

    @Override
    public String getNickname() {
        return attribute.get("family_name").toString() + attribute.get("given_name").toString();
    }

    @Override
    public String getBirthday() {
        return this.birthday;
    }

    @Override
    public String getBirthyear() {
        return this.birthyear;
    }

    public void setBirthDate(String birthyear, String birthday) {
        this.birthyear = birthyear;
        this.birthday = birthday;
    }
}
