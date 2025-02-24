package kr.co.dmdm.service;

import kr.co.dmdm.dto.Alarm.request.MessageDto;
import kr.co.dmdm.dto.Alarm.response.MessageResponseDto;
import kr.co.dmdm.entity.Message;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.service
 * fileName       : MessageService
 * author         : 한우성
 * date           : 2025-02-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-21        한우성       최초 생성
 */
public interface MessageService {
    String sendMessage(MessageDto message);
    MessageResponseDto getMessage(Integer id);
    List<MessageResponseDto> getMessages(String sess);
}
