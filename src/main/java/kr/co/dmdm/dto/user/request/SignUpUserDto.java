package kr.co.dmdm.dto.user.request;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.time.LocalDate;

/**
 * packageName    : kr.co.dmdm.dto.user.request
 * fileName       : UserDto
 * author         : 한우성
 * date           : 2025-01-23
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-23        한우성       최초 생성
 */

@Data
public class SignUpUserDto {

    @NotBlank(message = "아이디는 필수 항목입니다.")
    @Size(min = 4, max = 15, message = "아이디는 4자 이상 15자 이하로 입력해야 합니다.")
    @Pattern(regexp = "^[a-zA-Z0-9]+$", message = "아이디는 영문과 숫자만 허용됩니다.")
    private String userId;

    @NotBlank(message = "비밀번호는 필수 항목입니다.")
    @Size(min = 6, message = "비밀번호는 최소 6자 이상이어야 합니다.")
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]+$",
            message = "비밀번호는 알파벳과 숫자를 포함해야 합니다.")
    private String userPw;

    @NotBlank(message = "닉네임은 필수 항목입니다.")
    @Size(max = 20, message = "닉네임은 최대 20자까지 입력 가능합니다.")
    @Pattern(regexp = "^[a-zA-Z0-9가-힣]+$",
            message = "닉네임은 특수문자를 제외한 문자만 허용됩니다.")
    private String userName;

    @NotNull(message = "생년월일은 필수 항목입니다.")
    @Past(message = "생년월일은 오늘 이전 날짜여야 합니다.")
    private LocalDate userBirth;

    @NotBlank(message = "이메일은 필수 항목입니다.")
    @Email(message = "유효한 이메일 형식이 아닙니다.")
    private String userEmail;

    @NotNull(message = "이메일 수신 동의 여부는 필수 항목입니다.")
    @Pattern(regexp = "[YN]", message = "이메일 수신 동의 여부는 'Y' 또는 'N'이어야 합니다.")
    private Character userEmailPushYn;

    private String userRole;

    private String userJoinType;
}
