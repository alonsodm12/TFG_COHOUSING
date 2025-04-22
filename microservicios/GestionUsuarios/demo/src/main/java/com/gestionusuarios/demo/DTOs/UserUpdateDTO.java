package com.gestionusuarios.demo.DTOs;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Size;

public record UserUpdateDTO(

        @Size(min = 4, max = 20) String username,

        @Size(min = 6, message = "La contraseña debe tener un minimo de 8 caracteres") String password,

        String role,

        @Email(message = "Correo inválido") String email,

        LifestyleUpdateDTO lifestyleDTO)

{
}
