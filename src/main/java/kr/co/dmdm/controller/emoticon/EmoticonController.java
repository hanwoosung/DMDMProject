package kr.co.dmdm.controller.emoticon;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * packageName    : kr.co.dmdm.controller.emoticon
 * fileName       : EmoticonController
 * author         : 황승현
 * date           : 2025-02-14
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        황승현       최초 생성
 */
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/emoticon")
public class EmoticonController {
    @PostMapping
    public void emoticonRegister() {

    }
}
