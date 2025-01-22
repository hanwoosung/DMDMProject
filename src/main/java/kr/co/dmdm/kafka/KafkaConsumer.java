package kr.co.dmdm.kafka;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.config.TopicBuilder;
import org.springframework.stereotype.Service;

@Service
public class KafkaConsumer {

    @Bean
    public NewTopic commentTopic() {
        return TopicBuilder.name("notifications.comment")
                .partitions(10)
                .replicas(1)
                .build();
    }

    @KafkaListener(topics = "notifications.comment", groupId = "comment-service")
    public void consumeCommentWrite(String message) {
        System.out.println("Consumer topic: notifications.comment, message: " + message);
    }

    @Bean
    public NewTopic emoticonTopic() {
        return TopicBuilder.name("notifications.emoticon")
                .partitions(10)
                .replicas(1)
                .build();
    }

    @KafkaListener(topics = "notifications.emoticon", groupId = "emoticon-service")
    public void consumeEmoticonBuy(String message) {
        System.out.println("Consumer topic: notifications.emoticon, message: " + message);
    }

    @Bean
    public NewTopic messageTopic() {
        return TopicBuilder.name("notifications.message")
                .partitions(10)
                .replicas(1)
                .build();
    }

    @KafkaListener(topics = "notifications.message", groupId = "message-service")
    public void consumeMessageSend(String message) {
        System.out.println("Consumer topic: notifications.message, message: " + message);
    }

    @Bean
    public NewTopic fightTopic() {
        return TopicBuilder.name("notifications.fight")
                .partitions(10)
                .replicas(1)
                .build();
    }

    @KafkaListener(topics = "notifications.fight", groupId = "fight-service")
    public void consumeFightSend(String message) {
        System.out.println("Consumer topic: notifications.fight, message: " + message);
    }
}