package com.gestioncomunidades.demo.DTOs;

import java.util.List;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public record CommunityDTO(
    @NotNull(message = "El nombre de la comunidad no puede estar vacio") String name,
    @NotBlank(message = "La descripcion de la comunidad no puede estar vacia") String descripcion,
    @NotNull(message = "El admin no puede estar vacio") Long idAdmin,
    LifestyleDTO lifestyleDTO,
    List<Long> integrantes

) {
}
