package kr.co.dmdm.kafka;

import kr.co.dmdm.type.Alarm;
import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage(Alarm alarmType, String message) {
        String topic = getTopicByAlarmType(alarmType);
        System.out.println("Producer topic: " + topic + ", message: " + message);
        kafkaTemplate.send(topic, message);
    }

    private String getTopicByAlarmType(Alarm alarmType) {
        return switch (alarmType) {
            case COMMENT_WRITE -> "notifications.comment";
            case EMOTICON_BUY -> "notifications.emoticon";
            case MESSAGE_SEND -> "notifications.message";
            case FIGHT_SEND -> "notifications.fight";
        };
    }
}