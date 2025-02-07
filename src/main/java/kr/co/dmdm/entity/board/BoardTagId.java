package kr.co.dmdm.entity.board;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.Hibernate;

import java.io.Serializable;
import java.util.Objects;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Embeddable
public class BoardTagId implements Serializable {
    private static final long serialVersionUID = -321164041106773020L;
    @NotNull
    @Column(name = "board_id", nullable = false)
    private Integer boardId;

    @Size(max = 10)
    @NotNull
    @Column(name = "tag", nullable = false, length = 10)
    private String tag;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || Hibernate.getClass(this) != Hibernate.getClass(o)) return false;
        BoardTagId entity = (BoardTagId) o;
        return Objects.equals(this.boardId, entity.boardId) &&
                Objects.equals(this.tag, entity.tag);
    }

    @Override
    public int hashCode() {
        return Objects.hash(boardId, tag);
    }

}