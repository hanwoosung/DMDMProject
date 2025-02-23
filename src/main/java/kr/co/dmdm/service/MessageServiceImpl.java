package kr.co.dmdm.service;

import kr.co.dmdm.dto.Alarm.request.MessageDto;
import kr.co.dmdm.dto.Alarm.response.MessageResponseDto;
import kr.co.dmdm.entity.Message;
import kr.co.dmdm.repository.jpa.MessageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.service
 * fileName       : MessageServiceImpl
 * author         : 한우성
 * date           : 2025-02-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-21        한우성       최초 생성
 */
@RequiredArgsConstructor
@Service
@Slf4j
public class MessageServiceImpl implements MessageService {

    private final MessageRepository messageRepository;
    private final ModelMapper modelMapper;

    @Override
    public String sendMessage(MessageDto messageDto) {

        Message message = new Message();
        message.setSendUserId(messageDto.getSendUserId());
        message.setMessageContent(messageDto.getMessageContent());
        message.setReceiveUserId(messageDto.getReceiveUserId());

        messageRepository.save(message);
        return "";
    }

    @Override
    public MessageResponseDto getMessage(Integer id) {
        messageRepository.readMessage(id);
        return modelMapper.map(messageRepository.findMessageWithSenderName(id), MessageResponseDto.class);
    }

    @Override
    public List<MessageResponseDto> getMessages(String sess) {
        return modelMapper.map(messageRepository.findMessagesByReceiveUserId(sess), List.class);
    }
}
