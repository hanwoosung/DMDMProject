package kr.co.dmdm.type;

import lombok.Getter;

import static kr.co.dmdm.type.FightStatus.*;


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
    START_REQUEST(START, false,"토론 시작을 신청하였습니다."),
    START_PROCEED(START, true,"토론이 시작되었습니다."),
    END_REQUEST(END, false,"토론 종료를 신청하였습니다."),
    END_PROCEED(END, true,"토론이 종료되었습니다."),
    EXTEND_REQUEST(EXTEND, false,"토론 연장을 신청하였습니다."),
    EXTEND_PROCEED(EXTEND, true,"토론이 연장되었습니다.(30분)");

    final FightStatus fightStatus;
    final boolean proceed;
    final String message;

    FightNotice(FightStatus fightStatus, boolean proceed, String message) {
        this.fightStatus = fightStatus;
        this.proceed = proceed;
        this.message = message;
    }

    public static FightNotice getFightNotice(FightStatus fightStatus, boolean proceed) {
        for (FightNotice f : FightNotice.values()) {
            if (f.fightStatus.equals(fightStatus) && f.proceed == proceed) {
                return f;
            }
        }
        return null;
    }
}
