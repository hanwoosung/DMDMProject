package kr.co.dmdm.repository.jpa;

import kr.co.dmdm.dto.Alarm.response.MessageResponseDto;
import kr.co.dmdm.entity.Message;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.repository.jpa
 * fileName       : MesageRepository
 * author         : 한우성
 * date           : 2025-02-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-21        한우성       최초 생성
 */
public interface MessageRepository extends JpaRepository<Message, Integer> {
    @Query("SELECT new kr.co.dmdm.dto.Alarm.response.MessageResponseDto(m.id, m.messageContent, " +
            "m.sendUserId, u.userName, m.receiveUserId) " +
            "FROM Message m JOIN User u ON m.sendUserId = u.userId " +
            "WHERE m.id = :id")
    MessageResponseDto findMessageWithSenderName(@Param("id") int id);

    @Query("SELECT new kr.co.dmdm.dto.Alarm.response.MessageResponseDto(m.id, m.messageContent, " +
            "m.sendUserId, u.userName, m.receiveUserId, m.insertDt, f.filePath) " +
            "FROM Message m JOIN User u ON m.sendUserId = u.userId LEFT JOIN File f ON u.userId = f.fileRefNo AND f.fileType = 'PROFILE'" +
            "WHERE m.receiveUserId = :userId AND m.readDt IS NULL AND m.status = 'ACTIVE'")
    List<MessageResponseDto> findMessagesByReceiveUserId(String userId);
}
