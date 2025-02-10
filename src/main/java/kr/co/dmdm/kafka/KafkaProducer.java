//package kr.co.dmdm.kafka;
//
//import kr.co.dmdm.dto.Alarm.request.AlarmRequestDto;
//import kr.co.dmdm.type.AlarmType;
//import lombok.RequiredArgsConstructor;
//import org.springframework.beans.factory.annotation.Value;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.stereotype.Service;
//
//@Service
//@RequiredArgsConstructor
//public class KafkaProducer {
//    private final KafkaTemplate<String, AlarmRequestDto> kafkaTemplate;
//
//    @Value("${kafka.topic.comment-write}")
//    private String commentWriteTopic;
//
//    @Value("${kafka.topic.emoticon-buy}")
//    private String emoticonBuyTopic;
//
//    @Value("${kafka.topic.message-send}")
//    private String messageSendTopic;
//
//    @Value("${kafka.topic.fight-send}")
//    private String fightSendTopic;
//
//    public void sendMessage(AlarmRequestDto alarmDto) {
//        String topic = getTopicByAlarmType(alarmDto.getAlarmType());
////        System.out.println("producer alarmDto : " + alarmDto);
//        kafkaTemplate.send(topic, alarmDto);
//    }
//
//    private String getTopicByAlarmType(AlarmType alarmType) {
//        return switch (alarmType) {
//            case COMMENT_WRITE -> commentWriteTopic;
//            case EMOTICON_BUY -> emoticonBuyTopic;
//            case MESSAGE_SEND -> messageSendTopic;
//            case FIGHT_SEND -> fightSendTopic;
//        };
//    }
//}
