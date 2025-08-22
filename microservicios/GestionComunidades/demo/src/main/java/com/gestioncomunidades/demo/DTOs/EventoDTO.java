package com.gestioncomunidades.demo.DTOs;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;


public record EventoDTO (
    Long id,
    String titulo,
    String descripcion,
    List<Long> usuariosParticipantes,
    LocalDateTime fechaTope,
    String lugar,
    LocalTime horaInicio,
    LocalTime horaFinal,
    Long idComunidad,
    int numParticipantes

){
    
}

