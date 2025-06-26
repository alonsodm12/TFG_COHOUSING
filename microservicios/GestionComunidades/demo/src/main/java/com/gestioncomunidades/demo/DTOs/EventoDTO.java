package com.gestioncomunidades.demo.DTOs;

import java.util.Date;
import java.util.List;


public record EventoDTO (
    Long id,
    String titulo,
    String descripcion,
    List<Long> usuariosParticipantes,
    Date fechaTope,
    String lugar,
    Double horaInicio,
    Double horaFinal,
    Long idComunidad,
    int numParticipantes

){
    
}

