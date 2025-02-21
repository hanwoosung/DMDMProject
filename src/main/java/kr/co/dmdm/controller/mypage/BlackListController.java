package kr.co.dmdm.controller.mypage;

import kr.co.dmdm.dto.mypage.blackList.ResponseBlackListDto;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.service.mypage.blackList.BlackListService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


/**
 * 패키지명        : kr.co.dmdm.controller.mypage
 * 파일명          : BlackListController
 * 작성자          : 김상준
 * 일자            : 2025-02-21
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-21        김상준            최초 생성
 */

@RestController
@RequestMapping("/api/v1/mypage/black-list")
@RequiredArgsConstructor
@Slf4j
public class BlackListController {

    private final BlackListService blackListService;
    private final JWTUtil jwtUtil;

    @GetMapping
    public Map<String, Object> blackList(@RequestHeader("access") String token,
                                         @RequestParam(defaultValue = "1") int page,
                                         @RequestParam(defaultValue = "10") int size) {

        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            throw new CustomException(ExceptionEnum.SECURITY);
        }

        return blackListService.getBlackList(sess, page, size);
    }

    @DeleteMapping
    public Map<String, Object> deleteBlackList(@RequestHeader("access") String token,
                                               @RequestParam(defaultValue = "1") int page,
                                               @RequestParam(defaultValue = "10") int size,
                                               @RequestBody List<ResponseBlackListDto> receivedUserIds) {

        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            throw new CustomException(ExceptionEnum.SECURITY);
        }

        blackListService.deleteBlackList(sess, receivedUserIds);
        return blackListService.getBlackList(sess, page, size);
    }

    @PostMapping("{userId}")
    public void saveBlackList(@PathVariable String userId,
                              @RequestHeader("access") String token) {

        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            throw new CustomException(ExceptionEnum.SECURITY);
        }

        if (sess.equals(userId)) {
            throw new RuntimeException("자신을 블랙리스트에 추가할 수 없습니다.");
        }

        blackListService.saveBlackList(userId, sess);

    }
}
