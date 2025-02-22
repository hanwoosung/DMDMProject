package kr.co.dmdm.dto.Alarm.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

/**
 * packageName    : kr.co.dmdm.dto.Alarm.response
 * fileName       : MessageResponseDto
 * author         : 한우성
 * date           : 2025-02-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-21        한우성       최초 생성
 */
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class MessageResponseDto {
    private Integer messageId;
    private String messageContent;
    private String sendUserId;
    private String sendUserName;
    private String receiveUserId;
}