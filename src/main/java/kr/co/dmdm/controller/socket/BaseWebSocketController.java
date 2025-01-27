package kr.co.dmdm.controller.socket;

import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.MessageExceptionHandler;

/**
 * packageName    : kr.co.dmdm.controller.socket
 * fileName       : BaseWebSocketController
 * author         : 최기환
 * date           : 2025-01-27
 * description    : 웹 소켓 컨트롤러용 부모 클래스
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-27        최기환       최초 생성
 */
@Slf4j
public class BaseWebSocketController {
    @MessageExceptionHandler
    public void handleException(RuntimeException e) {
        log.info("Exception: {}", e.getMessage());
    }
}
