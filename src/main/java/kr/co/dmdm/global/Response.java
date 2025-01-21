package kr.co.dmdm.global;

import lombok.Getter;
import lombok.ToString;
import org.springframework.http.HttpStatus;

import java.time.LocalDateTime;

/**
 * packageName    : kr.co.dmdm.global
 * fileName       : Response
 * author         : 황승현
 * date           : 2025-01-21
 * description    : 공통 응답 객체 클래스
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        황승현       최초 생성
 */
@Getter
@ToString
public class Response<T> {

    private final HttpStatus status;
    private final Result result;
    private final String message;
    private final T data;
    private final LocalDateTime timestamp;

    public Response(HttpStatus status, Result result, String message, T data) {
        this.status = status;
        this.result = result;
        this.message = message;
        this.data = data;
        this.timestamp = LocalDateTime.now();
    }

    /**
     * 성공 응답을 생성합니다.
     *
     * @param data 응답 데이터
     * @param <T> 데이터 타입
     * @return 성공 응답 객체
     */
    public static <T> Response<T> success(T data) {
        return new Response<>(HttpStatus.OK, Result.SUCCESS, "요청 성공", data);
    }

    /**
     * 실패 응답을 생성합니다.
     *
     * @param status HTTP 상태 코드
     * @param message 실패 메시지
     * @return 실패 응답 객체
     */
    public static Response<Void> failure(HttpStatus status, String message) {
        return new Response<>(status, Result.FAILURE, message, null);
    }
}
