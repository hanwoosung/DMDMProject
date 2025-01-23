package kr.co.dmdm.kafka;

import kr.co.dmdm.type.AlarmType;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/kafka/test")
public class KafkaController {
    private final KafkaProducer producer;

    @PostMapping("/message")
    public void sendMessage1(@RequestParam String message) {
        producer.sendMessage(AlarmType.MESSAGE_SEND, message);
    }
    @PostMapping("/fight")
    public void sendMessage2(@RequestParam String message) {
        producer.sendMessage(AlarmType.FIGHT_SEND, message);
    }
    @PostMapping("/emoticon")
    public void sendMessage3(@RequestParam String message) {
        producer.sendMessage(AlarmType.EMOTICON_BUY, message);
    }
    @PostMapping("/comment")
    public void sendMessage4(@RequestParam String message) {
        producer.sendMessage(AlarmType.COMMENT_WRITE, message);
    }
}
