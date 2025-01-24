package kr.co.dmdm.global;

import com.fasterxml.jackson.databind.ObjectMapper;
import kr.co.dmdm.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.server.ServerHttpRequest;
import org.springframework.http.server.ServerHttpResponse;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.servlet.mvc.method.annotation.ResponseBodyAdvice;

/**
 * packageName    : kr.co.dmdm.global
 * fileName       : GlobalResponseHandler
 * author         : 황승현
 * date           : 2025-01-21
 * description    : 공통 응답 처리기
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        황승현       최초 생성
 */
@RestControllerAdvice
@RequiredArgsConstructor
public class GlobalResponseHandler implements ResponseBodyAdvice<Object> {

    private final ObjectMapper objectMapper;

    @ExceptionHandler(CustomException.class)
    public Response<Void> handleCustomException(CustomException ex) {
        return Response.failure(ex.getStatus(), ex.getMessage());
    }

    @ExceptionHandler(Exception.class)
    public Response<Void> handleGeneralException(Exception ex) {
        return Response.failure(HttpStatus.INTERNAL_SERVER_ERROR, ex.getMessage());
    }

    @Override
    public boolean supports(MethodParameter returnType, Class converterType) {
        return true;
    }

    @Override
    public Object beforeBodyWrite(Object body,
                                  MethodParameter returnType,
                                  MediaType selectedContentType,
                                  Class selectedConverterType,
                                  ServerHttpRequest request,
                                  ServerHttpResponse response) {
//        System.out.println("selectedContentType : " + selectedContentType);
//        System.out.println("body : " + body);

        if (body instanceof Response) {
            return body;
        }

        if (body instanceof String) {
            try {
                response.getHeaders().setContentType(MediaType.APPLICATION_JSON);
                return objectMapper.writeValueAsString(Response.success(body));
            } catch (Exception e) {
                throw new RuntimeException("Error serializing String response", e);
            }
        }

        return Response.success(body);
    }
}
