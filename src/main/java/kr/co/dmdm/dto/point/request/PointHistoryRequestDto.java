package kr.co.dmdm.dto.point.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import kr.co.dmdm.type.PointHistoryType;
import lombok.Getter;
import lombok.Setter;

/**
 * packageName    : kr.co.dmdm.dto.point.request
 * fileName       : PointHistoryRequestDto
 * author         : 황승현
 * date           : 2025-02-20
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-20        황승현       최초 생성
 */
@Getter
@Setter
public class PointHistoryRequestDto {

    @NotNull
    @Size(max = 100)
    private PointHistoryType pointHistoryType;

    @NotNull
    @Size(max = 15)
    private String userId;

    @Size(max = 15)
    private String receiveUserId;

    @NotNull
    private Integer point;

    private String remark;
}
