package com.gestionusuarios.demo.DTOs;

import jakarta.validation.constraints.NotBlank;

public record LoginRequestDTO(
    @NotBlank
    String username,
    @NotBlank
    String password
) 
{}
