package com.gestioncomunidades.demo.DTOs;

import jakarta.validation.constraints.NotBlank;

public record CommunityDTO(
    @NotBlank(message = "El nombre de la comunidad no puede estar vacio") String name,
    @NotBlank(message = "La descripcion de la comunidad no puede estar vacia") String descripcion,
    @NotBlank(message = "El admin no puede estar vacía") Long idAdmin,
    LifestyleDTO lifestyleDTO
) {
}