package com.gestionusuarios.demo.DTOs;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserDTO(

        @NotBlank(message = "El nombre de usuario es obligatorio") @Size(min = 4, max = 20) String username,

        Long id,

        @NotBlank(message = "La contraseña es obligatoria") @Size(min = 6, message = "La contraseña debe tener un minimo de 8 caracteres") String password,

        @NotBlank(message = "El rol es obligatorio") String role,

        @NotBlank(message = "El correo es obligatorio") @Email(message = "Correo inválido") String email,

        String direccion,

        Double latitud,

        Double longitud,

        String fotoUrl,

        LifestyleDTO lifestyleDTO,
        
        Long idComunidad,
        
        List<Long> comunidadesGuardadas)

{
}
