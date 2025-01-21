package kr.co.dmdm.entity.common;

import jakarta.persistence.Column;
import jakarta.persistence.EntityListeners;
import jakarta.persistence.MappedSuperclass;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.Instant;

/**
 * packageName    : kr.co.dmdm.entity.common
 * fileName       : Auditable
 * author         : 한우성
 * date           : 2025-01-21
 * description    : 업데이트 컬럼이 필요 없는 경우 상속 받아서 사용
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        한우성       최초 생성
 */
@EntityListeners(AuditingEntityListener.class)
@MappedSuperclass
@Getter
public class Auditable {

    @CreatedDate
    @Column(name = "insert_dt", nullable = false)
    private Instant insertDt;

}
