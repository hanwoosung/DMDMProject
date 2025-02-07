package kr.co.dmdm.dto.common;

public interface OAuth2Response {

    String getProvider();

    String getProviderId();

    String getEmail();

    String getNickname();

    String getBirthday();

    String getBirthyear();
}