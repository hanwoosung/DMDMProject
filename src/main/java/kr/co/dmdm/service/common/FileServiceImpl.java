package kr.co.dmdm.service.common;

import jakarta.transaction.Transactional;
import kr.co.dmdm.dto.common.FileDto;
import kr.co.dmdm.entity.File;
import kr.co.dmdm.repository.jpa.common.FileRepository;
import kr.co.dmdm.utils.FileUploadUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

/**
 * packageName    : kr.co.dmdm.service.common
 * fileName       : FileServiceImpl
 * author         : 한우성
 * date           : 2025-01-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        한우성       최초 생성
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class FileServiceImpl implements FileService {
    private final FileRepository fileRepository;
    private final FileUploadUtil fileUploadUtil;
    private final ModelMapper modelMapper;

    /**
     * 파일 유효성 검사
     * @param file 업로드할 파일
     */
    private void validateFile(MultipartFile file) {
        if (file.isEmpty()) {
            throw new IllegalArgumentException("파일이 비어 있습니다.");
        }
        if (file.getSize() > 10 * 1024 * 1024) {
            throw new IllegalArgumentException("파일 크기가 10MB를 초과합니다.");
        }
        String fileExt = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf('.') + 1);
        if (!List.of("jpg", "png", "jpeg", "gif", "bmp", "tiff", "webp", "heif", "heic", "svg").contains(fileExt.toLowerCase())) {
            throw new IllegalArgumentException("허용되지 않은 파일 형식입니다: " + fileExt);
        }
    }

    /**
     * 파일 저장
     * @param file 파일
     * @param fileType 파일 구분 코드
     * @param fileRefId 파일 참조 ID
     * @param userId 사용자 ID
     * @throws IOException 파일 저장 중 오류 발생 시
     */
    @Transactional
    @Override
    public void saveFile(MultipartFile file, String fileType, String fileRefId, String userId) throws IOException {
        log.info("파일 저장 시작: 파일명={}, 사용자={}", file.getOriginalFilename(), userId);
        validateFile(file);

        FileDto fileDto = fileUploadUtil.saveFile(file, fileType, fileRefId, userId);

        try {
            File fileEntity = modelMapper.map(fileDto, File.class);
            fileRepository.save(fileEntity);
            log.info("파일 저장 성공: 파일명={}, 경로={}", file.getOriginalFilename(), fileDto.getFilePath());
        } catch (Exception e) {
            fileUploadUtil.deleteFile(fileDto.getFilePath());
            log.error("파일 데이터 저장 실패: {}", e.getMessage(), e);
            throw new RuntimeException("파일 데이터 저장 실패: " + e.getMessage(), e);
        }
    }

    /**
     * 파일 ID로 파일 삭제
     * @param fileId 파일 ID
     */
    @Override
    public void deleteFileById(Integer fileId) {
        log.info("파일 삭제 시작: 파일 ID={}", fileId);

        File file = fileRepository.findById(fileId)
                .orElseThrow(() -> new IllegalArgumentException("파일을 찾을 수 없습니다. ID: " + fileId));

        try {
            fileUploadUtil.deleteFile(file.getFilePath());
            fileRepository.deleteById(fileId);
            log.info("파일 삭제 성공: 파일 ID={}", fileId);
        } catch (Exception e) {
            log.error("파일 삭제 실패: {}", e.getMessage(), e);
            throw new RuntimeException("파일 삭제 실패: " + e.getMessage(), e);
        }
    }
}
