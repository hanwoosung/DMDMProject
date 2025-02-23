package kr.co.dmdm.controller.point;

import kr.co.dmdm.dto.point.request.PointHistoryRequestDto;
import kr.co.dmdm.dto.point.request.SendPointDto;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.service.point.PointService;
import kr.co.dmdm.type.PointHistoryType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

/**
 * Created on 2025-02-23 by 황승현
 */
@RestController
@RequestMapping("/api/v1/send-point")
@RequiredArgsConstructor
@Slf4j
public class SendPointController {
    private final JWTUtil jwtUtil;
    private final PointService pointService;

    @PostMapping
    public void sendPoint(@RequestHeader String access, @RequestBody SendPointDto sendPointDto) {
        String userId = jwtUtil.getUsername(access);

        PointHistoryRequestDto pointHistoryRequestDto = new PointHistoryRequestDto();
        pointHistoryRequestDto.setUserId(userId);
        pointHistoryRequestDto.setRemark(sendPointDto.getReceiveUserId());
        pointHistoryRequestDto.setPoint(sendPointDto.getSendPoint() * -1);
        pointHistoryRequestDto.setPointHistoryType(PointHistoryType.SEND_POINT);

        pointService.savePoint(pointHistoryRequestDto);
    }

}
