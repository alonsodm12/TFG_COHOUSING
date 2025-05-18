package com.gestioncomunidades.demo.services;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;

import com.gestioncomunidades.demo.DTOs.CommunityDTO;
import com.gestioncomunidades.demo.DTOs.LifestyleDTO;
import com.gestioncomunidades.demo.DTOs.UnionRequestDTO;
import com.gestioncomunidades.demo.config.RabbitMQConfig;
import com.gestioncomunidades.demo.models.Community;
import com.gestioncomunidades.demo.repository.CommunityRepository;

/*
 * Clase servicio con la logica de negocio de las comunidades
 */

@Service
public class CommunityServices {

    private CommunityRepository communityRepository;

    private RabbitTemplate rabbitTemplate;

    public CommunityServices(CommunityRepository communityRepository, RabbitTemplate rabbitTemplate) {
        this.communityRepository = communityRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    /*
     * registrarComunidad(CommunityDTO)
     * 
     * Logica de negocio para registrar una Comunidad
     * Devuelve la comunidad creada
     * 
     */
    public Community registrarComunidad(CommunityDTO communityDTO) throws Exception {

        Community nuevaComunidad = new Community(communityDTO.name(), communityDTO.descripcion(),
                communityDTO.idAdmin(),
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

    /*
     * obtenerComunidadName(communityName)
     * 
     * Permite obtener una comunidad a partir de su nombre identificador
     * Devuelve la comunidad buscada
     * 
     */
    public Optional<CommunityDTO> obtenerComunidadName(String communityname) {
        Optional<Community> comunidad = communityRepository.findByName(communityname);

        if (comunidad.isPresent()) {
            Community community = comunidad.get();

            // Convertimos manualmente la entidad Community a CommunityDTO
            LifestyleDTO lifestyleDTO = new LifestyleDTO(
                    community.getSociabilidad(),
                    community.getTranquilidad(),
                    community.getCompartirEspacios(),
                    community.getLimpieza(),
                    community.getActividad());

            // Convertir Community a CommunityDTO manualmente
            CommunityDTO communityDTO = new CommunityDTO(
                    community.getName(),
                    community.getDescripcion(),
                    community.getIdAdmin(),
                    lifestyleDTO,
                    community.getIntegrantes());

            // Devuelve el DTO envuelto en un Optional
            return Optional.of(communityDTO);
        } else {
            return Optional.empty();
        }
    }

    /*
     * obtenerComunidadId(communityId)
     * 
     * Permite obtener una comunidad a partir de su id identificador
     * Devuelve la comunidad buscada
     * 
     */
    public Optional<CommunityDTO> obtenerComunidadId(Long communityId) {
        Optional<Community> comunidad = communityRepository.findById(communityId);

        if (comunidad.isPresent()) {
            Community community = comunidad.get();

            // Convertimos manualmente la entidad Community a CommunityDTO
            LifestyleDTO lifestyleDTO = new LifestyleDTO(
                    community.getSociabilidad(),
                    community.getTranquilidad(),
                    community.getCompartirEspacios(),
                    community.getLimpieza(),
                    community.getActividad());

            // Convertir Community a CommunityDTO manualmente
            CommunityDTO communityDTO = new CommunityDTO(
                    community.getName(),
                    community.getDescripcion(),
                    community.getIdAdmin(),
                    lifestyleDTO,
                    community.getIntegrantes());

            // Devuelve el DTO envuelto en un Optional
            return Optional.of(communityDTO);
        } else {
            return Optional.empty();
        }
    }

    /*
     * obtieneComunidades()
     * 
     * Permite obtener una lista con todas las comunidades en el sistema
     * Devuelve una lista de comunidades
     * 
     */
    public List<Community> obtenerComunidades() {
        List<Community> comunidades = communityRepository.findAll();

        return comunidades;
    }

    /*
     * modificarCommunity(communityName, communityDTO)
     * 
     * Permite modificar los datos de una comunidad por unos nuevos presentes
     * en el DTO
     * 
     * Devuelve la comunidad modificada
     * 
     */

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

    /*
     * deleteCommunity(communityName)
     * 
     * Permite eliminar la comunidad cuyo nombre se ha especificado
     * Devuelve void
     * 
     */

    public void deleteCommunity(String communityName) throws Exception {
        Optional<Community> communityOptional = communityRepository.findByName(communityName);

        if (communityOptional.isPresent())
            communityRepository.delete(communityOptional.get());
        else {
            throw new Exception("Comunidad no existe");
        }
    }

    /*
     * procesarUnion(UnionRequestDTO)
     * 
     * Permite procesar una solicitud de union a una comunidad
     * Interviene RabbitMQ
     * 
     * Devuelve la comunidad buscada
     * 
     */

    public void procesarUnion(UnionRequestDTO requestDTO) {
        try{
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, requestDTO);
        }
        catch (AmqpException e){
            throw new RuntimeException("Error al enviar la solicitud a la cola",e);
        }
        
    }

}
