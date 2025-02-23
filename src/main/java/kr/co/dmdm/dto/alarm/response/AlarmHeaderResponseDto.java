package kr.co.dmdm.dto.alarm.response;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 패키지명        : kr.co.dmdm.dto.Alarm.response
 * 파일명          : AlarmHeaderResponseDto
 * 작성자          : 김상준
 * 일자            : 2025-02-21
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-21        김상준            최초 생성
 */

@Data
public class AlarmHeaderResponseDto {

    private Long alarmId;        // 알람 ID
    private String userName;      // 보낸 사용자 이름
    private String alarmType;     // 알람 타입
    private Long targetId;        // 알람 대상 ID
    private String sendUserId;    // 보낸 사용자 ID
    private String receiveUserId; // 받은 사용자 ID
    private String alarmContent;  // 알람 내용
    private String insertDt; // 생성 날짜
    private String readDt;   // 읽은 날짜 (읽지 않은 경우 NULL)
    private String status;       // 알람 상태 ('ACTIVE' 등)
    private String filePath;

}
