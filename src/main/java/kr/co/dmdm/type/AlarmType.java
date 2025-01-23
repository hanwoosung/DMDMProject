package kr.co.dmdm.type;

import lombok.Data;
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
    MESSAGE_SEND("새로운 쪽지가 도착했습니다."),
    EMOTICON_BUY("이모티콘이 판매되었습니다."),
    COMMENT_WRITE("새로운 댓글이 작성되었습니다."),
    FIGHT_SEND("투기 신청이 걸려왔습니다.");

    private final String message;
    AlarmType(String message) {
        this.message = message;
    }
}
