package kr.co.dmdm.service;

import kr.co.dmdm.repository.jpa.UserRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
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
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;

    @Override
    public String findByUserId(String userId) {
        return userRepository.findById(userId).isPresent() ? "중복된 아이디" : "사용 가능한 아이디";
    }
}
