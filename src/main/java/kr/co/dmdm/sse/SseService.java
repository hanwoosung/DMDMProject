package kr.co.dmdm.sse;

import kr.co.dmdm.type.AlarmType;
import reactor.core.publisher.Flux;

public interface SseService {
    Flux<String> streamNotifications(String userId);
    void sendAlarmToUser(String userId, AlarmType alarmType);
}