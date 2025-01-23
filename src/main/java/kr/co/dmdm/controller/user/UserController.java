package kr.co.dmdm.controller.user;

import jakarta.validation.Valid;
import kr.co.dmdm.dto.user.request.DuplicationIdCheckDto;
import kr.co.dmdm.dto.user.request.SignUpUserDto;
import kr.co.dmdm.dto.user.response.UserDto;
import kr.co.dmdm.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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

    @PostMapping("/id-check")
    public String userDuplicationIdCheck(@RequestBody DuplicationIdCheckDto idCheckDto) {
        log.info("아이디가 왔는가용 {}" , idCheckDto.getUserId());
        return userService.findByUserId(idCheckDto.getUserId());
    }

    @PostMapping
    public String signUp(@RequestBody @Valid SignUpUserDto userDto, BindingResult bindingResult) {
        log.info("dsafasfsaf{}", userDto);
        return "";
    }

}