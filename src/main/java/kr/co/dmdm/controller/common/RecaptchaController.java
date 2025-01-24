package kr.co.dmdm.controller.common;

import kr.co.dmdm.dto.common.CaptchaDto;
import kr.co.dmdm.service.RecaptchaService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : kr.co.dmdm.controller.common
 * fileName       : RecaptchaController
 * author         : 한우성
 * date           : 2025-01-23
 * description    : reCAPTCHA 검증을 위한 컨트롤러
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        한우성       최초 생성
 */
@RestController
@RequestMapping("/api/v1/recaptcha")
public class RecaptchaController {

    private final RecaptchaService recaptchaService;

    public RecaptchaController(RecaptchaService recaptchaService) {
        this.recaptchaService = recaptchaService;
    }

    @PostMapping("/verify")
    public boolean verifyCaptcha(@RequestBody CaptchaDto requestData) {
        return recaptchaService.verifyCaptcha(requestData.getCaptchaToken());
    }
}
