package com.solicitudes.demo.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.solicitudes.demo.DTOs.UnionRequestDTO;

import com.solicitudes.demo.configuration.RabbitMQConfig;
import com.solicitudes.demo.models.Solicitud;
import com.solicitudes.demo.repository.SolicitudesRepository;

@Service
public class SolicitudesService {

    private SolicitudesRepository solicitudesRepository;

    public SolicitudesService(SolicitudesRepository solicitudesRepository) {
        this.solicitudesRepository = solicitudesRepository;
    }

    @RabbitListener(queues = RabbitMQConfig.QUEUE_NAME)
    public void solicitudUnionComunidad(UnionRequestDTO unionRequestDTO) {
        Solicitud solicitud = new Solicitud();

        solicitud.setUserId(unionRequestDTO.userId());
        solicitud.setAdminId(unionRequestDTO.idAdmin());
        solicitud.setComunidadId(unionRequestDTO.communityId());
        solicitud.setFecha(LocalDateTime.now());
        solicitud.setEstado("PENDIENTE");
        solicitud.setDescripcion("El usuario " + unionRequestDTO.username() + "ha solicitado unirse a tu comunidad");

        solicitudesRepository.save(solicitud);

        System.out.println("Ha funcionado correctamente el rabbitmq: " + solicitud.getDescripcion());
    }

    public ResponseEntity<?> obtenerSolicitudPorId(Long id){
        Optional<Solicitud> solicitud = solicitudesRepository.findById(id);

        if(solicitud.isPresent())
            return ResponseEntity.ok(solicitud);
        else
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No hay solicitud con este id");
    }

    public ResponseEntity<?> obtenerSolicitudesUsuario(Long userId){
        List<Solicitud> solicitudes = solicitudesRepository.findByUserId(userId);

        if(solicitudes.isEmpty())
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("No hay solicitud con este id");
        else
            return ResponseEntity.ok(solicitudes);
        
    }

    public ResponseEntity<?> obtenerSolicitudes(){
        List<Solicitud> solicitudes = solicitudesRepository.findAll();
        return ResponseEntity.ok(solicitudes);
    }
}
