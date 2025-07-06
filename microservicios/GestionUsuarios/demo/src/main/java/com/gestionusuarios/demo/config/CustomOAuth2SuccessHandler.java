package com.gestionusuarios.demo.config;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.gestionusuarios.demo.models.User;
import com.gestionusuarios.demo.services.UserService;
import com.gestionusuarios.demo.utils.JwtUtil;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final JwtUtil jwtService; // Tu servicio para generar JWT
    private final UserService userService; // Si necesitas guardar o buscar usuarios

    public CustomOAuth2SuccessHandler(JwtUtil jwtService, UserService userService) {
        this.jwtService = jwtService;
        this.userService = userService;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request,
                                        HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        // Extraer datos del usuario
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");

        // Buscar o crear usuario en tu BD
        User user = userService.findOrCreateUsuario(email, name);

        // Generar JWT
        String token = jwtService.generateToken(user.getUsername(),user.getRole());

        // Devolverlo como JSON
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write("{\"token\": \"" + token + "\"}");
    }
}
