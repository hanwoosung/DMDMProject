package kr.co.dmdm.dto.Alarm.request;

import kr.co.dmdm.type.AlarmType;
import lombok.Data;

/**
 * packageName    : kr.co.dmdm.dto.Alarm
 * fileName       : Alarm
 * author         : 황승현
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        황승현       최초 생성
 */
@Data
public class AlarmRequestDto {
    private AlarmType alarmType;
    private Integer targetId;
    private String sendUserId;
    private String receiveUserId;
}
