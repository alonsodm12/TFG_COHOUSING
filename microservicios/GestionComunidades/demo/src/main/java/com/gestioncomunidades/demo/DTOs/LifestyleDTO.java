package com.gestioncomunidades.demo.DTOs;

import jakarta.validation.constraints.NotBlank;

public record LifestyleDTO(
        @NotBlank(message = "El grado de sociabilidad no puede ser nulo") int sociabilidad,
        
        @NotBlank(message = "El grado de tranquilidad no puede ser nulo") int tranquilidad,
        
        @NotBlank(message = "El grado de compartir espacios no puede ser nulo") int compartirEspacios,
        
        @NotBlank(message = "El grado de limpieza no puede ser nulo") int limpieza,
        
        @NotBlank(message = "El grado de actividad no puede ser nulo") int actividad 
        ) 
{
}
