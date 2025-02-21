package kr.co.dmdm.service;

import kr.co.dmdm.dto.common.FileDto;
import kr.co.dmdm.dto.user.request.SignUpUserDto;
import kr.co.dmdm.dto.user.response.UserProfileDto;
import kr.co.dmdm.entity.File;
import kr.co.dmdm.entity.User;
import kr.co.dmdm.global.exception.CustomException;
import kr.co.dmdm.repository.jpa.UserRepository;
import kr.co.dmdm.repository.jpa.common.FileRepository;
import kr.co.dmdm.service.common.FileService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

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
    private final FileRepository fileRepository;
    private final FileService fileService;
    private final ModelMapper modelMapper;
    private final PasswordEncoder passwordEncoder;

    @Override
    public String findByUserId(String userId) {
        return userRepository.findById(userId).isPresent() ? "중복된 아이디" : "사용 가능한 아이디";
    }

    @Override
    public UserProfileDto findByUserProfile(String userId) {

        User user = userRepository.findByUserId(userId);


        File file = fileRepository.findFirstByFileRefNoAndFileTypeOrderByInsertDtDesc(userId, "PROFILE");
        FileDto fileDto = (file != null) ? modelMapper.map(file, FileDto.class) : null;

        UserProfileDto userProfileDto = modelMapper.map(user, UserProfileDto.class);

        if (userProfileDto != null) {
            userProfileDto.setFileDto(fileDto);
        }

        return userProfileDto;
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

    @Override
    public String updateUser(String userId, UserProfileDto profileDto, MultipartFile profileImage) {

        User user = userRepository.findByUserId(userId);
        if (user == null) {
            throw new CustomException(HttpStatus.NOT_FOUND, "낫 파운드 유저임");
        }

        if ((profileDto.isProfileDeleted() || profileImage != null) && profileDto.getFileDto() != null) {
            Integer fileId = profileDto.getFileDto().getFileNo();
            try {
                fileService.deleteFileById(fileId);
            } catch (Exception e) {
                throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "기존 프로필 이미지 삭제 실패");
            }
        }

        user.setUserName(profileDto.getUserName());
        user.setUserBirth(profileDto.getUserBirth());
        user.setUserEmail(profileDto.getUserEmail());
        user.setUserEmailPushYn(profileDto.getUserEmailPushYn());

        userRepository.save(user);

        if (profileImage != null && !profileImage.isEmpty()) {
            try {
                File existingFile = fileRepository.findFirstByFileRefNoAndFileTypeOrderByInsertDtDesc(userId, "PROFILE");
                if (existingFile != null) {
                    fileService.deleteFileById(existingFile.getFileNo());
                }
                fileService.saveFile(profileImage, "PROFILE", userId, userId);
            } catch (Exception e) {
                throw new CustomException(HttpStatus.INTERNAL_SERVER_ERROR, "프로필 이미지 저장 실패");
            }
        }

        return "프로필 정보 업데이트 완료";
    }


}
