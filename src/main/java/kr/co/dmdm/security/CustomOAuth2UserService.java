package kr.co.dmdm.security;

import kr.co.dmdm.dto.common.OAuth2Response;
import kr.co.dmdm.dto.user.response.UserDto;
import kr.co.dmdm.dto.user.sns.NaverResponse;
import kr.co.dmdm.entity.User;
import kr.co.dmdm.repository.jpa.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        System.out.println(oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("naver")) {

            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        }
        /*else if (registrationId.equals("google")) {

            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        }*/
        else {

            return null;
        }
        String username = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
        User existData = userRepository.findByUserId(username);

        if (existData == null) {

            User userEntity = new User();
            userEntity.setUserId(username);
            userEntity.setUserEmail(oAuth2Response.getEmail());
            userEntity.setUserName(oAuth2Response.getNickname());
            userEntity.setUserBirth(LocalDate.parse(oAuth2Response.getBirthyear() + "-" + oAuth2Response.getBirthday()));
            userEntity.setUserRole("ROLE_MEMBER");
            userEntity.setUserJoinType(oAuth2Response.getProvider());

            userRepository.save(userEntity);

            UserDto userDTO = new UserDto();
            userDTO.setUserId(username);
            userDTO.setUserName(oAuth2Response.getNickname());
            userDTO.setUserRole("ROLE_MEMBER");

            return new CustomOAuth2User(userDTO);
        } else {

            existData.setUserEmail(oAuth2Response.getEmail());
            existData.setUserName(oAuth2Response.getNickname());

            userRepository.save(existData);

            UserDto userDTO = new UserDto();
            userDTO.setUserId(existData.getUserId());
            userDTO.setUserName(oAuth2Response.getNickname());
            userDTO.setUserRole(existData.getUserRole());

            return new CustomOAuth2User(userDTO);
        }
    }
}