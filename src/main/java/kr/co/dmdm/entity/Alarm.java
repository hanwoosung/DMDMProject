package kr.co.dmdm.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Entity
@Table(name = "tbl_alarm")
@Getter
@Setter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Alarm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "alarm_id", nullable = false)
    private Integer id;

    @Column(name = "alarm_type", length = 100)
    private String alarmType;

    @Column(name = "target_id")
    private Integer targetId;

    @Column(name = "send_user_id", nullable = false, length = 15)
    private String sendUserId;

    @Column(name = "receive_user_id", nullable = false, length = 15)
    private String receiveUserId;

    @Lob
    @Column(name = "alarm_content", nullable = false)
    private String alarmContent;

    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dt", nullable = false)
    private LocalDateTime insertDt;

    @Column(name = "read_dt")
    private LocalDateTime readDt;

    @ColumnDefault("'ACTIVE'")
    @Column(name = "status", nullable = false, length = 100)
    private String status;

    @PrePersist
    protected void onCreate() {
        if (insertDt == null) {
            insertDt = LocalDateTime.now();
        }
        if (status == null || status.isEmpty()) {
            status = "ACTIVE";
        }
        if (alarmContent == null) {
            alarmContent = "";
        }
    }
}