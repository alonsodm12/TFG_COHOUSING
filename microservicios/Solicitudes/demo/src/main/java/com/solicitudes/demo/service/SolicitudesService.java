package com.solicitudes.demo.service;

import java.time.LocalDateTime;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
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
}
