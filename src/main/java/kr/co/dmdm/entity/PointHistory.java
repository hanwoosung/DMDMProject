package kr.co.dmdm.entity;

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
@Table(name = "tbl_point_history")
public class PointHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "point_history_id", nullable = false)
    private Integer id;

    @NotNull
    @Size(max = 100)
    @Column(name = "point_history_type", nullable = false, length = 100)
    private String pointHistoryType;

    @NotNull
    @Size(max = 15)
    @Column(name = "user_id", nullable = false, length = 15)
    private String userId;

    @NotNull
    @Column(name = "point", nullable = false)
    private Integer point;

    @NotNull
    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dt", nullable = false, updatable = false)
    private Instant insertDt;

    @Lob
    @Column(name = "remark")
    private String remark;

    @PrePersist
    protected void onCreate() {
        insertDt = Instant.now();
    }
}