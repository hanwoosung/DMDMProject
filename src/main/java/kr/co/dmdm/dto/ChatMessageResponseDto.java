package kr.co.dmdm.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * packageName    : kr.co.dmdm.dto.chat
 * fileName       : ChatMessageResponseDto
 * author         : 최기환
 * date           : 2025-01-22
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-22        최기환       최초 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatMessageResponseDto {
    String username;
    String content;
}
