package kr.co.dmdm.entity.product.detail;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.Hibernate;
import org.hibernate.annotations.ColumnDefault;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class EmoticonDetailId implements Serializable {
    private static final long serialVersionUID = 3278695814643226208L;
    @NotNull
    @Column(name = "product_id", nullable = false)
    private Integer productId;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "order_no", nullable = false)
    private Integer orderNo;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        EmoticonDetailId entity = (EmoticonDetailId) o;
        return Objects.equals(this.orderNo, entity.orderNo) &&
                Objects.equals(this.productId, entity.productId);
    }

    @Override
    public int hashCode() {
        return Objects.hash(orderNo, productId);
    }

}