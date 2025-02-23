package kr.co.dmdm.controller;

import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : kr.co.dmdm.controller
 * fileName       : ErrorTestController
 * author         : 황승현
 * date           : 2025-02-18
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-18        황승현       최초 생성
 */
@RestController
@RequestMapping("/api/error/test")
public class ErrorTestController {
    @PostMapping("/1")
    public void errorTest1() {
        throw new CustomException(ExceptionEnum.RUNTIME_EXCEPTION);
    }

    @PostMapping("/2")
    public void errorTest2() {
        throw new CustomException(ExceptionEnum.SECURITY);
    }
}
