package kr.co.dmdm.kafka;

import kr.co.dmdm.type.Alarm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;

    // 각 토픽 이름을 application.properties에서 가져옴
    @Value("${kafka.topic.comment-write}")
    private String commentWriteTopic;

    @Value("${kafka.topic.emoticon-buy}")
    private String emoticonBuyTopic;

    @Value("${kafka.topic.message-send}")
    private String messageSendTopic;

    @Value("${kafka.topic.fight-send}")
    private String fightSendTopic;

    public void sendMessage(Alarm alarmType, String message) {
        String topic = getTopicByAlarmType(alarmType);
        System.out.println("Producer topic: " + topic + ", message: " + message);
        kafkaTemplate.send(topic, message);
    }

    private String getTopicByAlarmType(Alarm alarmType) {
        return switch (alarmType) {
            case COMMENT_WRITE -> commentWriteTopic;
            case EMOTICON_BUY -> emoticonBuyTopic;
            case MESSAGE_SEND -> messageSendTopic;
            case FIGHT_SEND -> fightSendTopic;
        };
    }
}