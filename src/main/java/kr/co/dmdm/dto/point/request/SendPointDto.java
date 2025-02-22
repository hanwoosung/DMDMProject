package kr.co.dmdm.dto.point.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Created on 2025-02-23 by 황승현
 */
@Data
public class SendPointDto {
    @NotNull
    @Size(max = 255)
    private final String receiveUserId;

    private final Integer sendPoint;
}
