package kr.co.dmdm.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "tbl_exp_history")
public class ExpHistory {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "exp_history_id", nullable = false)
    private Integer id;

    @Size(max = 100)
    @NotNull
    @Column(name = "exp_history_type", nullable = false, length = 100)
    private String expHistoryType;

    @Size(max = 15)
    @NotNull
    @Column(name = "user_id", nullable = false, length = 15)
    private String userId;

    @NotNull
    @Column(name = "exp", nullable = false)
    private Integer exp;

    @NotNull
    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dt", nullable = false)
    private LocalDateTime insertDt;

    @Lob
    @Column(name = "remark")
    private String remark;


}