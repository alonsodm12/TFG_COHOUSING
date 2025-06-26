package com.gestionusuarios.demo.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gestionusuarios.demo.DTOs.DatosPerfilDTO;
import com.gestionusuarios.demo.DTOs.UpdateUserCommunityDTO;
import com.gestionusuarios.demo.DTOs.UserDTO;
import com.gestionusuarios.demo.DTOs.UserUpdateDTO;
import com.gestionusuarios.demo.config.RabbitMQConfig;
import com.gestionusuarios.demo.models.User;
import com.gestionusuarios.demo.repository.UserRepository;

import jakarta.transaction.Transactional;

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

        User usuario = new User(userDTO.username(), userDTO.email(), codedPassword, userDTO.fotoUrl(),
                userDTO.latitud(), userDTO.longitud(), userDTO.direccion(), userDTO.role(),
                userDTO.lifestyleDTO().sociabilidad(), userDTO.lifestyleDTO().tranquilidad(),
                userDTO.lifestyleDTO().compartirEspacios(), userDTO.lifestyleDTO().limpieza(),
                userDTO.lifestyleDTO().actividad());

        return userRepository.save(usuario);
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

    public String guardarFoto(MultipartFile foto) {
        // Construimos un nombre único para evitar colisiones
        String filename = System.currentTimeMillis() + "_" + foto.getOriginalFilename();

        // Usamos la carpeta 'uploads' en el directorio home del usuario para evitar
        // problemas de permisos
        Path uploadsDir = Paths.get("/app/uploads/");

        // Ruta completa al archivo
        Path ruta = uploadsDir.resolve(filename);

        try {
            System.out.println("Guardando foto en: " + ruta.toAbsolutePath());

            // Creamos la carpeta uploads si no existe
            if (!Files.exists(uploadsDir)) {
                Files.createDirectories(uploadsDir);
                System.out.println("Carpeta uploads creada en: " + uploadsDir.toAbsolutePath());
            } else {
                System.out.println("Carpeta uploads ya existe");
            }

            // Guardamos el archivo
            foto.transferTo(ruta.toFile());

            // Devolvemos la ruta relativa para que puedas guardar en DB
            return "/uploads/" + filename;

        } catch (IOException e) {
            System.err.println("Error guardando la foto en: " + ruta.toAbsolutePath());
            e.printStackTrace();
            throw new RuntimeException("Error guardando la foto", e);
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

    public Optional<User> modificarUser(String username, UserUpdateDTO user) {
        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        if (user.username() != null)
            usuario.setUsername(user.username());
        if (user.email() != null)
            usuario.setEmail(user.email());
        if (user.password() != null)
            usuario.setPassword(user.password());
        if (user.role() != null)
            usuario.setRole(user.role());

        if (user.lifestyleDTO() != null) {
            if (user.lifestyleDTO().actividad() != 0)
                usuario.setActividad(user.lifestyleDTO().actividad());
            if (user.lifestyleDTO().compartirEspacios() != 0)
                usuario.setCompartirEspacios(user.lifestyleDTO().compartirEspacios());
            if (user.lifestyleDTO().limpieza() != 0)
                usuario.setLimpieza(user.lifestyleDTO().limpieza());
            if (user.lifestyleDTO().sociabilidad() != 0)
                usuario.setSociabilidad(user.lifestyleDTO().sociabilidad());
            if (user.lifestyleDTO().tranquilidad() != 0)
                usuario.setTranquilidad(user.lifestyleDTO().tranquilidad());
        }

        if (user.idComunidad() != null) {
            usuario.setIdComunidad(user.idComunidad());
        }

        User usuarioUpdate = userRepository.save(usuario);
        return Optional.of(usuarioUpdate);
    }

    public Optional<User> addCommunityId(String username, Long idAdmin) {
        User usuario = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        
        usuario.setIdComunidad(idAdmin);

        User usuarioUpdate = userRepository.save(usuario);
        return Optional.of(usuarioUpdate);
    }

    public Optional<User> findByUsername(String username) {

        Optional<User> usuario = userRepository.findByUsername(username);

        if (usuario.isPresent()) {
            return usuario;
        } else {
            return Optional.empty();
        }

    }

    @Transactional
    @RabbitListener(queues = RabbitMQConfig.USER_COMMUNITY_UPDATE_QUEUE)
    public void recibirRespuestaUnion(UpdateUserCommunityDTO payload) {
        Long userId = payload.userId();
        Long comunidadId = payload.comunidadId();

        Optional<User> usuario = userRepository.findById(userId);
        if (usuario.isPresent()) {
            User usuarioUnir = usuario.get();
            usuarioUnir.setIdComunidad(comunidadId);
            userRepository.save(usuarioUnir);
            System.out.println("Usuario actualizado a su nueva comunidad");
        } else {
            System.out.println("Error uniendo al usuario a la comunidad");
        }
    }

    public User findOrCreateUsuario(String email, String name) {
        return userRepository.findByEmail(email)
                .orElseGet(() -> {
                    User nuevo = new User();
                    nuevo.setEmail(email);
                    nuevo.setUsername(name);
                    nuevo.setRole(""); // o el rol que quieras por defecto
                    return userRepository.save(nuevo);
                });
    }

        public User completarPerfil(String email, DatosPerfilDTO datosPerfil) {
        Optional<User> optionalUser = userRepository.findByEmail(email);

        if (optionalUser.isEmpty()) {
            throw new RuntimeException("Usuario no encontrado con email: " + email);
        }

        User user = optionalUser.get();
        user.setDireccion(datosPerfil.getDireccion());
        user.setLatitud(datosPerfil.getLatitud());
        user.setLongitud(datosPerfil.getLongitud());
        user.setLimpieza(datosPerfil.getLimpieza());
        user.setCompartirEspacios(datosPerfil.getCompartirEspacios());
        user.setActividad(datosPerfil.getActividad());
        user.setTranquilidad(datosPerfil.getTranquilidad());
        user.setSociabilidad(datosPerfil.getSociabilidad());

        return userRepository.save(user);
    }
    public void actualizarDireccionUsuario(Long idUser, String direccion, Double latitud, Double longitud) {
        User usuario = userRepository.findById(idUser)
            .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));

        usuario.setDireccion(direccion);
        usuario.setLatitud(latitud);
        usuario.setLongitud(longitud);

        userRepository.save(usuario);
    }
}