package kr.co.dmdm.dto.Alarm.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * packageName    : kr.co.dmdm.dto.Alarm.request
 * fileName       : MessageDto
 * author         : 한우성
 * date           : 2025-02-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-21        한우성       최초 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class MessageDto {
    private String sendUserId;
    private String messageContent;
    private String receiveUserId;
}
