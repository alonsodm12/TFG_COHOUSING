package com.solicitudes.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.solicitudes.demo.DTOs.UnionRequestDTO;
import com.solicitudes.demo.DTOs.UnionResponseDTO;
import com.solicitudes.demo.configuration.RabbitMQConfig;
import com.solicitudes.demo.models.Solicitud;
import com.solicitudes.demo.models.SolicitudRespuesta;
import com.solicitudes.demo.repository.SolicitudRespuestaRepository;
import com.solicitudes.demo.repository.SolicitudesRepository;

@Service
public class SolicitudesService {

    private SolicitudesRepository solicitudesRepository;
    private SolicitudRespuestaRepository solicitudRespuestaRepository;
    private RabbitTemplate rabbitTemplate;

    public SolicitudesService(SolicitudesRepository solicitudesRepository,
            SolicitudRespuestaRepository solicitudRespuestaRepository,RabbitTemplate rabbitTemplate) {
        this.solicitudesRepository = solicitudesRepository;
        this.solicitudRespuestaRepository = solicitudRespuestaRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void solicitudUnionComunidad(UnionRequestDTO unionRequestDTO) {
        System.out.println("ENTRAAAAAAAAAAA");
        guardarRespuesta(unionRequestDTO.idAdmin(), "El usuario: "+ unionRequestDTO.username() + "ha solicitado unirse a tu comunidad");

        
        System.out.println("Ha funcionado correctamente rabbitmq");
        
        
    }

    public ResponseEntity<?> obtenerSolicitudPorId(Long id) {
        Optional<Solicitud> solicitud = solicitudesRepository.findById(id);

        if (solicitud.isPresent())
            return ResponseEntity.ok(solicitud);
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No hay solicitud con este id");
    }

    public ResponseEntity<?> obtenerSolicitudesUsuario(Long userId) {
        List<SolicitudRespuesta> solicitudes = solicitudRespuestaRepository.findByDestinoUserId(userId);

        if (solicitudes.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No hay solicitud con este id");
        else
            return ResponseEntity.ok(solicitudes);

    }

    public ResponseEntity<?> obtenerSolicitudes() {
        List<Solicitud> solicitudes = solicitudesRepository.findAll();
        return ResponseEntity.ok(solicitudes);
    }

    public ResponseEntity<?> aceptarSolicitudUnion(Long id) {
        try {
            Solicitud solicitud = obtenerSolicitudPendiente(id);

            solicitud.setEstado("ACEPTADA");
            solicitudesRepository.save(solicitud);

            // Crear mensaje informativo
            String mensaje = "Tu solicitud para unirte a la comunidad " + solicitud.getComunidadId()
                    + " ha sido aceptada.";
            guardarRespuesta(solicitud.getUserId(), mensaje);

            // Notificar al micro de comunidad
            UnionResponseDTO response = new UnionResponseDTO(
                    solicitud.getUserId(),
                    solicitud.getComunidadId(),
                    true,
                    "¡Enhorabuena! Has sido aceptado en la comunidad.");

            rabbitTemplate.convertAndSend(
                    RabbitMQConfig.EXCHANGE_NAME,
                    "comunidad.response",
                    response);

            return ResponseEntity.ok("✅ Solicitud aceptada correctamente.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al aceptar la solicitud: " + e.getMessage());
        }
    }

    public ResponseEntity<?> rechazarSolicitudUnion(Long id) {
        try {
            Solicitud solicitud = obtenerSolicitudPendiente(id);

            solicitud.setEstado("RECHAZADA");
            solicitudesRepository.save(solicitud);

            // Crear mensaje de rechazo
            String mensaje = "Tu solicitud para unirte a la comunidad " + solicitud.getComunidadId()
                    + " ha sido rechazada.";
            guardarRespuesta(solicitud.getUserId(), mensaje);

            return ResponseEntity.ok("✅ Solicitud rechazada correctamente.");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(" Error al rechazar la solicitud: " + e.getMessage());
        }
    }

    private Solicitud obtenerSolicitudPendiente(Long id) {
        Solicitud solicitud = solicitudesRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Solicitud no encontrada"));

        if (!"PENDIENTE".equalsIgnoreCase(solicitud.getEstado())) {
            throw new IllegalStateException("La solicitud ya ha sido procesada");
        }
        return solicitud;
    }

    private void guardarRespuesta(Long destinoUserId, String mensaje) {
        SolicitudRespuesta respuesta = new SolicitudRespuesta();
        respuesta.setDestinoUserId(destinoUserId);
        respuesta.setMensaje(mensaje);
        solicitudRespuestaRepository.save(respuesta);
    }
}
