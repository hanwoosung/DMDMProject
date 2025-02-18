package kr.co.dmdm.service.common;

import kr.co.dmdm.repository.jpa.common.RedisRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginAttemptService {

    private final RedisRepository redisRepository;

    /**
     * 로그인 시도 횟수 증가 (IP 기준)
     */
    public void incrementAttempts(String ipAddress) {
        redisRepository.incrementLoginAttempts(ipAddress);
    }

    /**
     * 현재 로그인 시도 횟수 가져오기 (IP 기준)
     */
    public int getAttempts(String ipAddress) {
        return redisRepository.getLoginAttempts(ipAddress);
    }

    /**
     * 로그인 차단 여부 확인 (IP 기준)
     */
    public boolean isBlocked(String ipAddress) {
        return redisRepository.isLoginBlocked(ipAddress);
    }

    /**
     * 로그인 성공 시 실패 횟수 초기화 (IP 기준)
     */
    public void resetAttempts(String ipAddress) {
        redisRepository.resetLoginAttempts(ipAddress);
    }
}
