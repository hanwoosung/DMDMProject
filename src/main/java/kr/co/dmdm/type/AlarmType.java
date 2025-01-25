package kr.co.dmdm.type;

import lombok.Getter;

/**
 * packageName    : kr.co.dmdm.type
 * fileName       : Alarm
 * author         : 황승현
 * date           : 2025-01-22
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-22        황승현       최초 생성
 */
@Getter
public enum AlarmType {
    MESSAGE_SEND("새로운 쪽지가 도착했습니다.", AlarmCode.MESSAGE),
    EMOTICON_BUY("이모티콘이 판매되었습니다.", AlarmCode.NOTIFICATIONS),
    COMMENT_WRITE("새로운 댓글이 작성되었습니다.", AlarmCode.NOTIFICATIONS),
    FIGHT_SEND("투기 신청이 걸려왔습니다.", AlarmCode.NOTIFICATIONS);

    private final String message;
    private final AlarmCode alarmCode;
    AlarmType(String message, AlarmCode alarmCode) {
        this.message = message;
        this.alarmCode = alarmCode;
    }
}
