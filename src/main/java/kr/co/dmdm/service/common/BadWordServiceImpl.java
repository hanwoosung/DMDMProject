package kr.co.dmdm.service.common;

import jakarta.annotation.PostConstruct;
import kr.co.dmdm.dto.common.GubnDto;
import kr.co.dmdm.global.exception.CustomException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

/**
 * 패키지명        : kr.co.dmdm.service.common
 * 파일명          : BadWordServiceImpl
 * 작성자          : 김상준
 * 일자            : 2025-01-24
 * 내용            : 비속어 체크 서비스 구현
 * ===========================================================
 * 일자              작성자             메모
 * -----------------------------------------------------------
 * 2025-01-24        김상준            최초 생성
 */

@Service
@RequiredArgsConstructor
@Slf4j
public class BadWordServiceImpl implements BadWordService {

    private final GubnService gubnService;

    // 비속어 리스트 캐싱
    private List<String> badWordNames = Collections.emptyList();

    /**
     * 서비스 초기화 시 비속어 리스트를 로드합니다.
     */
    @PostConstruct
    public void loadBadWords() {
        List<GubnDto> badWords = gubnService.findAllByIdParentCode("BAD_WORD");
        if (badWords != null && !badWords.isEmpty()) {
            badWordNames = badWords.stream()
                    .map(GubnDto::getName)
                    .collect(Collectors.toList());
            log.info("비속어 리스트가 성공적으로 로드되었습니다. 총 {}개의 금칙어.", badWordNames.size());
        } else {
            log.warn("비속어 리스트가 비어 있습니다.");
        }
    }

    /**
     * 콘텐츠에서 금칙어를 확인합니다.
     * 주어진 콘텐츠에 금칙어가 포함되어 있는지 확인하며,
     * 금칙어가 발견되면 {@link CustomException} 예외를 발생시킵니다.
     *
     * @param content 검증할 콘텐츠 (null 허용되지 않음)
     * @throws CustomException 금칙어가 포함된 경우 발생
     */

    @Override
    public void checkBadWord(String content) {
        if (content == null || content.trim().isEmpty()) {
            log.warn("비속어 체크 실패: 입력된 콘텐츠가 null이거나 비어 있습니다.");
            return;
        }

        badWordNames.stream()
                .filter(content::contains)
                .findFirst()
                .ifPresent(badWord -> {
                    throw new CustomException(HttpStatus.BAD_REQUEST,
                            String.format("'%s'은(는) 사용할 수 없는 단어입니다.", badWord));
                });

        log.info("비속어 체크 완료: 콘텐츠에는 금칙어가 포함되지 않았습니다.");
    }

    /**
     * 단어 리스트에서 금칙어를 확인합니다.
     * 주어진 단어 리스트를 순회하며 금칙어가 포함되어 있는지 확인하며,
     * 금칙어가 발견되면 {@link CustomException} 예외를 발생시킵니다.
     *
     * @param words 검증할 단어 리스트 (null 허용되지 않음)
     * @throws CustomException 금칙어가 포함된 경우 발생
     */
    @Override
    public void checkBadWord(List<String> words) {
        if (words == null || words.isEmpty()) {
            log.warn("비속어 체크 실패: 입력된 단어 리스트가 null이거나 비어 있습니다.");
            return;
        }

        words.stream()
                .filter(badWordNames::contains)
                .findFirst()
                .ifPresent(badWord -> {
                    throw new CustomException(HttpStatus.BAD_REQUEST,
                            String.format("'%s'은(는) 사용할 수 없는 단어입니다.", badWord));
                });

        log.info("비속어 체크 완료: 리스트에는 금칙어가 포함되지 않았습니다.");
    }
}
