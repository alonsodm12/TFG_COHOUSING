package com.gestioncomunidades.demo.DTOs;

import java.util.Date;
import java.util.List;

import com.gestioncomunidades.demo.models.EstadoTarea;

public record TareaDTO (
    String titulo,
    String descripcion,
    List<Long> usuariosParticipantes,
    Date fechaTope,
    EstadoTarea estado,
    Double duracion,
    Long idComunidad,
    int numParticipantes
    
) {}
