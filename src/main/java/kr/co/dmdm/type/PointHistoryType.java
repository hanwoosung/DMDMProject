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
    BUY_PRODUCT(true),
    SELL_PRODUCT(false),
    SEND_POINT(true),
    RECEIVE_POINT(false),
    WRITE_BOARD(false),
    WRITE_COMMENT(false),
    REGISTER_EMOTICON(false);

    private final boolean isReceive;

    PointHistoryType(Boolean isReceive) {
        this.isReceive = isReceive;
    }

    /**
     * 연동되는 유저가 있으면 true
     * EX) (포인트 보내기 -> 빋는사람) = true, (상품 구매 -> 판매자) = true
     * @return isReceive
     */
    public boolean isReceive() {
        return isReceive;
    }

    public static PointHistoryType fromCode(String code) {
        for (PointHistoryType type : values()) {
            if (type.name().equalsIgnoreCase(code)) {
                return type;
            }
        }
        throw new IllegalArgumentException("지원되지 않는 포인트 유형입니다: " + code);
    }
}
