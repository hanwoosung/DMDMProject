package kr.co.dmdm.repository.jpa.common;

import kr.co.dmdm.dto.common.GubnDto;
import kr.co.dmdm.entity.Gubn;
import kr.co.dmdm.entity.GubnCompositeKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

/**
 * packageName    : kr.co.dmdm.repository.jpa.common
 * fileName       : GubnRepository
 * author         : 한우성
 * date           : 2025-01-21
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        한우성       최초 생성
 */
public interface GubnRepository extends JpaRepository<Gubn, GubnCompositeKey> {

    @Query("""
                SELECT new kr.co.dmdm.dto.common.GubnDto(
                                g.id.parentCode,
                                g.id.code,
                                g.name,
                                g.firstSpecial,
                                g.firstSpecialDescription,
                                g.secondSpecial,
                                g.secondSpecialDescription,
                                g.thirdSpecial,
                                g.thirdSpecialDescription,
                                g.status) FROM Gubn g WHERE g.id.parentCode = :parentCode
                                ORDER BY CASE WHEN g.status = 'ACTIVE' THEN 1 ELSE 2 END, g.id.code ASC
                """)
    List<GubnDto> findByParentCode(@Param("parentCode") String parentCode);

    @Modifying
    @Query("""
        UPDATE Gubn g 
        SET g.status = :status 
        WHERE g.id.code IN :codes 
        AND g.id.parentCode IN :parentCodes
        """)
    void updateStatusByCodesAndParentCodes(@Param("codes") List<String> codes,
                                           @Param("parentCodes") List<String> parentCodes,
                                           @Param("status") String status);

    @Query("""
                SELECT new kr.co.dmdm.dto.common.GubnDto(
                                g.id.parentCode,
                                g.id.code,
                                g.name,
                                g.firstSpecial,
                                g2.firstSpecialDescription,
                                g.secondSpecial,
                                g2.secondSpecialDescription,
                                g.thirdSpecial,
                                g2.thirdSpecialDescription,
                                g.status)
                                FROM Gubn g
                                LEFT JOIN Gubn g2 ON g2.id.parentCode = '' AND g2.id.code = g.id.parentCode
                                WHERE g.id.parentCode = :parentCode
                                ORDER BY CASE WHEN g.status = 'ACTIVE' THEN 1 ELSE 2 END, g.id.code ASC
                """)
    List<GubnDto> findChildCodeByParentCode(@Param("parentCode") String parentCode);
}