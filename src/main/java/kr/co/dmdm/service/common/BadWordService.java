package kr.co.dmdm.service.common;

import org.springframework.stereotype.Service;

import java.util.List;

/**
 * 패키지명        : kr.co.dmdm.service.common
 * 파일명          : BadWordService
 * 작성자          : 김상준
 * 일자            : 2025-01-24
 * 내용            :
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-01-24        김상준            최초 생성
 */

public interface BadWordService {

    void checkBadWord(String word);

    void checkBadWord(List<String> words);

}
