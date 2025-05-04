package com.gestioncomunidades.demo.DTOs;

import jakarta.validation.constraints.NotNull;

public record LifestyleDTO(
        @NotNull(message = "El grado de sociabilidad no puede ser nulo") int sociabilidad,
        
        @NotNull(message = "El grado de tranquilidad no puede ser nulo") int tranquilidad,
        
        @NotNull(message = "El grado de compartir espacios no puede ser nulo") int compartirEspacios,
        
        @NotNull(message = "El grado de limpieza no puede ser nulo") int limpieza,
        
        @NotNull(message = "El grado de actividad no puede ser nulo") int actividad 
) 
{
}
