package kr.co.dmdm.config;

import kr.co.dmdm.jwt.CustomLogoutFilter;
import kr.co.dmdm.jwt.JWTFilter;
import kr.co.dmdm.jwt.JWTUtil;
import kr.co.dmdm.jwt.LoginFilter;
import kr.co.dmdm.security.CustomOAuth2SuccessHandler;
import kr.co.dmdm.security.CustomOAuth2UserService;
import kr.co.dmdm.service.common.LoginAttemptService;
import kr.co.dmdm.service.common.TokenService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.logout.LogoutFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Collections;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final AuthenticationConfiguration authenticationConfiguration;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final LoginAttemptService loginAttemptService;
    private final JWTUtil jwtUtil;
    private final TokenService tokenService;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, CustomOAuth2UserService customOAuth2UserService, LoginAttemptService loginAttemptService, JWTUtil jwtUtil, TokenService tokenService) {
        this.authenticationConfiguration = authenticationConfiguration;
        this.customOAuth2UserService = customOAuth2UserService;
        this.loginAttemptService = loginAttemptService;
        this.jwtUtil = jwtUtil;
        this.tokenService = tokenService;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.addAllowedOrigin("http://localhost:3000");
        configuration.addAllowedMethod("*");
        configuration.addAllowedHeader("*");
        configuration.addExposedHeader("access");
        configuration.addExposedHeader("refresh");
        configuration.setExposedHeaders(Collections.singletonList("access"));
        configuration.addExposedHeader("Authorization");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }


    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf((auth) -> auth.disable());

        http
                .formLogin((auth) -> auth.disable());

        http
                .httpBasic((auth) -> auth.disable());

        http
                .cors(withDefaults())
                .authorizeHttpRequests((auth) ->
                        auth.requestMatchers("/api/test/admin").hasRole("ADMIN")
                        .requestMatchers("/api/v1/user/profile").hasRole("MEMBER")
                        .anyRequest().permitAll()
                );
        http
                .addFilterBefore(new JWTFilter(jwtUtil), LoginFilter.class);

        http
                .oauth2Login(oauth2 -> oauth2
                        .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint
                                .userService(customOAuth2UserService)
                        )
                        .successHandler(new CustomOAuth2SuccessHandler(jwtUtil, tokenService))
                );

        http
                .addFilterAt(new LoginFilter(tokenService, authenticationManager(authenticationConfiguration), jwtUtil,loginAttemptService), UsernamePasswordAuthenticationFilter.class);
        http
                .addFilterBefore(new CustomLogoutFilter(jwtUtil, tokenService), LogoutFilter.class);

        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        return http.build();
    }
}