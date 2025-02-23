package kr.co.dmdm.repository.dao;

import kr.co.dmdm.dto.Alarm.response.AlarmHeaderResponseDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

/**
 * 패키지명        : kr.co.dmdm.repository.dao
 * 파일명          : AlarmDao
 * 작성자          : 김상준
 * 일자            : 2025-02-21
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-21        김상준            최초 생성
 */

@Mapper
public interface AlarmDao {

    List<AlarmHeaderResponseDto> getAlarmHeaders(String receiveUserId);

    void readAlarms(String receiveUserId, List<Integer> alarmIds);

}
