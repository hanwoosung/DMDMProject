package kr.co.dmdm.repository.jpa.common;

import kr.co.dmdm.dto.common.FileDto;
import kr.co.dmdm.entity.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

/**
 * packageName    : kr.co.dmdm.repository.jpa.common
 * fileName       : FileRepository
 * author         : 한우성
 * date           : 2025-01-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        한우성       최초 생성
 */
public interface FileRepository extends JpaRepository<File, Integer> {

    File findFirstByFileRefNoAndFileTypeOrderByInsertDtDesc(String fileRefNo, String fileType);

}