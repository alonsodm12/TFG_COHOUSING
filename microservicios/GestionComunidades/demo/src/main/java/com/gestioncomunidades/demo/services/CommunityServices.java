package com.gestioncomunidades.demo.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.gestioncomunidades.demo.DTOs.CommunityDTO;
import com.gestioncomunidades.demo.DTOs.LifestyleDTO;
import com.gestioncomunidades.demo.models.Community;
import com.gestioncomunidades.demo.repository.CommunityRepository;

@Service
public class CommunityServices {

    private CommunityRepository communityRepository;

    public CommunityServices(CommunityRepository communityRepository) {
        this.communityRepository = communityRepository;
    }

    public Community registrarComunidad(CommunityDTO communityDTO) throws Exception {
        
        Community nuevaComunidad = new Community(communityDTO.name(), communityDTO.descripcion(),communityDTO.idAdmin(),
        communityDTO.lifestyleDTO().sociabilidad(),
        communityDTO.lifestyleDTO().tranquilidad(),
        communityDTO.lifestyleDTO().compartirEspacios(),
        communityDTO.lifestyleDTO().limpieza(),
        communityDTO.lifestyleDTO().actividad());
        
        if (communityDTO.integrantes() != null && !communityDTO.integrantes().isEmpty()) {
        List<Long> integrantes = new ArrayList<>();
        for (Long id : communityDTO.integrantes()) {
            integrantes.add(id);
        }
        nuevaComunidad.setIntegrantes(integrantes);
        }
        return communityRepository.save(nuevaComunidad);

    }

    public Optional<CommunityDTO> obtenerComunidad(String communityname) {
        Optional<Community> comunidad = communityRepository.findByName(communityname);

        if (comunidad.isPresent()) {
            Community community = comunidad.get();

            // Convertimos manualmente la entidad Community a CommunityDTO
            LifestyleDTO lifestyleDTO = new LifestyleDTO(
                community.getSociabilidad(),
                community.getTranquilidad(),
                community.getCompartirEspacios(),
                community.getLimpieza(),
                community.getActividad()
            );

            // Convertir Community a CommunityDTO manualmente
            CommunityDTO communityDTO = new CommunityDTO(
                community.getName(),
                community.getDescripcion(),
                community.getIdAdmin(),
                lifestyleDTO,
                community.getIntegrantes()
            );

            // Devuelve el DTO envuelto en un Optional
            return Optional.of(communityDTO);
        } else {
            return Optional.empty();
        }
    }

    public List<Community> obtenerComunidades() {
    List<Community> comunidades = communityRepository.findAll();

    return comunidades;
}

    public Optional<Community> modificarCommunity(String communityName, CommunityDTO communityDTO) {
        Community comunidad = communityRepository.findByName(communityName)
                .orElseThrow(() -> new RuntimeException("Comunidad no encontrada"));

        if (communityDTO.name() != null)
            comunidad.setName(communityDTO.name());
        if (communityDTO.descripcion() != null)
            comunidad.setDescripcion(communityDTO.descripcion());

        if (communityDTO.lifestyleDTO() != null) {
            if (communityDTO.lifestyleDTO().actividad() != 0)
                comunidad.setActividad(communityDTO.lifestyleDTO().actividad());
            if (communityDTO.lifestyleDTO().compartirEspacios() != 0)
                comunidad.setCompartirEspacios(communityDTO.lifestyleDTO().compartirEspacios());
            if (communityDTO.lifestyleDTO().limpieza() != 0)
                comunidad.setLimpieza(communityDTO.lifestyleDTO().limpieza());
            if (communityDTO.lifestyleDTO().sociabilidad() != 0)
                comunidad.setSociabilidad(communityDTO.lifestyleDTO().sociabilidad());
            if (communityDTO.lifestyleDTO().tranquilidad() != 0)
                comunidad.setTranquilidad(communityDTO.lifestyleDTO().tranquilidad());
        }

        Community communityUpdate = communityRepository.save(comunidad);
        return Optional.of(communityUpdate);

    }

    public void deleteCommunity(String communityName) throws Exception {
        Optional<Community> communityOptional = communityRepository.findByName(communityName);

        if (communityOptional.isPresent())
            communityRepository.delete(communityOptional.get());
        else {
            throw new Exception("Comunidad no existe");
        }
    }

}
