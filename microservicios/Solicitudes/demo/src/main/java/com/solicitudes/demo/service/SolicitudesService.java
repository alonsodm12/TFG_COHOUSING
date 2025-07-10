package com.solicitudes.demo.service;

import java.util.List;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.solicitudes.demo.DTOs.NotificacionRepartoDTO;
import com.solicitudes.demo.DTOs.UnionRequestDTO;
import com.solicitudes.demo.DTOs.UnionResponseDTO;
import com.solicitudes.demo.configuration.RabbitMQConfig;
import com.solicitudes.demo.models.Solicitud;
import com.solicitudes.demo.repository.SolicitudesRepository;


import jakarta.transaction.Transactional;

@Service
public class SolicitudesService {

    private final SolicitudesRepository solicitudesRepository;
    private final RabbitTemplate rabbitTemplate;


    public SolicitudesService(SolicitudesRepository solicitudesRepository,
            RabbitTemplate rabbitTemplate) {
        this.solicitudesRepository = solicitudesRepository;
        this.rabbitTemplate = rabbitTemplate;

    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void solicitudUnionComunidad(UnionRequestDTO unionRequestDTO) {
        System.out.println("🐰 Recibida solicitud por RabbitMQ");
        guardarRespuestaUnion(unionRequestDTO.idAdmin(),unionRequestDTO.communityId(),unionRequestDTO.userId(),
                "El usuario: " + unionRequestDTO.username() + " ha solicitado unirse a tu comunidad");
        System.out.println("✅ Mensaje procesado correctamente");
    }

    @RabbitListener(queues = RabbitMQConfig.REPARTO_TAREAS_QUEUE)
    public void crearSolicitudesTareas(NotificacionRepartoDTO notificacionRepartoDTO){
        System.out.println("Recibida solicitud por RabbitMQ");
        for (Long usuario : notificacionRepartoDTO.idUsuarios()){
            guardarRespuesta(usuario, notificacionRepartoDTO.comunidadId(), "¡Se ha realizado el reparto semanal de tareas!");
        }
    }


    public ResponseEntity<?> obtenerSolicitudesUsuario(Long userId) {
        List<Solicitud> solicitudes = solicitudesRepository.findByUserId(userId).get();
        if (solicitudes.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("No hay solicitudes para este usuario");
        } else {
            return ResponseEntity.ok(solicitudes);
        }
    }

    public ResponseEntity<?> obtenerSolicitudPorId(Long id) {
        Solicitud solicitud = solicitudesRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,
                        "No hay solicitudes para este usuario"));

        return ResponseEntity.ok(solicitud);
    }

    public ResponseEntity<?> obtenerTodasLasSolicitudes() {
        List<Solicitud> solicitudes = solicitudesRepository.findAll();
        return ResponseEntity.ok(solicitudes);
    }

    @Transactional
    public ResponseEntity<?> aceptarSolicitudUnion(Long id) {
        try {
            Solicitud solicitud = solicitudesRepository.findById(id).get();

            String mensaje = "¡Enhorabuena! Tu solicitud para unirte a la comunidad "
                    + " ha sido aceptada.";

            guardarRespuesta(solicitud.getUserOrigenId(),solicitud.getCommunityId(), mensaje);

            UnionResponseDTO response = new UnionResponseDTO(
                    solicitud.getUserOrigenId(),
                    solicitud.getCommunityId(),
                    true,
                    "¡Enhorabuena! Has sido aceptado en la comunidad.");

            rabbitTemplate.convertAndSend(
                    RabbitMQConfig.EXCHANGE_NAME,
                    "comunidad.response",
                    response);

            solicitudesRepository.deleteById(id);


            return ResponseEntity.ok("✅ Solicitud aceptada correctamente.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al aceptar la solicitud: " + e.getMessage());
        }
    }

    @Transactional
    public ResponseEntity<?> rechazarSolicitudUnion(Long id) {
        try {
            Solicitud solicitud = solicitudesRepository.findById(id).get();

            String mensaje = "Tu solicitud para unirte a la comunidad " + solicitud.getCommunityId()
                    + " ha sido rechazada.";
            guardarRespuesta(solicitud.getUserId(),solicitud.getCommunityId(), mensaje);

            solicitudesRepository.deleteById(id);
            return ResponseEntity.ok("✅ Solicitud rechazada correctamente.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al rechazar la solicitud: " + e.getMessage());
        }
    }

    public ResponseEntity<?> eliminarSolicitud(Long id){
        try{
            solicitudesRepository.deleteById(id);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body("Se elimino la solicitud");
        }
        catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("No se pudo eliminar la solicitud");
        }
    }


    private void guardarRespuesta(Long destinoUserId,Long communityId, String mensaje) {
        Solicitud respuesta = new Solicitud();
        respuesta.setUserId(destinoUserId);
        respuesta.setDescripcion(mensaje);
        respuesta.setCommunityId(communityId);
        respuesta.setTipo("basica");
        solicitudesRepository.save(respuesta);
    }


    private void guardarRespuestaUnion(Long destinoUserId,Long communityId,Long origenUserId,String mensaje) {
        Solicitud respuesta = new Solicitud();
        respuesta.setUserId(destinoUserId);
        respuesta.setUserOrigenId(origenUserId);
        respuesta.setDescripcion(mensaje);
        respuesta.setCommunityId(communityId);
        respuesta.setTipo("compleja");
        solicitudesRepository.save(respuesta);
    }
}
