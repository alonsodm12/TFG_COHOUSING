package com.solicitudes.controller;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.web.servlet.MockMvc;

import com.solicitudes.demo.DemoApplication;
import com.solicitudes.demo.models.Solicitud;
import com.solicitudes.demo.repository.SolicitudesRepository;

@SpringBootTest(classes = DemoApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
public class SolicitudesControllerTest {
    
    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private SolicitudesRepository solicitudesRepository;

    @Test
    void testGetSolicitudById() throws Exception {
        Solicitud prueba = new Solicitud();
        prueba.setId(1L);
        prueba.setUserId(1L);
        prueba.setUserOrigenId(1L);
        prueba.setDescripcion("Probando");
        prueba.setCommunityId(1L);
        prueba.setTipo("compleja");

        // cuando el servicio llame al repo, devolverá esta solicitud
        Mockito.when(solicitudesRepository.findById(1L)).thenReturn(Optional.of(prueba)); 

        mockMvc.perform(get("/solicitudes/1"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$.id").value(1));
    }

    @Test
    void testGetSolicitudesUsuario() throws Exception {
        Solicitud prueba = new Solicitud();
        prueba.setId(1L);
        prueba.setUserId(1L);

        Mockito.when(solicitudesRepository.findByUserId(1L)) // o el método real que uses
               .thenReturn(Optional.of(List.of(prueba)));

        mockMvc.perform(get("/solicitudes/usuario/1"))
               .andExpect(status().isOk())
               .andExpect(jsonPath("$[0].userId").value(1));
    }
}
