package kr.co.dmdm.service;

/**
 * packageName    : kr.co.dmdm.service
 * fileName       : NotificationsService
 * author         : 황승현
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        황승현       최초 생성
 */
public interface AlarmService {
    void sendNotification();
    void getNotifications(String receiveUserId);
}
