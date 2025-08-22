package com.gestionusuarios.demo.services;

import java.util.NoSuchElementException;

import javax.security.sasl.AuthenticationException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gestionusuarios.demo.DTOs.LoginRequestDTO;
import com.gestionusuarios.demo.DTOs.UserDTO;
import com.gestionusuarios.demo.models.User;
import com.gestionusuarios.demo.repository.UserRepository;

@Service
public class AuthService implements UserDetailsService{
    
    private static final Logger logger = LoggerFactory.getLogger(AuthService.class);

    private UserRepository userRepository;
    private final TokenService tokenService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationConfiguration authenticationConfiguration;


    public AuthService(UserRepository userRepository, TokenService tokenService, PasswordEncoder passwordEncoder,
            AuthenticationConfiguration authenticationConfiguration) {
        this.userRepository = userRepository;
        this.tokenService = tokenService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationConfiguration = authenticationConfiguration;
    }

    public User createUser(final UserDTO createUserDTO){

        //Comprobamos que el usuario no este registrado previamente
        if(userRepository.findByEmail(createUserDTO.email()).isPresent()){
            throw new IllegalArgumentException("El usuario con este email ya esta registrado");    
        }

        //Creamos el usuario
        final User createUser = new User(createUserDTO.username(), createUserDTO.email(),
         createUserDTO.email(), createUserDTO.fotoUrl(),createUserDTO.latitud(),
          createUserDTO.longitud(),createUserDTO.direccion(),createUserDTO.role()
          , createUserDTO.lifestyleDTO().sociabilidad(), createUserDTO.lifestyleDTO().tranquilidad(),
          createUserDTO.lifestyleDTO().compartirEspacios(),createUserDTO.lifestyleDTO().limpieza(),
          createUserDTO.lifestyleDTO().actividad());

        createUser.setPassword(passwordEncoder.encode(createUserDTO.password()));
        final User user = userRepository.save(createUser);
        logger.info("[USER] : User successfully created with id {}", user.getId());

        return user;
    }

    public User getUser(final Long id) {
        return userRepository.findById(id)
            .orElseThrow(() -> {
                logger.error("[USER] : User not found with id {}", id);
                return new NoSuchElementException("Error al obtener el usuario");
            });
    }

    public String login(final LoginRequestDTO loginRequest){
        try {
            final AuthenticationManager authenticationManager = authenticationConfiguration.getAuthenticationManager();
            final org.springframework.security.core.Authentication authRequest = new UsernamePasswordAuthenticationToken(loginRequest.username(),loginRequest.password());
            final org.springframework.security.core.Authentication authentication = authenticationManager.authenticate(authRequest);
            return tokenService.generateToken(authentication);

        } catch (Exception e) {
            logger.error("[USER] : Error al realizar el login", e);
            throw new BadCredentialsException("Error al realizar el login");
        }
    }



    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
         User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Usuario no encontrado"));
    
        return org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
                .password(user.getPassword()).roles(user.getRole()).build();
    }
    
}