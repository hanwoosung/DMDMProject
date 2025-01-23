package kr.co.dmdm.dto.chat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * packageName    : kr.co.dmdm.dto.chat
 * fileName       : ChatFighterRequestDto
 * author         : 최기환
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        최기환       최초 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageDto {
    String username;
    String role;
    String content;
}
