package com.gestioncomunidades.demo.controllers;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.gestioncomunidades.demo.DTOs.CommunityDTO;
import com.gestioncomunidades.demo.models.Community;
import com.gestioncomunidades.demo.services.CommunityServices;

import io.swagger.v3.oas.annotations.parameters.RequestBody;

@Controller
@RequestMapping("/comunidades")
public class CommunityController {
    private CommunityServices communityServices;

    public CommunityController(CommunityServices communityServices) {
        this.communityServices = communityServices;
    }

    @GetMapping("/obtener")
    ResponseEntity<?> obtenerComunidadesDisponibles() {
        List<Community> comunidades = communityServices.obtenerComunidades().get();
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("Comunidades", comunidades.toString()));
    }

    @PostMapping("/comunidad")
    ResponseEntity<?> crearComunidad(CommunityDTO communityDTO) {
        try {
            Community comunidad = communityServices.registrarComunidad(communityDTO);
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(Map.of("Comunidad creada con exito: ", comunidad.getId().toString()));
        } catch (Exception e) {
            System.out.println("Error creando la comunidad");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al crear comunidad"));
        }
    }

    @PatchMapping("/{communityname}")
    public ResponseEntity<?> modificarComunidad(@PathVariable String communityName,
            @RequestBody CommunityDTO communityDTO) {
        Community actualizado = communityServices.modificarCommunity(communityName, communityDTO)
                .orElseThrow(() -> new RuntimeException("Error durante la modificacion de la comunidad"));

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("Comunidad modificada ", actualizado.toString()));
    }

    @PostMapping("/delete/{communityname}")
    public ResponseEntity<?> deleteCommunity(@PathVariable String communityname){
        try{
            communityServices.deleteUser(communityname);
        }
    }

}
