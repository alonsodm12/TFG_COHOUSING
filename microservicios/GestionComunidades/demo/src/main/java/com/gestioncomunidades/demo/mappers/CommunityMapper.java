package com.gestioncomunidades.demo.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import com.gestioncomunidades.demo.DTOs.CommunityDTO;
import com.gestioncomunidades.demo.models.Community;

@Mapper(componentModel = "spring")
public interface CommunityMapper {
    CommunityMapper INSTANCE = Mappers.getMapper(CommunityMapper.class);

    CommunityDTO toDto(Community community);

    Community toEntity(CommunityDTO dto);
    
}
