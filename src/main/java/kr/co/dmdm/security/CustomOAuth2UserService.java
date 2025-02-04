package kr.co.dmdm.security;

import kr.co.dmdm.dto.common.OAuth2Response;
import kr.co.dmdm.dto.user.response.UserDto;
import kr.co.dmdm.dto.user.sns.GithubResponse;
import kr.co.dmdm.dto.user.sns.GoogleResponse;
import kr.co.dmdm.dto.user.sns.KakaoResponse;
import kr.co.dmdm.dto.user.sns.NaverResponse;
import kr.co.dmdm.entity.User;
import kr.co.dmdm.repository.jpa.UserRepository;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {

        OAuth2User oAuth2User = super.loadUser(userRequest);
        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        System.out.println(oAuth2User);

        if (registrationId.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("google")) {

            String accessToken = userRequest.getAccessToken().getTokenValue();
            GoogleResponse googleResponse = new GoogleResponse(oAuth2User.getAttributes());
            Map<String, String> birthDate = getBirthDateFromGoogle(accessToken);

            if (birthDate != null) {
                googleResponse.setBirthDate(birthDate.get("year"), birthDate.get("birthday"));
            }

            oAuth2Response = googleResponse;

        } else if (registrationId.equals("github")) {
            oAuth2Response = new GithubResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        } else {
            return null;
        }

        String username = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
        User existData = userRepository.findByUserId(username);

        if (existData == null) {
            User userEntity = new User();
            userEntity.setUserId(username);
            userEntity.setUserEmail(oAuth2Response.getEmail());
            userEntity.setUserName(oAuth2Response.getNickname());

            if (oAuth2Response.getBirthyear() != null && !oAuth2Response.getBirthyear().isEmpty() &&
                    oAuth2Response.getBirthday() != null && !oAuth2Response.getBirthday().isEmpty()) {
                userEntity.setUserBirth(LocalDate.parse(oAuth2Response.getBirthyear() + "-" + oAuth2Response.getBirthday()));
            } else {
                userEntity.setUserBirth(null);
            }

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

    private Map<String, String> getBirthDateFromGoogle(String accessToken) {
        RestTemplate restTemplate = new RestTemplate();
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<Map> response = restTemplate.exchange(
                "https://people.googleapis.com/v1/people/me?personFields=birthdays",
                HttpMethod.GET,
                entity,
                Map.class
        );

        Map<String, Object> userInfo = response.getBody();
        if (userInfo != null && userInfo.containsKey("birthdays")) {
            List<Map<String, Object>> birthdays = (List<Map<String, Object>>) userInfo.get("birthdays");

            if (!birthdays.isEmpty()) {
                Map<String, Object> date = (Map<String, Object>) birthdays.get(0).get("date");

                String year = date.containsKey("year") ? String.valueOf(date.get("year")) : null;
                String month = date.containsKey("month") ? String.format("%02d", date.get("month")) : "01";
                String day = date.containsKey("day") ? String.format("%02d", date.get("day")) : "01";

                if (year == null) {
                    return null;
                }
                return Map.of(
                        "year", year,
                        "birthday", month + "-" + day
                );
            }
        }
        return null;
    }


}