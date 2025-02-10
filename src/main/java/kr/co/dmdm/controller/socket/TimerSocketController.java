package kr.co.dmdm.controller.socket;

import kr.co.dmdm.component.TimerScheduler;
import kr.co.dmdm.dto.ChatMessageResponseDto;
import kr.co.dmdm.dto.TimerRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : kr.co.dmdm.controller.socket
 * fileName       : TimerSocketController
 * author         : 최기환
 * date           : 2025-01-27
 * description    : 채팅방 제한시간 컨트롤러
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-27        최기환       최초 생성
 */
@RestController
@RequiredArgsConstructor
public class TimerSocketController extends BaseWebSocketController {

    private final TimerScheduler timerScheduler;

//    @MessageMapping("/timer.{chatRoomId}/start")
//    public void startTimer(@DestinationVariable Long chatRoomId) {
//        timerScheduler.startTimer(chatRoomId, 3600);
//    }
//
//    @MessageMapping("/timer.{chatRoomId}/stop")
//    public void stopTimer(@DestinationVariable Long chatRoomId) {
//        timerScheduler.stopTimer(chatRoomId);
//    }
//
//    @MessageMapping("/timer.{chatRoomId}/extend")
//    public void extendTimer(@DestinationVariable Long chatRoomId) {
//        timerScheduler.extendTimer(chatRoomId, 1800);
//    }

    @MessageMapping("/example/timer.{chatRoomId}")
    @SendTo("/subscribe/fighter.{chatRoomId}")
    public ChatMessageResponseDto startExampleTimer(@DestinationVariable Long chatRoomId, TimerRequestDto requestDto) {
        return timerScheduler.requestInsert(chatRoomId, requestDto.getUsername(), requestDto.getRequest());
    }
}