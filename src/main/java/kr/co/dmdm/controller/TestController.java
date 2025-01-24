package kr.co.dmdm.controller;

import kr.co.dmdm.dto.TestDto;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.global.exception.ExceptionEnum;
import kr.co.dmdm.utils.PagingUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/api/test")
@Slf4j
public class TestController {

    private final StringRedisTemplate redisTemplate;

    public TestController(StringRedisTemplate redisTemplate) {
        this.redisTemplate = redisTemplate;
    }

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

    @GetMapping("/error")
    public String errorTest() {
        throw new CustomException(ExceptionEnum.NOT_FOUND);
    }

    @GetMapping("/error2")
    public String errorTest2() {
        throw new CustomException(HttpStatus.BAD_REQUEST, "잘못된 요청입니다22222222.");
    }

    @GetMapping("/error3")
    public String errorTest3() {
        throw new RuntimeException("런타임 에러");
    }

    @GetMapping("/test1")
    public String test1() {
        return "테스트2";
    }

    @GetMapping("/test2")
    public TestDto test2(@RequestBody TestDto testDto) {
        System.out.println(testDto);
        return testDto;
    }


    @GetMapping("/set")
    public String setKey() {
        redisTemplate.opsForValue().set("testKey", "testValue");
        return "Key Set!!!";
    }

    @GetMapping("/get")
    public String getKey() {
        return redisTemplate.opsForValue().get("testKey");
    }
}
