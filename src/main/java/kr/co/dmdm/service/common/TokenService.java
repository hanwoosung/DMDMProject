package kr.co.dmdm.service.common;

public interface TokenService {
     void saveRefreshToken(String userId, String refreshToken);
     String getRefreshToken(String userId);
     void deleteRefreshToken(String userId);

}
