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
@Table(name = "tbl_message")
public class Message {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "message_id", nullable = false)
    private Integer id;

    @Size(max = 255)
    @NotNull
    @Column(name = "send_user_id", nullable = false, length = 15)
    private String sendUserId;

    @NotNull
    @Lob
    @Column(name = "message_content", nullable = false)
    private String messageContent;

    @Size(max = 255)
    @NotNull
    @Column(name = "receive_user_id", nullable = false, length = 15)
    private String receiveUserId;

    @NotNull
    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dt", nullable = false)
    private Instant insertDt;

    @Column(name = "read_dt")
    private Instant readDt;

    @Size(max = 100)
    @NotNull
    @ColumnDefault("'ACTIVE'")
    @Column(name = "status", nullable = false, length = 100)
    private String status;

    @PrePersist
    public void prePersist() {
        if (insertDt == null) {
            insertDt = Instant.now();
        }
        if (status == null) {
            status = "ACTIVE";
        }
    }
}