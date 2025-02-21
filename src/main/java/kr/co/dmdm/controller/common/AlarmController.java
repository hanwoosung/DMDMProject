package kr.co.dmdm.controller.common;

import kr.co.dmdm.dto.Alarm.response.AlarmHeaderResponseDto;
import kr.co.dmdm.entity.Alarm;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.service.AlarmService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * 패키지명        : kr.co.dmdm.controller.common
 * 파일명          : AlarmController
 * 작성자          : 김상준
 * 일자            : 2025-02-21
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-21        김상준            최초 생성
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/alarm")
@Slf4j
public class AlarmController {

    private final AlarmService alarmService;
    private final JWTUtil jwtUtil;

    @GetMapping
    public List<AlarmHeaderResponseDto> getAlarm(@RequestHeader("access") String token) {

        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            log.error("세션없음 빈값처리");
        }

        return alarmService.getAlarmHeaders(sess);
    }

    @PostMapping("/read")
    public void readAlarm(@RequestHeader("access") String token,
                                                  @RequestBody List<Integer> alarmIds) {

        String sess = "";

        try {
            sess = jwtUtil.getUsername(token);
        } catch (Exception e) {
            log.error("세션없음 빈값처리");
        }

        alarmService.readAlarms(sess, alarmIds);
    }

}
