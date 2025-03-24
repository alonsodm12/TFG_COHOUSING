package com.gestionusuarios.demo.services;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.gestionusuarios.demo.models.User;
import com.gestionusuarios.demo.repository.UserRepository;

public class UserService {
    
    private final UserRepository userRepository;
    private PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository,PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public User registerUser(String username, String email, String password, String role) {
        if(userRepository.findByUsername(username).isPresent())
            throw new IllegalArgumentException("El usuario ya existe");
    
        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

        String codedPassword = bCryptPasswordEncoder.encode(password);
        List<String> rolesUser = Arrays.asList(role);

        User usuario = new User(username,email,codedPassword,true,rolesUser);
        
        return userRepository.save(usuario);
    }

    public Optional<User> loginUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if(userOptional.isPresent()){
            String passwordCoded = userOptional.get().getPassword();

            BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

            Boolean coincidencia = bCryptPasswordEncoder.matches(password, passwordCoded);
        
            if(coincidencia)
                return userOptional;
            else
                return Optional.empty();
        }    
        else
            return Optional.empty();
    }
}
