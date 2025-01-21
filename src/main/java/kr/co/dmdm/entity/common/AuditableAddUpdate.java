package kr.co.dmdm.entity.common;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

/**
 * packageName    : kr.co.dmdm.entity.common
 * fileName       : AuditableAddUpadte
 * author         : 한우성
 * date           : 2025-01-21
 * description    : 업데이트 컬럼이 필요하면 상속해서 사용하면 됨
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        한우성       최초 생성
 */
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
public class AuditableAddUpdate {

    @CreatedDate
    @Column(name = "insert_dt", nullable = false)
    private Instant insertDt;

    @LastModifiedDate
    @Column(name = "update_dt", nullable = false)
    private Instant updateDt;
}
