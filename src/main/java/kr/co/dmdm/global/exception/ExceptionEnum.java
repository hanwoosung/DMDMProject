package kr.co.dmdm.global.exception;

import lombok.Getter;
import org.springframework.http.HttpStatus;

/**
 * packageName    : kr.co.dmdm.global.exception
 * fileName       : ExceptionEnum
 * author         : 황승현
 * date           : 2025-01-21
 * description    : 공통 예외 상태를 관리하는 열거형
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        황승현       최초 생성
 */
@Getter
public enum ExceptionEnum {

    // 400 BAD_REQUEST
    RUNTIME_EXCEPTION(HttpStatus.BAD_REQUEST, "잘못된 요청입니다."),
    INVALID_PARAMETER(HttpStatus.BAD_REQUEST, "요청 파라미터가 유효하지 않습니다."),
    DUPLICATE_REQUEST(HttpStatus.BAD_REQUEST, "중복된 요청입니다."),
    INVALID_DATA_FORMAT(HttpStatus.BAD_REQUEST, "데이터 형식이 올바르지 않습니다."),
    RESOURCE_NOT_FOUND(HttpStatus.BAD_REQUEST, "요청한 리소스를 찾을 수 없습니다."),
    BAD_WORD(HttpStatus.BAD_REQUEST, "비속어를 사용 하였습니다."),

    // 401 UNAUTHORIZED
    ACCESS_DENIED(HttpStatus.UNAUTHORIZED, "접근이 거부되었습니다."),
    SECURITY(HttpStatus.UNAUTHORIZED, "로그인이 필요합니다."),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "유효하지 않은 토큰입니다."),
    EXPIRED_TOKEN(HttpStatus.UNAUTHORIZED, "토큰이 만료되었습니다."),

    // 403 FORBIDDEN
    FORBIDDEN(HttpStatus.FORBIDDEN, "접근 권한이 없습니다."),
    IP_BLOCKED(HttpStatus.FORBIDDEN, "차단된 IP 주소입니다."),

    // 404 NOT_FOUND
    NOT_FOUND(HttpStatus.NOT_FOUND, "리소스를 찾을 수 없습니다."),
    PAGE_NOT_FOUND(HttpStatus.NOT_FOUND, "페이지를 찾을 수 없습니다."),
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "사용자를 찾을 수 없습니다."),

    // 409 CONFLICT
    DUPLICATE_RESOURCE(HttpStatus.CONFLICT, "중복된 리소스가 존재합니다."),
    VERSION_CONFLICT(HttpStatus.CONFLICT, "버전 충돌이 발생했습니다."),

    // 500 INTERNAL_SERVER_ERROR
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "서버 에러가 발생했습니다."),
    DATABASE_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "데이터베이스 에러가 발생했습니다."),
    UNKNOWN_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "알 수 없는 서버 에러가 발생했습니다."),

    // 503 SERVICE_UNAVAILABLE
    SERVICE_UNAVAILABLE(HttpStatus.SERVICE_UNAVAILABLE, "현재 서비스를 사용할 수 없습니다."),
    SYSTEM_MAINTENANCE(HttpStatus.SERVICE_UNAVAILABLE, "시스템 점검 중입니다.");

    private final HttpStatus status;
    private final String message;

    ExceptionEnum(HttpStatus status, String message) {
        this.status = status;
        this.message = message;
    }
}
