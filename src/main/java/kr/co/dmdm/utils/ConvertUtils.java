package kr.co.dmdm.utils;

import java.time.Instant;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;

/**
 * packageName    : kr.co.dmdm.utils
 * fileName       : ConvertUtils
 * author         : 황승현
 * date           : 2025-01-21
 * description    : 변환 유틸 클래스
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-21        황승현       최초 생성
 */
public class ConvertUtils {

    private ConvertUtils() {
        throw new UnsupportedOperationException("유틸클래스임");
    }

    /**
     * LocalDate, Instant를 '년월' 포맷 (예: 2025년 01월)으로 변환
     *
     * @param date LocalDate 객체 또는 Instant 객체
     * @return 변환된 년월 문자열 (예: 2025년 01월)
     */
    public static String convertToYearMonth(Object date) {
        if (date == null) {
            throw new IllegalArgumentException("null 값이다잉");
        }

        DateTimeFormatter yearMonthFormatter = DateTimeFormatter.ofPattern("yyyy년 MM월");

        return switch (date) {
            case LocalDate localDate -> localDate.format(yearMonthFormatter);
            case Instant instant -> instant.atZone(ZoneId.systemDefault()).toLocalDate().format(yearMonthFormatter);
            default -> throw new IllegalArgumentException("지원하지 않는 타입: " + date.getClass().getName());
        };
    }

    /**
     * LocalDate, Instant를 '년월일' 포맷으로 변환
     *
     * @param date LocalDate 객체 또는 Instant 객체
     * @return 변환된 날짜 문자열 (예: 2025-01-21)
     */
    public static String convertToDate(Object date) {
        if (date == null) {
            throw new IllegalArgumentException("null 값이다잉");
        }

        DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_LOCAL_DATE;

        return switch (date) {
            case LocalDate localDate -> localDate.format(dateFormatter);
            case Instant instant -> instant.atZone(ZoneId.systemDefault()).toLocalDate().format(dateFormatter);
            default -> throw new IllegalArgumentException("지원하지 않는 타입: " + date.getClass().getName());
        };
    }

    /**
     * LocalDateTime, Instant를 '년월일시' 포맷으로 변환
     *
     * @param dateTime Object (LocalDateTime 또는 Instant 지원)
     * @return 변환된 날짜 시간 문자열 (예: 2025-01-21 12:30)
     */
    public static String convertToDateTime(Object dateTime) {
        if (dateTime == null) {
            throw new IllegalArgumentException("null 값이다잉");
        }

        DateTimeFormatter outputFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");

        return switch (dateTime) {
            case LocalDateTime localDateTime -> localDateTime.format(outputFormatter);
            case Instant instant -> instant.atZone(ZoneId.systemDefault()).toLocalDateTime().format(outputFormatter);
            default -> throw new IllegalArgumentException("지원하지 않는 타입: " + dateTime.getClass().getName());
        };
    }
}