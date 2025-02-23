package kr.co.dmdm.service;

import kr.co.dmdm.dto.Alarm.response.AlarmHeaderResponseDto;
import kr.co.dmdm.repository.dao.AlarmDao;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.service
 * fileName       : NotificationsServiceImpl
 * author         : 황승현
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        황승현       최초 생성
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class AlarmServiceImpl implements AlarmService {

    private final AlarmDao alarmDao;

    @Override
    public void sendNotification() {

    }

    @Override
    public void getNotifications(String receiveUserId) {

    }

    @Override
    public List<AlarmHeaderResponseDto> getAlarmHeaders(String receiveUserId) {
        return alarmDao.getAlarmHeaders(receiveUserId);
    }

    @Override
    public void readAlarms(String receiveUserId, List<Integer> alarmIds) {
        alarmDao.readAlarms(receiveUserId, alarmIds);
    }
}
