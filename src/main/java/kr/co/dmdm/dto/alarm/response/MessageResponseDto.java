package kr.co.dmdm.dto.Alarm.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.Instant;
import java.time.LocalDateTime;

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

    public MessageResponseDto(Integer messageId,
                              String messageContent,
                              String sendUserId,
                              String sendUserName,
                              String receiveUserId
    ) {
        this(messageId, messageContent, sendUserId, sendUserName, receiveUserId, Instant.now(), "");
    }

    private Integer messageId;
    private String messageContent;
    private String sendUserId;
    private String sendUserName;
    private String receiveUserId;
    private Instant insertDt;
    private String filePath;

}