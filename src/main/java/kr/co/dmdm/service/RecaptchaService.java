package kr.co.dmdm.service;


import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

/**
 * packageName    : kr.co.dmdm.service
 * fileName       : RecaptchaService
 * author         : 한우성
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        한우성       최초 생성
 */
@Service
public class RecaptchaService {
    @Value("${recaptcha.url}")
    private String recaptchaUrl;
    @Value("${recaptcha.secret.key}")
    private String secretKey;

    public boolean verifyCaptcha(String captchaToken) {

        String body = String.format("secret=%s&response=%s", secretKey, captchaToken);
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded");

        HttpEntity<String> entity = new HttpEntity<>(body, headers);

        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<String> response = restTemplate.exchange(recaptchaUrl, HttpMethod.POST, entity, String.class);
        String responseBody = response.getBody();
        System.out.println("Response from reCAPTCHA: " + responseBody);

        if (response.getStatusCode().is2xxSuccessful()) {
            return responseBody != null && responseBody.contains("\"success\": true");
        } else {
            System.out.println("Error: " + response.getStatusCode());
            return false;
        }
    }
}
