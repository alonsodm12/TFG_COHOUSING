package com.gestionusuarios.demo.controllers;

import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.MediaType;
import org.springframework.web.multipart.MultipartFile;

import com.gestionusuarios.demo.DTOs.AuthRequest;
import com.gestionusuarios.demo.DTOs.AuthResponse;
import com.gestionusuarios.demo.DTOs.DatosPerfilDTO;
import com.gestionusuarios.demo.DTOs.LifestyleDTO;
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

    @PostMapping(value = "/register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> register(@RequestPart("user") @Valid UserDTO userDTO,
            @RequestPart(value = "foto", required = false) MultipartFile foto) {

        try {

            if (foto != null && !foto.isEmpty()) {
                String fotoUrl = userService.guardarFoto(foto);
                userDTO = new UserDTO(
                        userDTO.username(),
                        userDTO.id(),
                        userDTO.password(),
                        userDTO.role(),
                        userDTO.email(),
                        userDTO.direccion(),
                        userDTO.latitud(),
                        userDTO.longitud(),
                        fotoUrl,
                        userDTO.lifestyleDTO(),
                        0L,
                        userDTO.comunidadesGuardadas());
            }
            
            User newUser = userService.registerUser(userDTO);
            
            String jwt = jwtUtil.generateToken(newUser.getUsername(), newUser.getRole());

            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(Map.of("Token", new AuthResponse(jwt)));

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

    @PostMapping("/delete/{username}")
    public ResponseEntity<?> deleteUsuario(@PathVariable String username) {
        try {
            userService.deleteUser(username);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (UsernameNotFoundException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al eliminar el usuario"));
        }

    }

    @PatchMapping("/update-admin/{username}/{idAdmin}")
    public ResponseEntity<?> actualizarAdminId(@PathVariable String username, @PathVariable Long idAdmin) {
        try {

            User actualizado = userService.addCommunityId(username, idAdmin).get();
            return ResponseEntity.status(HttpStatus.OK)
                    .body(Map.of("Usuario Modificado correctamente", actualizado.toString()));

        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Comunidad no encontrada"));
        }
    }

    @PatchMapping("/usuario/{username}")
    public ResponseEntity<?> modificarUsuario(@PathVariable String username, @RequestBody UserUpdateDTO usuario) {

        User actualizado = userService.modificarUser(username, usuario)
                .orElseThrow(() -> new RuntimeException("Error durante la modificacion del usuario"));

        return ResponseEntity.status(HttpStatus.OK)
                .body(Map.of("Usuario Modificado correctamente", actualizado.toString()));

    }

    @GetMapping("/{username}")
    public ResponseEntity<?> getUsuario(@PathVariable String username) {
        Optional<User> usuario = userService.findByUsername(username);

        if (usuario.isPresent()) {
            LifestyleDTO lifestyleDTO = new LifestyleDTO(usuario.get().getTranquilidad(), usuario.get().getActividad(),
                    usuario.get().getLimpieza(), usuario.get().getCompartirEspacios(), usuario.get().getSociabilidad());

            UserDTO userDto = new UserDTO(usuario.get().getUsername(), usuario.get().getId(),
                    usuario.get().getPassword(), usuario.get().getRole(), usuario.get().getEmail(),
                    usuario.get().getDireccion(),
                    usuario.get().getLatitud(), usuario.get().getLongitud(),
                    usuario.get().getFotoUrl(), lifestyleDTO, usuario.get().getIdComunidad(),usuario.get().getComunidadesGuardadas());

            return ResponseEntity.status(HttpStatus.OK).body(userDto);
        }

        return ResponseEntity.ofNullable("Error en la consulta del usuario");

    }

    @PostMapping("/completarPerfil")
    public ResponseEntity<?> completarPerfil(@RequestBody DatosPerfilDTO datos, Authentication auth) {
        String username = auth.getName();
        userService.completarPerfil(username, datos);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/modificarDireccion/{idUser}")
    public ResponseEntity<?> modificarDireccion(@PathVariable Long idUser,
    @RequestBody Map<String, Object> payload) {
        try {
            String direccion = (String) payload.get("direccion");
            Double latitud = payload.get("latitud") instanceof Number 
                ? ((Number) payload.get("latitud")).doubleValue() 
                : null;
            Double longitud = payload.get("longitud") instanceof Number 
                ? ((Number) payload.get("longitud")).doubleValue() 
                : null;

            if (direccion == null || latitud == null || longitud == null) {
                return ResponseEntity.badRequest().body("Faltan campos obligatorios");
            }

            userService.actualizarDireccionUsuario(idUser, direccion, latitud, longitud);

            return ResponseEntity.ok("Dirección actualizada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al modificar la dirección: " + e.getMessage());
        }
    }

    @PostMapping("/addComunidadGuardada/{userId}/{idComunidad}")
    public ResponseEntity<?> addComunidad(@PathVariable Long userId,@PathVariable Long idComunidad){
        try{
            userService.addComunidadGuardada(userId, idComunidad);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }catch (Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
    @PostMapping("/removeComunidadGuardada/{userId}/{idComunidad}")
    public ResponseEntity<?> removeComunidad(@PathVariable Long userId,@PathVariable Long idComunidad){
        try{
            userService.eliminarComunidadGuardada(userId, idComunidad);
            return ResponseEntity.status(HttpStatus.OK).body(null);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);    
        }
    }

    @GetMapping("/obtenerComunidadesGuardadas/{userId}")
    public ResponseEntity<?> obtenerComunidadesGuardadas(@PathVariable Long userId){
        try{
            List<Long> lista = userService.obtenerComunidadesGuardadas(userId);
            return ResponseEntity.status(HttpStatus.OK).body(lista);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);    
        }

    }

    @GetMapping("/obtenerUsuariosPorComunidad/{idComunidad}")
    public ResponseEntity<?> obtenerUsuariosPorComunidad(@PathVariable Long idComunidad){
        try{
            List<UserDTO> usuarios = userService.obtenerUsuariosComunidad(idComunidad);
            return ResponseEntity.status(HttpStatus.OK).body(usuarios);
        }catch(Exception e){
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

}