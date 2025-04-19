package com.gestionusuarios.demo.DTOs;

import jakarta.validation.constraints.NotBlank;

public record LifestyleDTO(

        @NotBlank(message = "El grado de tranquilidad es obligatorio") int tranquilidad,

        @NotBlank(message = "El grado de actividad es obligatorio") int actividad,

        @NotBlank(message = "El grado de limpieza es obligatorio") int limpieza,

        @NotBlank(message = "CompartirEspacios no puede estar vacío") int compartirEspacios,

        @NotBlank(message = "El grado de sociabilidad no puede estar vacío") int sociabilidad) {
}