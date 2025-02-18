package kr.co.dmdm.controller.common;

import kr.co.dmdm.dto.common.FileDto;
import kr.co.dmdm.dto.common.request.FileRequestDto;
import kr.co.dmdm.service.common.FileService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.web.bind.annotation.*;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;

/**
 * 패키지명        : kr.co.dmdm.controller.common
 * 파일명          : FileController
 * 작성자          : 김상준
 * 일자            : 2025-01-23
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-01-23        김상준            최초 생성
 */

@RequestMapping("/file")
@RestController
@RequiredArgsConstructor
public class FileController {

    private final FileService fileService;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @GetMapping("/{fileName}")
    public Resource getFile(@PathVariable String fileName) throws IOException {
        // 저장된 파일 경로
        Path filePath = Paths.get(uploadDir + "/" + fileName);
        Resource resource = new FileSystemResource(filePath);

        if (resource.exists()) {
            return resource;
        } else {
            throw new FileNotFoundException(fileName);
        }
    }

    @PostMapping("/path")
    public String getFilePath(@RequestBody FileRequestDto file) {
        FileDto fileDto = fileService.findFileByRefNoAndFileType(file.getFileRef(), file.getFileType());

        return fileDto.getFilePath();
    }
}
