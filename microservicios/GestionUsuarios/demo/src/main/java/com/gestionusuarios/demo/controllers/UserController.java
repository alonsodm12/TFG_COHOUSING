package com.gestionusuarios.demo.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
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

        try {
            User newUser = userService.registerUser(username, username, password, role);
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
                    new UsernamePasswordAuthenticationToken(authRequest.getUsername(), authRequest.getPassword()));

            UserDetails user = (UserDetails) auth.getPrincipal();
            String jwt = jwtUtil.generateToken(user.getUsername());

            return ResponseEntity.ok(new AuthResponse(jwt));
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Credenciales inválidas");
        }
    }

    @GetMapping("/usuarios")
    public ResponseEntity<String> getUsuarios() {
        Optional<List<User>> usuarios = userService.getUsers();
        return usuarios.map(users -> ResponseEntity.ok(users.get(0).getUsername()))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body("No hay usuarios."));
    }
}
