package kr.co.dmdm.global;

import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;

/**
 * packageName    : kr.co.dmdm.global
 * fileName       : ValidationAspect
 * author         : 한우성
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        한우성       최초 생성
 */
@Aspect
@Component
public class ValidationAspect {

    @Before("execution(* kr.co.dmdm..*Controller.*(..)) && args(.., bindingResult)")
    public void validateRequest(JoinPoint joinPoint, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            String errorMessage = bindingResult.getFieldError().getDefaultMessage();
            throw new CustomException(ExceptionEnum.INVALID_PARAMETER.getStatus(), errorMessage);
        }
    }
}