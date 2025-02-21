package kr.co.dmdm.service;

import kr.co.dmdm.dto.user.request.SignUpUserDto;
import kr.co.dmdm.dto.user.response.UserProfileDto;
import org.springframework.web.multipart.MultipartFile;

/**
 * packageName    : kr.co.dmdm.service
 * fileName       : UserService
 * author         : 한우성
 * date           : 2025-01-22
 * description    :
 * ===========================================================
 * DATE              AUTHOR             NOTE
 * -----------------------------------------------------------
 * 2025-01-22        한우성       최초 생성
 */
public interface UserService {
    String findByUserId(String userId);
    UserProfileDto findByUserProfile(String userId);
    String saveUser(SignUpUserDto user);
    String updateUser(String userId, UserProfileDto profileDto, MultipartFile profileImage) ;
}
