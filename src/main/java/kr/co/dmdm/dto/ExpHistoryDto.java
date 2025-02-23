package kr.co.dmdm.dto;

/**
 * 패키지명        : kr.co.dmdm.dto
 * 파일명          : asd
 * 작성자          : 김상준
 * 일자            : 2025-02-23
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-23        김상준            최초 생성
 */

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Data
public class ExpHistoryDto {

    private Integer expHistoryId;

    @Size(max = 100)
    @NotNull
    private String expHistoryType;

    @Size(max = 15)
    @NotNull
    private String userId;

    @NotNull
    private Integer exp;

    @NotNull
    private LocalDateTime insertDt;

    private String remark;

}
