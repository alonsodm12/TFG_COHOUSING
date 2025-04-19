package com.gestionusuarios.demo.services;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gestionusuarios.demo.DTOs.UserDTO;
import com.gestionusuarios.demo.models.User;
import com.gestionusuarios.demo.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(UserDTO userDTO) {
        if (userRepository.findByEmail(userDTO.email()).isPresent())
            throw new IllegalArgumentException("El email ya ha sido registrado");

        if (!userDTO.role().equals("buscador") && !userDTO.role().equals("ofertante"))
            throw new IllegalArgumentException("Rol inválido");

        String codedPassword = passwordEncoder.encode(userDTO.password());

        User usuario = new User(userDTO.username(), userDTO.email(), codedPassword, true, userDTO.role(),
                userDTO.lifestyleDTO().sociabilidad(), userDTO.lifestyleDTO().tranquilidad(),
                userDTO.lifestyleDTO().compartirEspacios(), userDTO.lifestyleDTO().limpieza(),
                userDTO.lifestyleDTO().actividad());

        return userRepository.save(usuario);
    }

    public Optional<User> loginUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            String passwordCoded = userOptional.get().getPassword();

            Boolean coincidencia = passwordEncoder.matches(password, passwordCoded);

            if (coincidencia)
                return userOptional;
            else
                return Optional.empty();
        } else
            return Optional.empty();
    }

    public Optional<List<String>> getUsers() {
        List<User> usuarios = userRepository.findAll();
        List<String> respuesta = usuarios.stream().map(User::toString).collect(Collectors.toList());
        if (usuarios.size() == 0) {
            return Optional.empty();
        } else {
            return Optional.of(respuesta);
        }
    }

    public void deleteUser(String username) {

        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            userRepository.delete(userOptional.get());
        } else {
            throw new UsernameNotFoundException("Usuario no existe");
        }
    }

    public Optional<User> findByUsername(String username) {

        return userRepository.findByUsername(username);

    }
}