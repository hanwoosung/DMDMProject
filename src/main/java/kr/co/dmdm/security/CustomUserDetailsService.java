package kr.co.dmdm.security;

import kr.co.dmdm.entity.User;
import kr.co.dmdm.repository.jpa.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        User userData = userRepository.findByUserId(username);
        log.info("Loading user by username: {}", username);
        log.info("Loading user by userData: {}", userData);

        if (userData != null) {
            return new CustomUserDetails(userData);
        }
        return null;
    }
}
