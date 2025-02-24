package kr.co.dmdm.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.Instant;
import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "tbl_user_item")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserItem {
    @EmbeddedId
    private UserItemId id;

    @Size(max = 255)
    @NotNull
    @Column(name = "user_id", nullable = false)
    private String userId;

    @NotNull
    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dt", nullable = false)
    private LocalDateTime insertDt;

    @PrePersist
    protected void onCreate() {
        insertDt = LocalDateTime.now();
    }

}