package com.gestionusuarios.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public User registerUser(String username, String email, String password, String role) {
        if (userRepository.findByUsername(username).isPresent())
            throw new IllegalArgumentException("El usuario ya existe");

        String codedPassword = passwordEncoder.encode(password);

        User usuario = new User(username, email, codedPassword, true, role);

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

    public Optional<List<User>> getUsers() {
        List<User> usuarios = userRepository.findAll();

        if (usuarios.size() == 0) {
            return Optional.empty();
        } else {
            return Optional.of(usuarios);
        }
    }

    public boolean deleteUser(String username) {

        Optional<User> userOptional = userRepository.findByUsername(username);

        if(userOptional.isPresent()){
            userRepository.delete(userOptional.get());
            return true;
        }
        else{
            throw new UsernameNotFoundException("Usuario no existe");
        }

            
    }
}