package com.gestionusuarios.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;
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
import com.gestionusuarios.demo.services.AuthService;
import com.gestionusuarios.demo.services.UserService;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {

    @Mock
    UserRepository userRepository;

    @Mock
    PasswordEncoder passwordEncoder;

    @InjectMocks
    AuthService authService;

    @InjectMocks
    UserService userService;

    @Test
    public void registrarUsuario_devuelveUsuarioGuardado() {
        UserDTO userDTO = new UserDTO(
            "alonso",
            1L,
            "grandad123",
            "buscador",
            "alonsodmx@gmail.com",
            "Calle Falsa 123",
            40.4168,
            -3.7038,
            "http://foto.url",
            new LifestyleDTO(2, 2, 2, 2, 2),0L,new ArrayList<>()
        );


        // Stubbing del repositorio para el método save
        when(userRepository.save(any(User.class)))
            .thenReturn(new User(
                "alonso",
                "alonsodmx@gmail.com",
                "grandad123",
                "http://foto.url",
                40.4168,
                -3.7038,
                "Calle Falsa 123",
                "buscador",
                2,
                2,
                2,
                2,
                2
            ));

        User usuario = authService.createUser(userDTO);

        // Verificación de que el save() se invoca con un objeto User
        verify(userRepository).save(any(User.class));

        // Verificación del valor del username
        assertEquals("alonso", usuario.getUsername());
    }

    @Test
    public void registrarUsuarioExistenteLanzaExcepcion() {
        UserDTO userDTO = new UserDTO(
            "alonso",
            1L,
            "grandad123",
            "buscador",
            "alonsodmx@gmail.com",
            "Calle Falsa 123",
            40.4168,
            -3.7038,
            "http://foto.url",
            new LifestyleDTO(2, 2, 2, 2, 2),0L,new ArrayList<>()
        );
        // Stubbing del repositorio para el método save
        when(userRepository.findByEmail("alonsodmx@gmail.com")).thenReturn(Optional.of(new User()));

        assertThrows(IllegalArgumentException.class, ()-> authService.createUser(userDTO));

    }

    @Test
    public void getUsuarioPorIdNoExistente() {
        when(userRepository.findById(100L)).thenReturn(Optional.empty());

        assertThrows(NoSuchElementException.class, () -> authService.getUser(100L));
    }

    @Test
    void testGetComunidadesGuardadas() {
        UserDTO userDTO = new UserDTO(
            "alonso",
            1L,
            "grandad123",
            "buscador",
            "alonsodmx@gmail.com",
            "Calle Falsa 123",
            40.4168,
            -3.7038,
            "http://foto.url",
            new LifestyleDTO(2, 2, 2, 2, 2),0L,new ArrayList<>()
        );
        when(userRepository.save(any(User.class)))
            .thenReturn(new User(
                "alonso",
                "alonsodmx@gmail.com",
                "grandad123",
                "http://foto.url",
                40.4168,
                -3.7038,
                "Calle Falsa 123",
                "buscador",
                2,
                2,
                2,
                2,
                2
            ));
        User usuario = authService.createUser(userDTO);
        usuario.setComunidadesGuardadas(List.of(1L,2L,3L));

        when(userRepository.findById(1L)).thenReturn(Optional.of(usuario));

        List<Long> comunidades = userService.obtenerComunidadesGuardadas(1L);

        assertEquals(3, comunidades.size());
    }

    @Test
    void testGetComunidadesGuardadasVacia() {
        UserDTO userDTO = new UserDTO(
            "alonso",
            1L,
            "grandad123",
            "buscador",
            "alonsodmx@gmail.com",
            "Calle Falsa 123",
            40.4168,
            -3.7038,
            "http://foto.url",
            new LifestyleDTO(2, 2, 2, 2, 2),0L,new ArrayList<>()
        );
        when(userRepository.save(any(User.class)))
            .thenReturn(new User(
                "alonso",
                "alonsodmx@gmail.com",
                "grandad123",
                "http://foto.url",
                40.4168,
                -3.7038,
                "Calle Falsa 123",
                "buscador",
                2,
                2,
                2,
                2,
                2
            ));
        User usuario = authService.createUser(userDTO);
        usuario.setComunidadesGuardadas(List.of());

        when(userRepository.findById(1L)).thenReturn(Optional.of(usuario));

        List<Long> comunidades = userService.obtenerComunidadesGuardadas(1L);

        assertTrue(comunidades.isEmpty());
    }

}
