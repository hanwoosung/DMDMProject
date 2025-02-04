package kr.co.dmdm.service.common;

import kr.co.dmdm.repository.jpa.common.TokenRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@RequiredArgsConstructor
public class TokenServiceImpl implements TokenService{
    private final TokenRepository tokenRepository;

    @Override
    public void saveRefreshToken(String userId, String refreshToken) {
        log.info("asdaczxcz{}",refreshToken);
        tokenRepository.saveRefreshToken(userId, refreshToken, 86400000L);
    }

    @Override
    public String getRefreshToken(String userId) {
        return tokenRepository.getRefreshToken(userId);
    }

    @Override
    public void deleteRefreshToken(String userId) {
        tokenRepository.deleteRefreshToken(userId);
    }

}
