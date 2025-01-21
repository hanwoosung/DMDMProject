package kr.co.dmdm.dto.common;


import lombok.Data;

import java.time.LocalDate;

/**
 * 12-27 (작성자: 한우성)
 * 이 클래스는 공통으로 사용가능한 파일Dto 입니다.
 */
@Data
public class FileDto {

    // 파일번호
    private Integer fileNo;
    // 파일구분(EX) question_no)
    private String fileType;
    // 파일 영향받는 아이디(EX) 1)
    private String fileRefNo;
    // 파일 관리명(저장하는 파일명 시간으로 들어감 밀리세컨드까지)
    private String fileOldName;
    // 파일명(불러올 파일명)
    private String fileNewName;
    // 파일 확장자
    private String fileExt;
    // 크기 MB
    private Long fileSize;
    // 파일 위치
    private String filePath;
    // 유저 아이디
    private String userId;
    // 작성일시
    private LocalDate insertDt;
}