package kr.co.dmdm.repository.jpa.common;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.GenericJackson2JsonRedisSerializer;
import org.springframework.stereotype.Repository;

import java.util.concurrent.TimeUnit;

@Repository
@RequiredArgsConstructor
public class RedisRepository {

    private final RedisTemplate<String, Object> redisTemplate;

    private static final int MAX_ATTEMPTS = 5;
    private static final long BLOCK_TIME = 60;

    @PostConstruct
    public void init() {
        redisTemplate.setValueSerializer(new GenericJackson2JsonRedisSerializer());
    }

    public void incrementLoginAttempts(String ipAddress) {
        String redisKey = "login_attempts:" + ipAddress;
        Integer attempts = getLoginAttempts(ipAddress);
        attempts++;

        redisTemplate.opsForValue().set(redisKey, attempts, BLOCK_TIME, TimeUnit.SECONDS);
    }

    public int getLoginAttempts(String ipAddress) {
        String redisKey = "login_attempts:" + ipAddress;
        Object value = redisTemplate.opsForValue().get(redisKey);

        if (value instanceof Integer) {
            return (Integer) value;
        } else if (value instanceof String) {
            try {
                return Integer.parseInt((String) value);
            } catch (NumberFormatException e) {
                return 0;
            }
        }
        return 0;
    }

    public boolean isLoginBlocked(String ipAddress) {
        return getLoginAttempts(ipAddress) >= MAX_ATTEMPTS;
    }

    public void resetLoginAttempts(String ipAddress) {
        String redisKey = "login_attempts:" + ipAddress;
        redisTemplate.delete(redisKey);
    }

    public void saveRefreshToken(String userId, String refreshToken, long durationMs) {
        redisTemplate.opsForValue().set("refresh:" + userId, refreshToken, durationMs, TimeUnit.MILLISECONDS);
    }

    public String getRefreshToken(String userId) {
        Object value = redisTemplate.opsForValue().get("refresh:" + userId);
        return (value instanceof String) ? (String) value : null;
    }

    public void deleteRefreshToken(String userId) {
        redisTemplate.delete("refresh:" + userId);
    }
}
