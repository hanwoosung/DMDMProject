package kr.co.dmdm.controller;

import kr.co.dmdm.utils.PagingUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequiredArgsConstructor
@Slf4j
public class TestController {

    // 더미 데이터 생성
    private List<String> generateDummyData(int totalCount) {
        return IntStream.range(1, totalCount + 1)
                .mapToObj(i -> "Item " + i)
                .collect(Collectors.toList());
    }

    @GetMapping("/paged-data")
    public Object getPagedData(@RequestParam(defaultValue = "1") int page,
                               @RequestParam(defaultValue = "10") int size) {
        // 더미 데이터 목록 생성 (예: 총 120개의 아이템)
        List<String> allData = generateDummyData(120);

        // 페이지 번호와 사이즈에 맞게 데이터 자르기
        int start = (page - 1) * size;
        int end = Math.min(start + size, allData.size());

        // 해당 페이지 데이터
        List<String> pagedData = allData.subList(start, end);

        // 페이징 정보 계산
        PagingUtil pagingUtil = new PagingUtil(120, page, size, 5);

        // 페이징 데이터와 실제 데이터 함께 반환
        return new Object() {
            public List<String> data = pagedData;
            public PagingUtil paging = pagingUtil;
        };
    }
}
