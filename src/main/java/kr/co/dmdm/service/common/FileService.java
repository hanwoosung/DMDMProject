package kr.co.dmdm.service.common;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

/**
 * 12-27 (작성자: 한우성)
 * 공통으로 사용가능한 파일서비스 입니다
 * 저장에 실패 시 파일을 삭제함.
 */
public interface FileService {

     void saveFile(MultipartFile file,
                         String fileType,
                         String fileRefId,
                         String userId) throws IOException;

    void deleteFileById(Integer fileId);

}