package com.gestioncomunidades.demo.controller;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.mockito.Mockito.when;

import java.time.LocalDateTime;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.http.MediaType;

import com.gestioncomunidades.demo.DemoApplication;
import com.gestioncomunidades.demo.DTOs.TareaDTO;
import com.gestioncomunidades.demo.DTOs.UnionRequestDTO;
import com.gestioncomunidades.demo.models.EstadoTarea;
import com.gestioncomunidades.demo.services.CommunityServices;
import com.sendgrid.SendGrid;

@SpringBootTest(classes = DemoApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class CommunityControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CommunityServices communityServices;

    @MockBean
    private SendGrid sendGrid;

    @Test
    void unirseAComunidad_exito() throws Exception {
        doNothing().when(communityServices).procesarUnion(any(UnionRequestDTO.class));

        mockMvc.perform(post("/comunidades/unirse")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"comunidadId\":100,\"userId\":1}"))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("$.message").value("Solicitud de unión enviada exitosamente"));
    }

    @Test
    void unirseAComunidad_error() throws Exception {
        doThrow(new RuntimeException("Error")).when(communityServices).procesarUnion(any(UnionRequestDTO.class));

        mockMvc.perform(post("/comunidades/unirse")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"comunidadId\":100,\"userId\":1}"))
                .andExpect(status().isInternalServerError())
                .andExpect(jsonPath("$.error").value("No se pudo procesar la solicitud. Inténtalo más tarde."));
    }

    @Test
    void testObtenerTareas() throws Exception {
        TareaDTO task = new TareaDTO(
                1L,
                "TareaFalsa",
                "Tarea de prueba",
                List.of(2L, 5L),
                LocalDateTime.now().plusDays(7),
                EstadoTarea.EN_PROGRESO,
                2.5,
                4L,
                2,
                "AHORA");

        when(communityServices.obtenerTareasComunidad(1L)).thenReturn(List.of(task));

        mockMvc.perform(get("/comunidades/tareas/comunidad/1"))
                .andExpect(status().isAccepted())
                .andExpect(jsonPath("$[0].titulo").value("TareaFalsa"));
    }
}
