package kr.co.dmdm.service.chat;

import kr.co.dmdm.type.FightStatus;

/**
 * packageName    : kr.co.dmdm.service.chat
 * fileName       : ChatRoomService
 * author         : 최기환
 * date           : 2025-02-04
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-04        최기환       최초 생성
 */
public interface ChatRoomSocketService {

    void updateTimers();

    void handleRequest(Long chatRoomId, FightStatus fightStatus);
}
