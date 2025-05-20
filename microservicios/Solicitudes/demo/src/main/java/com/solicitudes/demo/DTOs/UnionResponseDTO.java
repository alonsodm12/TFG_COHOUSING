package com.solicitudes.demo.DTOs;

import java.io.Serializable;

public record UnionResponseDTO (Long userId, Long comunidadId, boolean aceptado, String descripcion) implements Serializable{
    
}
