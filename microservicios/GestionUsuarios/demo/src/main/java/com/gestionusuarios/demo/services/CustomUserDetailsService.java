package com.gestionusuarios.demo.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.gestionusuarios.demo.models.User;
import com.gestionusuarios.demo.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService{

    @Autowired
    private UserRepository userRepository;

    public CustomUserDetailsService(){
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException{
         User user = userRepository.findByUsername(username)
                .orElseThrow(()-> new UsernameNotFoundException("Usuario no encontrado"));
    
        return org.springframework.security.core.userdetails.User.withUsername(user.getUsername())
                .password(user.getPassword()).roles(user.getRoles().get(0)).build();
    }


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
    
}
