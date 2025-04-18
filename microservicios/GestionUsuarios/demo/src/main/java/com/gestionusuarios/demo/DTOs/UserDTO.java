package com.gestionusuarios.demo.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record UserDTO(

                @NotBlank(message = "El nombre de usuario es obligatorio") @Size(min = 4, max = 20) String username,

                @NotBlank(message = "La contraseña es obligatoria") @Size(min = 6, message = "La contraseña debe tener un minimo de 8 caracteres") String password,

                @NotBlank(message = "El rol es obligatorio") String role,

                @NotBlank(message = "El correo es obligatorio") @Email(message = "Correo inválido") String email,

                @NotBlank(message = "El grado de tranquilidad es obligatorio") int tranquilidad,

                @NotBlank(message = "El grado de actividad es obligatorio") int actividad,

                @NotBlank(message = "El grado de limpieza es obligatorio") int limpieza,

                @NotBlank(message = "CompartirEspacios no puede estar vacío") int compartirEspacios,

                @NotBlank(message = "El grado de sociabilidad no puede estar vacío") int sociabilidad) {
}
