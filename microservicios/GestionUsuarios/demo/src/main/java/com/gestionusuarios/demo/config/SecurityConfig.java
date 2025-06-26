package com.gestionusuarios.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.gestionusuarios.demo.security.CustomAuthenticationProvider;
import com.gestionusuarios.demo.security.filters.JwtAuthenticationFilter;
import com.gestionusuarios.demo.services.CustomUserDetailsService;
import com.gestionusuarios.demo.utils.JwtUtil;
import com.gestionusuarios.demo.config.CustomOAuth2SuccessHandler;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final CustomAuthenticationProvider authenticationProvider;
    private final CustomOAuth2SuccessHandler customOAuth2SuccessHandler;

    public SecurityConfig(CustomAuthenticationProvider authenticationProvider,
                          CustomOAuth2SuccessHandler customOAuth2SuccessHandler) {
        this.authenticationProvider = authenticationProvider;
        this.customOAuth2SuccessHandler = customOAuth2SuccessHandler;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http, JwtAuthenticationFilter jwtAuthenticationFilter)
            throws Exception {
        return http.csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/public/**", "/user/login", "/user/register", "/uploads/**", "/user/delete")
                        .permitAll()
                        .requestMatchers("/oauth2/**").permitAll()
                        .requestMatchers("/user/usuarios").hasRole("buscador")
                        .anyRequest().authenticated())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .oauth2Login(oauth -> oauth.successHandler(customOAuth2SuccessHandler))
                .authenticationProvider(authenticationProvider)
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration)
            throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtUtil jwtUtil,
            CustomUserDetailsService customUserDetailsService) {
        return new JwtAuthenticationFilter(jwtUtil, customUserDetailsService);
    }

}
