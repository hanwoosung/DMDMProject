package kr.co.dmdm.kafka;

import lombok.RequiredArgsConstructor;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducer {
    private final KafkaTemplate<String, String> kafkaTemplate;

    public void sendMessage1(String message) {
    	System.out.println("Producer topic: topic1, message: " + message);
        kafkaTemplate.send("topic1", message);
    }
    
    public void sendMessage2(String message) {
    	System.out.println("Producer topic: topic2, message: " + message);
        kafkaTemplate.send("topic2", message);
    }
}