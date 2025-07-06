package com.gestioncomunidades.demo.DTOs;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.gestioncomunidades.demo.models.EstadoTarea;

public record TareaDTO (
    Long id,
    String titulo,
    String descripcion,
    List<Long> usuariosParticipantes,
    LocalDateTime fechaTope,
    EstadoTarea estado,
    Double duracion,
    Long idComunidad,
    int numParticipantes,
    String asignacion
    
) {}
