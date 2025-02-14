package kr.co.dmdm.type;

import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;

/**
 * packageName    : kr.co.dmdm.type
 * fileName       : ProductType
 * author         : 황승현
 * date           : 2025-02-14
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        황승현       최초 생성
 */
public enum ProductType {
    EMOTICON;

    public static ProductType fromString(String name) {
        for (ProductType type : ProductType.values()) {
            if (type.name().equalsIgnoreCase(name)) {
                return type;
            }
        }
        throw new CustomException(ExceptionEnum.RUNTIME_EXCEPTION);
    }

    public static ProductType valueOfIgnoreCase(String name) {
        return fromString(name);
    }
}
