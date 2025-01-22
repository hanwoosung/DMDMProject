//package kr.co.dmdm.kafka;
//
//import lombok.RequiredArgsConstructor;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//@RequiredArgsConstructor
//public class KafkaController {
//    private final KafkaProducer producer;
//
//    @PostMapping("/kafka1")
//    public void sendMessage1(@RequestParam String message) {
//        producer.sendMessage1(message);
//    }
//
//    @PostMapping("/kafka2")
//    public void sendMessage2(@RequestBody String message) {
//        producer.sendMessage2(message);
//    }
//}