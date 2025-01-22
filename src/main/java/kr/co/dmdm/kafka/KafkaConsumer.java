//package kr.co.dmdm.kafka;
//
//import org.apache.kafka.clients.admin.NewTopic;
//import org.springframework.context.annotation.Bean;
//import org.springframework.kafka.annotation.KafkaListener;
//import org.springframework.kafka.config.TopicBuilder;
//import org.springframework.stereotype.Service;
//
//import java.io.IOException;
//
//@Service
//public class KafkaConsumer {
//
//	@Bean
//    public NewTopic topic1() {
//    	return TopicBuilder.name("topic1")
//    			.partitions(10) // 10개의 파티션으로 분할
//    			.replicas(1) // 1개의 레플리카로 복
//    			.build();
//    }
//
//    @KafkaListener(topics = "topic1", groupId = "foo")
//    public void consume1(String message) throws IOException {
//    	System.out.println("Consumer topic: topic1, message: " + message);
//    }
//
//    @Bean
//    public NewTopic topic2() {
//    	return TopicBuilder.name("topic2")
//    			.partitions(10)
//    			.replicas(1)
//    			.build();
//    }
//
//    @KafkaListener(topics = "topic2", groupId = "foo")
//    public void consume2(String message) throws IOException {
//    	System.out.println("Consumer topic: topic2, message: " + message);
//    }
//}