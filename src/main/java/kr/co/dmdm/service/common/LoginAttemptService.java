package kr.co.dmdm.service.common;

/**
 * packageName    : kr.co.dmdm.service.common
 * fileName       : LoginAttemptService
 * author         : 한우성
 * date           : 2025-02-18
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-18        한우성       최초 생성
 */

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class LoginAttemptService {

    private static final int MAX_ATTEMPTS = 5;
    private static final long BLOCK_TIME = 60;
    private final RedisTemplate<String, Object> redisTemplate;

    public void incrementAttempts(String username) {
        String redisKey = "login:" + username;
        Integer attempts = (Integer) redisTemplate.opsForValue().get(redisKey);
        if (attempts == null) {
            attempts = 0;
        }
        attempts++;

        redisTemplate.opsForValue().set(redisKey, attempts, BLOCK_TIME, TimeUnit.SECONDS);
    }

    public int getAttempts(String username) {
        String redisKey = "login:" + username;
        Integer attempts = (Integer) redisTemplate.opsForValue().get(redisKey);
        return (attempts != null) ? attempts : 0;
    }

    public boolean isBlocked(String username) {
        return getAttempts(username) >= MAX_ATTEMPTS;
    }

    public void resetAttempts(String username) {
        String redisKey = "login:" + username;
        redisTemplate.delete(redisKey);
    }
}
