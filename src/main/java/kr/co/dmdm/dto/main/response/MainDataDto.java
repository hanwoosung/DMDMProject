package kr.co.dmdm.dto.main.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

/**
 * packageName    : kr.co.dmdm.dto.main.response
 * fileName       : MainDataDto
 * author         : 한우성
 * date           : 2025-02-14
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-02-14        한우성       최초 생성
 */

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MainDataDto {
    private  List<MainBoardDto> todayBoardList = new ArrayList<>();
    private  List<MainBoardDto> weekBoardList = new ArrayList<>();
    private  List<MainBoardDto> freeBoardList = new ArrayList<>();
    private List<MainBoardDto> qnaBoardList = new ArrayList<>();
    private  List<UserRankingDto> userLevelRankingList = new ArrayList<>();
    private  List<UserRankingDto> userTotalRankingList = new ArrayList<>();
}
