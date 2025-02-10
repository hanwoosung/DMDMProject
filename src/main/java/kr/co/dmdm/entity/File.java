package kr.co.dmdm.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.Instant;

/**
 * packageName    : kr.co.dmdm.entity.common
 * fileName       : File
 * author         : 한우성
 * date           : 2025-01-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        한우성       최초 생성
 */
@Entity
@Table(name = "tbl_file")
@Getter
@ToString
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class File {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "file_no")
    private int fileNo; // 파일번호

    @Column(name = "file_type", length = 50)
    private String fileType; // 파일구분

    @Column(name = "file_ref_no", length = 100)
    private String fileRefNo; // 파일 영향받는 아이디

    @Column(name = "file_old_name", length = 255)
    private String fileOldName; // 원본 파일명

    @Column(name = "file_new_name", length = 255)
    private String fileNewName; // 변경된 파일명

    @Column(name = "file_ext", length = 50)
    private String fileExt; // 파일 확장자

    @Column(name = "file_size")
    private Long fileSize; // 파일 크기 (단위: MB)

    @Column(name = "user_id", length = 15)
    private String userId;

    @Column(name = "file_path", length = 255)
    private String filePath;

    @NotNull
    @Column(name = "insert_dt", nullable = false, updatable = false)
    private Instant insertDt; // 파일 생성일

    @PrePersist
    protected void onCreate() {
        if (this.insertDt == null) {
            this.insertDt = Instant.now();
        }
    }

    @PreUpdate
    protected void onUpdate() {
        if (this.insertDt == null) {
            this.insertDt = Instant.now();
        }
    }

}
