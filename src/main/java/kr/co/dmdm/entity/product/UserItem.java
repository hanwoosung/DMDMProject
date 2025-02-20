package kr.co.dmdm.entity.product;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "tbl_user_item")
public class UserItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "item_id", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "item_type", nullable = false, length = 100)
    private String itemType;

    @Size(max = 15)
    @NotNull
    @Column(name = "user_id", nullable = false, length = 15)
    private String userId;

    @NotNull
    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dt", nullable = false)
    private Instant insertDt;

    @PrePersist
    protected void onCreate() {
        insertDt = Instant.now();
    }


}