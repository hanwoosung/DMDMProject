package kr.co.dmdm.service;

import kr.co.dmdm.dto.user.request.SignUpUserDto;
import kr.co.dmdm.entity.User;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * packageName    : kr.co.dmdm.service
 * fileName       : UserServiceImpl
 * author         : 한우성
 * date           : 2025-01-22
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-22        한우성       최초 생성
 */
@Service
@RequiredArgsConstructor
@Slf4j
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String findByUserId(String userId) {
        return userRepository.findById(userId).isPresent() ? "중복된 아이디" : "사용 가능한 아이디";
    }

    @Override
    public String saveUser(SignUpUserDto userDto) {
        User userEmailCheck = userRepository.findByUserEmail(userDto.getUserEmail());
        User userNameCheck = userRepository.findByUserName(userDto.getUserName());

        if (userEmailCheck != null) {
            throw new CustomException(HttpStatus.CONFLICT, "중복된 이메일 입니다.");
        }

        if (userNameCheck != null) {
            throw new CustomException(HttpStatus.CONFLICT, "중복된 닉네임 입니다.");
        }

        User user = modelMapper.map(userDto, User.class);
        user.setUserPw(passwordEncoder.encode(userDto.getUserPw()));
        userRepository.save(user);
        return "성공";
    }

}
