package kr.co.dmdm.entity.board;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

@Getter
@Setter
@Entity
@Table(name = "tbl_board_tag")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class BoardTag {
    @EmbeddedId
    private BoardTagId id;

    @NotNull
    @ColumnDefault("0")
    @Column(name = "order_no", nullable = false)
    private Integer orderNo;

}