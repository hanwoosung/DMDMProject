package kr.co.dmdm.dto.mypage.blackList;

import lombok.Data;

import java.time.LocalDateTime;

/**
 * 패키지명        : kr.co.dmdm.dto.mypage.blackList
 * 파일명          : RequestBlackListDto
 * 작성자          : 김상준
 * 일자            : 2025-02-21
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-02-21        김상준            최초 생성
 */

@Data
public class ResponseBlackListDto {

    private String sendUserId;
    private String receiveUserId;
    private String userName;
    private String insertDt;

}
