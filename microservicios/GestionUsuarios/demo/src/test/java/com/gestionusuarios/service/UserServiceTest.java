package com.gestionusuarios.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.gestionusuarios.demo.DTOs.LifestyleDTO;
import com.gestionusuarios.demo.DTOs.UserDTO;
import com.gestionusuarios.demo.models.User;
import com.gestionusuarios.demo.repository.UserRepository;
import com.gestionusuarios.demo.services.UserService;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @InjectMocks
    UserService userService;

    @Test
    public void registrarUsuario_devuelveUsuarioGuardado() {
        UserDTO userDTO = new UserDTO("alonso", "grandad123", "buscador", "alonsodmx@gmail.com",
                new LifestyleDTO(2, 2, 2, 2, 2));

        // Stubbing para que no lance la excepción por email duplicado
        when(userRepository.findByEmail(userDTO.email())).thenReturn(Optional.empty());

        // Stubbing del repositorio para el método save
        when(userRepository.save(any(User.class)))
                .thenReturn(new User("alonso", "alonsodmx@gmail.com", "grandad123", true, "buscador", 2, 2, 2, 2, 2));

        User usuario = userService.registerUser(userDTO);

        // Verificación de que el save() se invoca con un objeto User
        verify(userRepository).save(any(User.class));

        // Verificación del valor del username
        assertEquals("alonso", usuario.getUsername());
    }

}
