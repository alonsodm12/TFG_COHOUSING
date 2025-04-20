package com.gestionusuarios.demo.controllers;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import com.gestionusuarios.demo.DTOs.AuthRequest;
import com.gestionusuarios.demo.DTOs.AuthResponse;
import com.gestionusuarios.demo.DTOs.UserDTO;
import com.gestionusuarios.demo.DTOs.UserUpdateDTO;
import com.gestionusuarios.demo.models.User;
import com.gestionusuarios.demo.services.UserService;
import com.gestionusuarios.demo.utils.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import jakarta.validation.Valid;

/*
 * Controlador del microservicio Gestion de Usuarios
 * Permite las siguientes operaciones:
 *      - Registrar a un nuevo usuario
 *      - Logearse con sus credenciales
 *      - Permite modificar los datos del user en la BD
 * 
 */

@RestController
@RequestMapping("/user")
public class UserController {

    private final UserService userService;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public UserController(UserService userService, AuthenticationManager authenticationManager, JwtUtil jwtUtil) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    @Operation(summary = "Registar un nuevo usuario", description = "Este endpoint permite a un usuario registrarse en la aplicacion")
    @ApiResponse(responseCode = "200", description = "Registro del usuario exitoso")
    @ApiResponse(responseCode = "401", description = "Error al registrar un usuario")

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody UserDTO request) {

        try {

            User newUser = userService.registerUser(request);

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("Usuario registrado correctamente: ", newUser.getUsername()));

        } catch (IllegalArgumentException e) {

            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("Error durante el registro: ", e.getMessage()));

        }
    }

    @Operation(summary = "Inicio de sesión de un usuario registrado", description = "Este endpoint permite a un usuario iniciar sesión en la aplicacion")
    @ApiResponse(responseCode = "200", description = "Inicio de sesión exitoso")
    @ApiResponse(responseCode = "401", description = "Error al iniciar sesión")
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody AuthRequest authRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));

            UserDetails user = (UserDetails) auth.getPrincipal();

            String rol = "";

            Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
            for (GrantedAuthority authority : authorities) {
                if (authority.getAuthority().startsWith("ROLE_")) {
                    rol = authority.getAuthority(); // Devuelve el rol
                }
            }

            String jwt = jwtUtil.generateToken(user.getUsername(), rol);

            return ResponseEntity.status(HttpStatus.OK).body(Map.of("Login correcto: ", (new AuthResponse(jwt))));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST)
                    .body(Map.of("Error durante el login: ", "Credenciales inválidas"));
        }
    }

    @GetMapping("/usuarios")
    public ResponseEntity<Map<String, List<String>>> getUsuarios() {
        Optional<List<String>> usuarios = userService.getUsers();
    
        if (usuarios.isPresent()) {
            return ResponseEntity.ok(Map.of("Usuarios", usuarios.get()));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(Map.of("Usuarios", List.of()));
        }
    }

    @PostMapping("/delete")
    public ResponseEntity<?> deleteUsuario(@RequestBody String username) {
        try {
            userService.deleteUser(username);
            return ResponseEntity.noContent().build();
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al eliminar el usuario"));
        }

    }

    @PatchMapping("/usuario/{email}")
    public ResponseEntity<?> modificarUsuario(@PathVariable String email, @RequestBody UserUpdateDTO usuario){
        
        User actualizado = userService.modificarUser(email,usuario).orElseThrow(() -> new RuntimeException("Error durante la modificacion del usuario"));

        return ResponseEntity.status(HttpStatus.OK).body(Map.of("Usuario Modificado correctamente",actualizado.toString()));
        
    }
}