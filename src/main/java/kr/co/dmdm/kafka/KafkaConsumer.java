package kr.co.dmdm.kafka;

import kr.co.dmdm.dto.Alarm.request.AlarmRequestDto;
import kr.co.dmdm.entity.Alarm;
import kr.co.dmdm.repository.jpa.AlarmRepository;
import kr.co.dmdm.sse.SseServiceImpl;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaConsumer {
//    private final ModelMapper modelMapper;
//    private final AlarmRepository alarmRepository;
//    private final SseServiceImpl sseServiceImpl;
//
//    @KafkaListener(topics = {"${kafka.topic.comment-write}", "${kafka.topic.emoticon-buy}", "${kafka.topic.message-send}", "${kafka.topic.fight-send}"}, groupId = "notifications")
//    public void consumeAlarms(AlarmRequestDto alarmDto) {
//
//        Alarm alarm = modelMapper.map(alarmDto, Alarm.class);
//        alarm.setId(null);
//        alarmRepository.save(alarm);
//
//        sseServiceImpl.sendAlarmToUser(alarmDto.getReceiveUserId(), alarmDto.getAlarmType());
//    }
}
