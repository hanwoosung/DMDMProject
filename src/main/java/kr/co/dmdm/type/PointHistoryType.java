package kr.co.dmdm.type;

/**
 * packageName    : kr.co.dmdm.type
 * fileName       : PointHistory
 * author         : 황승현
 * date           : 2025-02-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-20        황승현       최초 생성
 */
public enum PointHistoryType {
    BUY_PRODUCT,
    SELL_PRODUCT,
    SEND_POINT,
    RECEIVE_POINT,
    WRITE_BOARD,
    WRITE_COMMENT,
    REGISTER_EMOTICON;

    public static PointHistoryType fromCode(String code) {
        for (PointHistoryType type : values()) {
            if (type.name().equalsIgnoreCase(code)) {
                return type;
            }
        }
        throw new IllegalArgumentException("지원되지 않는 포인트 유형입니다: " + code);
    }
}
