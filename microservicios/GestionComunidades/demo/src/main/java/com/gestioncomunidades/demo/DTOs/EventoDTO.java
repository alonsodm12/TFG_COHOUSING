package com.gestioncomunidades.demo.DTOs;

import java.time.LocalDateTime;
import java.util.List;


public record EventoDTO (
    Long id,
    String titulo,
    String descripcion,
    List<Long> usuariosParticipantes,
    LocalDateTime fechaTope,
    String lugar,
    Double horaInicio,
    Double horaFinal,
    Long idComunidad,
    int numParticipantes

){
    
}

