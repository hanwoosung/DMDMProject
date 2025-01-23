/*
package kr.co.dmdm.kafka;

import kr.co.dmdm.type.Alarm;
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
        producer.sendMessage(Alarm.MESSAGE_SEND, message);
    }
    @PostMapping("/fight")
    public void sendMessage2(@RequestParam String message) {
        producer.sendMessage(Alarm.FIGHT_SEND, message);
    }
    @PostMapping("/emoticon")
    public void sendMessage3(@RequestParam String message) {
        producer.sendMessage(Alarm.EMOTICON_BUY, message);
    }
    @PostMapping("/comment")
    public void sendMessage4(@RequestParam String message) {
        producer.sendMessage(Alarm.COMMENT_WRITE, message);
    }
}
*/
