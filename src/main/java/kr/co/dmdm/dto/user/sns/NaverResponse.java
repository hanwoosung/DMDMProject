package kr.co.dmdm.dto.user.sns;

import kr.co.dmdm.dto.common.OAuth2Response;

import java.util.Map;

public class NaverResponse implements OAuth2Response {

    private final Map<String, Object> attribute;

    public NaverResponse(Map<String, Object> attribute) {

        this.attribute = (Map<String, Object>) attribute.get("response");
    }

    @Override
    public String getProvider() {
        return "NAVER";
    }

    @Override
    public String getProviderId() {

        return attribute.get("id").toString();
    }

    @Override
    public String getEmail() {
        return attribute.get("email").toString();
    }

    @Override
    public String getNickname() {
        return attribute.get("nickname").toString();
    }

    @Override
    public String getBirthday() {
        return attribute.get("birthday").toString();
    }

    @Override
    public String getBirthyear() {
        return attribute.get("birthyear").toString();
    }

}