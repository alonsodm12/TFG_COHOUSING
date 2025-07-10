package com.gestioncomunidades.demo.DTOs;

import java.util.List;

public record NotificacionRepartoDTO(
    Long comunidadId,
    String nombreComunidad,
    String mensaje,
    List<Long> idUsuarios
) {}