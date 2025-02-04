package kr.co.dmdm.type;

import lombok.Getter;

/**
 * packageName    : kr.co.dmdm.type
 * fileName       : NoticeMessage
 * author         : 최기환
 * date           : 2025-02-04
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-04        최기환       최초 생성
 */
@Getter
public enum FightNotice {
    START_REQUEST("토론 시작을 신청하였습니다."),
    END_REQUEST("토론 종료를 신청하였습니다."),
    EXTEND_REQUEST("토론 연장을 신청하였습니다."),
    START_PROCEED("토론이 시작되었습니다."),
    END_PROCEED("토론이 종료되었습니다."),
    EXTEND_PROCEED("토론이 연장되었습니다.(30분)");

    final String message;

    FightNotice(String message) {
        this.message = message;
    }

    public String getUserName(String username){
        return username + " 님이 " + message;
    }
}
