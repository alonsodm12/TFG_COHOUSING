package com.gestioncomunidades.demo.service;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.mockito.junit.jupiter.MockitoExtension;

import com.gestioncomunidades.demo.DTOs.CommunityDTO;
import com.gestioncomunidades.demo.DTOs.LifestyleDTO;
import com.gestioncomunidades.demo.models.Community;
import com.gestioncomunidades.demo.repository.CommunityRepository;
import com.gestioncomunidades.demo.services.CommunityServices;

@ExtendWith(MockitoExtension.class)
public class CommunityServiceTest {
    
    @Mock
    private CommunityRepository communityRepository;

    @InjectMocks
    private CommunityServices communityService;

    @BeforeEach
    void setUp(){
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void encontrarPorNombre() {
        // Crear la comunidad de ejemplo
        Community miComunidad = new Community(
            "Comunidad Verde",
            "Una comunidad tranquila y colaborativa",
            1L,
            8,
            9,
            7,
            10,
            6,
            "https://example.com/foto.jpg",
            40.4168,
            -3.7038,
            "Calle Falsa 123, Madrid",
            450.0,
            12
        );

        // Mockear el repository
        when(communityRepository.findByName("Comunidad Verde"))
            .thenReturn(Optional.of(miComunidad));

        // Llamar al método del service
        CommunityDTO resultado = communityService.obtenerComunidadName("Comunidad Verde").get();

        // Verificar
        assertNotNull(resultado);
        assertEquals("Comunidad Verde", resultado.name());
        assertEquals("Una comunidad tranquila y colaborativa", resultado.descripcion());
    }

    @Test
    public void crearComunidad() throws Exception{

        LifestyleDTO lifestyleDTO = new LifestyleDTO(1, 1, 1, 1, 1);
        CommunityDTO dto = new CommunityDTO(1L,"EcoWarning","Comunidad preocupada con el medio ambiente",
        7L,lifestyleDTO,List.of(1L,4L),"https://foto",40.423,3.45,"Calle Falsa",300.45,2);
        
        when(communityRepository.save((Community) any()))
        .thenAnswer(invocation -> invocation.getArgument(0));

        Community comunidad = communityService.registrarComunidad(dto);
        
        assertEquals("EcoWarning", comunidad.getName());


    }
}
