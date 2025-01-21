package kr.co.dmdm.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * packageName    : kr.co.dmdm.global.exception
 * fileName       : CustomException
 * author         : 황승현
 * date           : 2025-01-21
 * description    : 사용자 정의 예외 클래스
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        황승현       최초 생성
 */
@Getter
public class CustomException extends RuntimeException {
    private final HttpStatus status;

    /**
     * ExceptionEnum을 기반으로 예외 생성
     *
     * @param exception 예외 정보를 담고 있는 Enum
     */
    public CustomException(ExceptionEnum exception) {
        super(exception.getMessage());
        this.status = exception.getStatus();
    }

    /**
     * 상태 코드와 메시지를 기반으로 예외 생성
     *
     * @param status HTTP 상태 코드
     * @param message 예외 메시지
     */
    public CustomException(HttpStatus status, String message) {
        super(message);
        this.status = status;
    }
}
