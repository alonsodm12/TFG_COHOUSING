package com.gestioncomunidades.demo.DTOs;

import java.io.Serializable;

public record UpdateUserCommunityDTO(Long userId, Long comunidadId) implements Serializable {}
