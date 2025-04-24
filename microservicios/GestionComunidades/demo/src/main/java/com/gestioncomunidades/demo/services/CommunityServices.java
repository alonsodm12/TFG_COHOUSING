package com.gestioncomunidades.demo.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.gestioncomunidades.demo.DTOs.CommunityDTO;
import com.gestioncomunidades.demo.mappers.CommunityMapper;
import com.gestioncomunidades.demo.models.Community;
import com.gestioncomunidades.demo.repository.CommunityRepository;

@Service
public class CommunityServices {
    
    private CommunityRepository communityRepository;
    private final CommunityMapper communityMapper;

    public CommunityServices(CommunityRepository communityRepository, CommunityMapper communityMapper){
        this.communityRepository = communityRepository;
        this.communityMapper = communityMapper;
    }

    public Community registrarComunidad(CommunityDTO communityDTO) throws Exception{
        Community nuevaComunidad = communityMapper.toEntity(communityDTO);
        return communityRepository.save(nuevaComunidad);
    }

    public Optional<List<Community>> obtenerComunidades(){
        List<Community> comunidades = communityRepository.findAll();

        if(comunidades.size() != 0)
            return Optional.of(comunidades);
        
        return Optional.empty(); 
        
    }

    public Optional<Community> modificarCommunity(String communityName, CommunityDTO communityDTO){
        Community comunidad = communityRepository.findByCommunityName(communityName).orElseThrow(() -> new RuntimeException("Comunidad no encontrada"));

        if (communityDTO.name() != null) comunidad.setName(communityDTO.name());
        if (communityDTO.descripcion() != null) comunidad.setDescription(communityDTO.descripcion());
        
        if (communityDTO.lifestyleDTO() != null) {
            if (communityDTO.lifestyleDTO().actividad() != 0) comunidad.setActividad(communityDTO.lifestyleDTO().actividad());
            if (communityDTO.lifestyleDTO().compartirEspacios() != 0) comunidad.setCompartirEspacios(communityDTO.lifestyleDTO().compartirEspacios());
            if (communityDTO.lifestyleDTO().limpieza() != 0) comunidad.setLimpieza(communityDTO.lifestyleDTO().limpieza());
            if (communityDTO.lifestyleDTO().sociabilidad() != 0) comunidad.setSociabilidad(communityDTO.lifestyleDTO().sociabilidad());
            if (communityDTO.lifestyleDTO().tranquilidad() != 0) comunidad.setTranquilidad(communityDTO.lifestyleDTO().tranquilidad());
        }

        Community communityUpdate = communityRepository.save(comunidad);
        return Optional.of(communityUpdate);

    }

    public void deleteCommunity(String communityName){
        Optional<Community> communityOptional = communityRepository.findByCommunityName(communityName);

        if (communityOptional.isPresent())
            communityRepository.delete(communityOptional.get());
        else {
            throw new Exception("Comunidad no existe");
        }
    }

}
