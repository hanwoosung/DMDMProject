package kr.co.dmdm.dto.fight;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * packageName    : kr.co.dmdm.dto
 * fileName       : ChatUserDto
 * author         : 최기환
 * date           : 2025-01-24
 * description    : 채팅창 참여 유저
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-24        최기환       최초 생성
 */
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatUserDto {
    private String username;
    private String nickname;
}
