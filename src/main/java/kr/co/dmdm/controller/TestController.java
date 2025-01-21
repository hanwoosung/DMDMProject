package kr.co.dmdm.controller;

import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : kr.co.dmdm.controller
 * fileName       : TestController
 * author         : 황승현
 * date           : 2025-01-21
 * description    : 테스트 컨트롤러
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        황승현       최초 생성
 */
@RestController
@RequestMapping("/api/test")
public class TestController {

    @GetMapping
    public String  test() {
        return "test";
    }

    @GetMapping("/error")
    public String errorTest() {
        throw new CustomException(ExceptionEnum.RUNTIME_EXCEPTION);
    }

    @GetMapping("/error2")
    public String errorTest2() {
        throw new CustomException(HttpStatus.BAD_REQUEST, "잘못된 요청입니다22222222.");
    }

    @GetMapping("/error3")
    public String errorTest3() {
        throw new RuntimeException("런타임 에러");
    }
}
