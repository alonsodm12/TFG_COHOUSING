package com.gestioncomunidades.demo.DTOs;

import java.io.Serializable;

public record UnionRequestDTO(
        Long userId,
        String username,
        Long communityId,
        Long idAdmin) implements Serializable {

}
