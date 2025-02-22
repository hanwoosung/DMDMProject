package kr.co.dmdm.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@Embeddable
public class UserItemId implements Serializable {
    private static final long serialVersionUID = 533634872836237339L;
    @NotNull
    @Column(name = "item_id", nullable = false)
    private Integer itemId;

    @Size(max = 100)
    @NotNull
    @Column(name = "item_type", nullable = false, length = 100)
    private String itemType;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        UserItemId entity = (UserItemId) o;
        return Objects.equals(this.itemId, entity.itemId) &&
                Objects.equals(this.itemType, entity.itemType);
    }

    @Override
    public int hashCode() {
        return Objects.hash(itemId, itemType);
    }

}