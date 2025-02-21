package kr.co.dmdm.controller.user;

import jakarta.validation.Valid;
import kr.co.dmdm.dto.user.request.DuplicationIdCheckDto;
import kr.co.dmdm.dto.user.request.SignUpUserDto;
import kr.co.dmdm.dto.user.response.UserDto;
import kr.co.dmdm.dto.user.response.UserProfileDto;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

/**
 * packageName    : kr.co.dmdm.controller.user
 * fileName       : UserController
 * author         : 한우성
 * date           : 2025-01-22
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-22        한우성       최초 생성
 */

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/user")
@Slf4j
public class UserController {

    private final UserService userService;
    private final JWTUtil jwtUtil;

    @PostMapping("/id-check")
    public String userDuplicationIdCheck(@RequestBody DuplicationIdCheckDto idCheckDto) {
        return userService.findByUserId(idCheckDto.getUserId());
    }

    @PostMapping
    public String signUp(@RequestBody @Valid SignUpUserDto userDto, BindingResult bindingResult) {
        return userService.saveUser(userDto);
    }

    @PostMapping("/profile")
    public UserProfileDto profile(@RequestHeader("access") String token) {

        String userId = jwtUtil.getUsername(token);
        log.info("토큰 확인용 이용: {}", userId);

        return userService.findByUserProfile(userId);
    }

    @PostMapping(value = "/update-profile", consumes = {"multipart/form-data"})
    public String updateProfile(
            @RequestHeader("access") String token,
            @RequestPart("userData") @Valid UserProfileDto profileDto,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {

        String userId = jwtUtil.getUsername(token);
        log.info("프로필 업데이트 요청: userId={}", userId);

        return userService.updateUser(userId, profileDto, profileImage);
    }

}