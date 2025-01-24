package kr.co.dmdm.entity.board;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;
import java.time.Instant;

@Getter
@Setter
@Entity
@Table(name = "tbl_board")
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Board {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "board_id")
    private Integer boardId;

    @Size(max = 100)
    @Column(name = "board_type", length = 100)
    private String boardType;

    @Size(max = 100)
    @NotNull
    @Column(name = "board_title", nullable = false, length = 100)
    private String boardTitle;

    @NotNull
    @Lob
    @Column(name = "board_content", nullable = false)
    private String boardContent;

    @Size(max = 15)
    @NotNull
    @Column(name = "user_id", nullable = false, length = 15)
    private String userId;

    @NotNull
    @ColumnDefault("current_timestamp()")
    @Column(name = "insert_dt", nullable = false)
    private Instant insertDt;

    @NotNull
    @ColumnDefault("current_timestamp()")
    @Column(name = "update_dt", nullable = false)
    private Instant updateDt;

    @Size(max = 100)
    @NotNull
    @ColumnDefault("'ACTIVE'")
    @Column(name = "status", nullable = false, length = 100)
    private String status;

    @PrePersist
    public void prePersist() {
        if (this.boardType == null) {
            throw new IllegalArgumentException("boardType은 null일 수 없습니다."); // ID 필수
        }
        if (this.insertDt == null) {
            this.insertDt = Instant.now(); // 현재 시간
        }
        if (this.updateDt == null) {
            this.updateDt = Instant.now(); // 현재 시간
        }
        if (this.status == null) {
            this.status = "ACTIVE"; // 활성 상태
        }
        if (this.userId == null) {
            throw new IllegalArgumentException("User ID는 null일 수 없습니다."); // ID 필수
        }
        if (this.boardTitle == null || this.boardContent == null) {
            throw new IllegalArgumentException("게시글 제목과 내용은 null일 수 없습니다.");
        }
    }
}

