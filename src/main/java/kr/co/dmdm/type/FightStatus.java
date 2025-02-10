package kr.co.dmdm.type;

import java.util.function.Consumer;

/**
 * packageName    : kr.co.dmdm.type
 * fileName       : FightStatus
 * author         : 최기환
 * date           : 2025-02-04
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-04        최기환       최초 생성
 */
public enum FightStatus {
    START,
    END,
    EXTEND;

    public static FightStatus getFightStatus(String name) {
        try {
            return FightStatus.valueOf(name.toUpperCase());
        } catch (IllegalArgumentException e) {
            return null;
        }
    }

}
