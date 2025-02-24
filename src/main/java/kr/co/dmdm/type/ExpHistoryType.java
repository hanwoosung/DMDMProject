package kr.co.dmdm.type;

/**
 * packageName    : kr.co.dmdm.type
 * fileName       : ExpHistoryType
 * author         : 김상준
 * date           : 2025-02-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-20        김상준       최초 생성
 */
public enum ExpHistoryType {

    WRITE_BOARD,
    WRITE_COMMENT;

    public static ExpHistoryType fromCode(String code) {
        for (ExpHistoryType type : values()) {
            if (type.name().equalsIgnoreCase(code)) {
                return type;
            }
        }
        throw new IllegalArgumentException("지원되지 않는 경험치 지급 유형입니다: " + code);
    }
}
