package com.gestionusuarios.demo.DTOs;

import java.io.Serializable;

public record UpdateUserCommunityDTO(Long userId, Long comunidadId) implements Serializable {}
