package kr.co.dmdm.entity;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.Objects;

/**
 * 12-27 (작성자: 안제연)
 * 이 클래스는 구분 Entity 복합키 관련입니다.
 */
@Embeddable
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GubnCompositeKey implements Serializable {
    private String parentCode;
    private String code;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        GubnCompositeKey that = (GubnCompositeKey) o;
        return Objects.equals(parentCode, that.parentCode) && Objects.equals(code, that.code);
    }

    @Override
    public int hashCode() {
        return Objects.hash(parentCode, code);
    }
}
