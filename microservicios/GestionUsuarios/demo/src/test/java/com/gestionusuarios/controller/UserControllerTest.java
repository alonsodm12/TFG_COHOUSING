package com.gestionusuarios.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.ArrayList;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.gestionusuarios.demo.DemoApplication;
import com.gestionusuarios.demo.DTOs.LifestyleDTO;
import com.gestionusuarios.demo.DTOs.LoginRequestDTO;
import com.gestionusuarios.demo.DTOs.UserDTO;
import com.gestionusuarios.demo.models.User;
import com.gestionusuarios.demo.services.AuthService;
import com.gestionusuarios.demo.services.TokenService;
import com.gestionusuarios.demo.services.UserService;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.csrf;


@SpringBootTest(classes = DemoApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private TokenService tokenService;

    @MockBean
    private AuthService authService;

    @Test
    void testLoginExitoso() throws Exception {
        String fakeToken = "fake-jwt-token";

        when(authService.login(any(LoginRequestDTO.class))).thenReturn(fakeToken);
        when(tokenService.getRoleFromToken(fakeToken)).thenReturn("buscador");

        mockMvc.perform(post("/user/login").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"Alonso\",\"password\":\"1234\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.message").value("Login correcto"))
                .andExpect(jsonPath("$.username").value("Alonso"))
                .andExpect(jsonPath("$.role").value("buscador"));
    }

    @Test
    void testLoginFallido() throws Exception {

        when(authService.login(any(LoginRequestDTO.class)))
            .thenThrow(new BadCredentialsException("Credenciales inválidas"));
        
            mockMvc.perform(post("/user/login").with(csrf())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"username\":\"Alonso\",\"password\":\"wrongpass\"}"))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.error:").value("Credenciales inválidas"));
    }

    @Test
    void testGetUsuarioExistente() throws Exception {
        UserDTO userDTO = new UserDTO(
            "alonso", 1L, "grandad123", "buscador", "alonsodmx@gmail.com",
            "Calle Falsa 123", 40.4168, -3.7038, "http://foto.url",
            new LifestyleDTO(2, 2, 2, 2, 2), 0L, new ArrayList<>()
        );

        User usuario = authService.createUser(userDTO);
        when(userService.findByUsername("alonso")).thenReturn(Optional.of(new User()));

        mockMvc.perform(get("/user/alonso"))
                .andExpect(status().isOk());
    }

    @Test
    void testGetUsuarioNoExistente() throws Exception {
        when(userService.findByUsername("noExiste")).thenThrow(new UsernameNotFoundException("Usuario no encontrado"));

        mockMvc.perform(get("/user/noExiste"))
                .andExpect(status().isNotFound());
    }
}
