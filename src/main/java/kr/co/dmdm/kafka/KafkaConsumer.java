package kr.co.dmdm.kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.kafka.support.KafkaHeaders;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    // application.properties에서 토픽 이름 로드
    @Value("${kafka.topic.comment-write}")
    private String commentWriteTopic;

    @Value("${kafka.topic.emoticon-buy}")
    private String emoticonBuyTopic;

    @Value("${kafka.topic.message-send}")
    private String messageSendTopic;

    @Value("${kafka.topic.fight-send}")
    private String fightSendTopic;

    // 각 토픽 생성 (필요시)
    @Bean
    public NewTopic commentTopic() {
        return TopicBuilder.name(commentWriteTopic)
                .partitions(10)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic emoticonTopic() {
        return TopicBuilder.name(emoticonBuyTopic)
                .partitions(10)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic messageTopic() {
        return TopicBuilder.name(messageSendTopic)
                .partitions(10)
                .replicas(1)
                .build();
    }

    @Bean
    public NewTopic fightTopic() {
        return TopicBuilder.name(fightSendTopic)
                .partitions(10)
                .replicas(1)
                .build();
    }

    // 단일 토픽별 메시지 리스너
    @KafkaListener(topics = "${kafka.topic.comment-write}", groupId = "notifications")
    public void consumeCommentWrite(String message) {
        System.out.println("Consumer topic: comment-write, message: " + message);
        handleCommentWrite(message);
    }

    @KafkaListener(topics = "${kafka.topic.emoticon-buy}", groupId = "notifications")
    public void consumeEmoticonBuy(String message) {
        System.out.println("Consumer topic: emoticon-buy, message: " + message);
        handleEmoticonBuy(message);
    }

    @KafkaListener(topics = "${kafka.topic.message-send}", groupId = "notifications")
    public void consumeMessageSend(String message) {
        System.out.println("Consumer topic: message-send, message: " + message);
        handleMessageSend(message);
    }

    @KafkaListener(topics = "${kafka.topic.fight-send}", groupId = "notifications")
    public void consumeFightSend(String message) {
        System.out.println("Consumer topic: fight-send, message: " + message);
        handleFightSend(message);
    }

    // 통합 리스너 (멀티 토픽 리스너)
    @KafkaListener(topics = {"${kafka.topic.comment-write}", "${kafka.topic.emoticon-buy}", "${kafka.topic.message-send}", "${kafka.topic.fight-send}"}, groupId = "notifications")
    public void consumeMessages(String message, @Header(KafkaHeaders.RECEIVED_TOPIC) String topic) {
        System.out.println("Received message: " + message + ", from topic: " + topic);

        // 토픽에 따른 로직 분리
        if (topic.equals(commentWriteTopic)) {
            handleCommentWrite(message);
        } else if (topic.equals(emoticonBuyTopic)) {
            handleEmoticonBuy(message);
        } else if (topic.equals(messageSendTopic)) {
            handleMessageSend(message);
        } else if (topic.equals(fightSendTopic)) {
            handleFightSend(message);
        } else {
            throw new IllegalArgumentException("Unknown topic: " + topic);
        }
    }

    // 토픽별 핸들러 메서드
    private void handleCommentWrite(String message) {
        // comment-write 메시지 처리 로직
        System.out.println("[Handler] Processing comment-write: " + message);
        // TODO: 메시지에 대한 실제 로직 추가
    }

    private void handleEmoticonBuy(String message) {
        // emoticon-buy 메시지 처리 로직
        System.out.println("[Handler] Processing emoticon-buy: " + message);
        // TODO: 메시지에 대한 실제 로직 추가
    }

    private void handleMessageSend(String message) {
        // message-send 메시지 처리 로직
        System.out.println("[Handler] Processing message-send: " + message);
        // TODO: 메시지에 대한 실제 로직 추가
    }

    private void handleFightSend(String message) {
        // fight-send 메시지 처리 로직
        System.out.println("[Handler] Processing fight-send: " + message);
        // TODO: 메시지에 대한 실제 로직 추가
    }
}