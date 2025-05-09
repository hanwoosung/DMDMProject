package kr.co.dmdm.entity;

import jakarta.persistence.*;
import kr.co.dmdm.entity.common.AuditableAddUpdate;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDate;

@Getter
@Setter
@Entity
@Table(name = "tbl_user")
public class User extends AuditableAddUpdate {
    @Id
    @Column(name = "user_id", nullable = false, length = 255)
    private String userId;

    @Column(name = "user_pw", nullable = false)
    private String userPw;

    @Column(name = "user_name", nullable = false, length = 20)
    private String userName;

    @Column(name = "user_birth", nullable = false)
    private LocalDate userBirth;

    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @ColumnDefault("'N'")
    @Column(name = "user_email_push_yn", nullable = false)
    private Character userEmailPushYn;

    @ColumnDefault("'ROLE_MEMBER'")
    @Column(name = "user_role", nullable = false, length = 100)
    private String userRole;

    @ColumnDefault("'NORMAL'")
    @Column(name = "user_join_type", nullable = false, length = 100)
    private String userJoinType;

    @Column(name = "user_badge", length = 100)
    private String userBadge;

    @ColumnDefault("100")
    @Column(name = "user_point", nullable = false)
    private Integer userPoint;

    @ColumnDefault("0")
    @Column(name = "user_level", nullable = false)
    private Integer userLevel;

    @ColumnDefault("0")
    @Column(name = "user_exp", nullable = false)
    private Integer userExp;

    @ColumnDefault("'ACTIVE'")
    @Column(name = "status", nullable = false, length = 100)
    private String status;

    @ColumnDefault("0")
    @Column(name = "gold_medal")
    private Integer goldMedal;

    @ColumnDefault("0")
    @Column(name = "silver_medal")
    private Integer silverMedal;

    @ColumnDefault("0")
    @Column(name = "bronze_medal")
    private Integer bronzeMedal;

    @PrePersist
    public void prePersist() {
        if (this.userExp == null) {
            this.userExp = 0;
        }
        if (this.userLevel == null) {
            this.userLevel = 0;
        }
        if (this.userPoint == null) {
            this.userPoint = 100;
        }
        if (this.status == null) {
            this.status = "ACTIVE";
        }
        if (this.userRole == null) {
            this.userRole = "ROLE_MEMBER";
        }
        if (this.userJoinType == null) {
            this.userJoinType = "NORMAL";
        }
        if (this.userEmailPushYn == null) {
            this.userEmailPushYn = 'N';
        }
    }
}