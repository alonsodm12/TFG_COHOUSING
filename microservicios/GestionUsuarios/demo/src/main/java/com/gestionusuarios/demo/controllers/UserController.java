package com.gestionusuarios.demo.controllers;

import java.util.Collection;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import com.gestionusuarios.demo.DTOs.AuthRequest;
import com.gestionusuarios.demo.DTOs.AuthResponse;
import com.gestionusuarios.demo.DTOs.UserDTO;
import com.gestionusuarios.demo.models.User;
import com.gestionusuarios.demo.services.UserService;
import com.gestionusuarios.demo.utils.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

/*
 * Controlador del microservicio Gestion de Usuarios
 * Permite las siguientes operaciones:
 *      - Registrar a un nuevo usuario
 *      - Logearse con sus credenciales
 *      - Permite modificar los datos del user en la BD
 * 
 */

@RestController
@RequestMapping("/auth")
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
    public ResponseEntity<?> register(@RequestBody UserDTO request) {
        String username = request.username();
        String password = request.password();
        String role = request.role();
        String email = request.email();

        try {
            User newUser = userService.registerUser(username, email, password, role);
            return ResponseEntity.ok(newUser.toString());
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("Error en la creación del usuario");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest authRequest) {
        try {
            Authentication auth = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.username(), authRequest.password()));

            UserDetails user = (UserDetails) auth.getPrincipal();

            String rol = "";

            Collection<? extends GrantedAuthority> authorities = user.getAuthorities();
            for (GrantedAuthority authority : authorities) {
                // Deberías tener algo como "ROLE_USER" o "ROLE_ADMIN"
                if (authority.getAuthority().startsWith("ROLE_")) {
                    rol = authority.getAuthority(); // Devuelve el rol
                }
            }

            String jwt = jwtUtil.generateToken(user.getUsername(), rol);

            return ResponseEntity.ok(new AuthResponse(jwt));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @GetMapping("/usuarios")
    public ResponseEntity<String> getUsuarios() {
        Optional<List<User>> usuarios = userService.getUsers();
        return usuarios.map(users -> {
            // Utilizamos Stream para extraer los nombres de todos los usuarios y unirlos en
            // una cadena
            String allUsernames = users.stream()
                    .map(User::getUsername) // Extrae el nombre de cada usuario
                    .collect(Collectors.joining(", ")); // Los nombres se unen con una coma
            return ResponseEntity.ok(allUsernames);
        })
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("No hay usuarios."));
    }

    @PostMapping("/delete")
    public boolean deleteUsuario(@RequestBody String username) {

        boolean exito = userService.deleteUser(username);

        return exito;
    }
}