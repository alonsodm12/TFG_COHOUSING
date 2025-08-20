package com.solicitudes.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.solicitudes.demo.DTOs.UnionResponseDTO;
import com.solicitudes.demo.configuration.RabbitMQConfig;
import com.solicitudes.demo.models.Solicitud;
import com.solicitudes.demo.repository.SolicitudesRepository;
import com.solicitudes.demo.service.SolicitudesService;

@ExtendWith(MockitoExtension.class)
public class SolicitudesServiceTest {

    @Mock
    SolicitudesRepository solicitudesRepository;
    @Mock
    private RabbitTemplate rabbitTemplate;
    @InjectMocks
    SolicitudesService solicitudesService;

    @Test
    void testGetSolicitudesUsuario() {
        Long userId = 1L;
        Solicitud prueba = new Solicitud();
        prueba.setUserId(1L);
        prueba.setUserOrigenId(1L);
        prueba.setDescripcion("Probando");
        prueba.setCommunityId(1L);
        prueba.setTipo("compleja");
        List<Solicitud> mockSolicitudes = List.of(prueba);
        
        Mockito.when(solicitudesRepository.findByUserId(userId))
               .thenReturn(Optional.of(mockSolicitudes));

        ResponseEntity<?> result = solicitudesService.obtenerSolicitudesUsuario(userId);
        Object solucion = result.getBody();
        List<Solicitud> respuestas = (List<Solicitud>) solucion;

        
        assertEquals(1, respuestas.size());
        assertEquals(userId, respuestas.get(0).getUserId());
    }

    @Test
    void testDeleteSolicitudes() {
                Long solicitudId = 1L;
        Solicitud prueba = new Solicitud();
        prueba.setId(solicitudId);
        prueba.setUserId(1L);
        prueba.setUserOrigenId(1L);
        prueba.setDescripcion("Probando");
        prueba.setCommunityId(1L);
        prueba.setTipo("compleja");

        solicitudesService.eliminarSolicitud(solicitudId);
        Mockito.verify(solicitudesRepository, Mockito.times(1))
               .deleteById(solicitudId);
    }

    @Test
    void testAceptarSolicitudUnion() {
        
        Long solicitudId = 1L;
        Solicitud solicitud = new Solicitud();
        solicitud.setId(solicitudId);
        solicitud.setUserOrigenId(10L);
        solicitud.setCommunityId(20L);

        Mockito.when(solicitudesRepository.findById(solicitudId))
               .thenReturn(Optional.of(solicitud));

        ResponseEntity<?> response = solicitudesService.aceptarSolicitudUnion(solicitudId);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertTrue(response.getBody().toString().contains("Solicitud aceptada"));

        // Verifico que se haya enviado mensaje a RabbitMQ
        Mockito.verify(rabbitTemplate, Mockito.times(1))
               .convertAndSend(Mockito.eq(RabbitMQConfig.EXCHANGE_NAME),
                               Mockito.eq("comunidad.response"),
                               Mockito.any(UnionResponseDTO.class));

        // Verifico que se haya eliminado la solicitud
        Mockito.verify(solicitudesRepository, Mockito.times(1)).deleteById(solicitudId);
    }
}
