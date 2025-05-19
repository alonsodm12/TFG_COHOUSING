package com.solicitudes.demo.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.solicitudes.demo.service.SolicitudesService;

@RestController
@RequestMapping("/solicitudes")
public class SolicitudesController {
    
    private SolicitudesService solicitudesService;

    public SolicitudesController(SolicitudesService solicitudesService){
        this.solicitudesService = solicitudesService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getSolicitudById(@PathVariable Long id){
        return solicitudesService.obtenerSolicitudPorId(id);
    }

    @GetMapping("/usuario/{userId}")
    public ResponseEntity<?> getSolicitudesById(@PathVariable Long userId){
        return solicitudesService.obtenerSolicitudesUsuario(userId);
    }

    @GetMapping
    public ResponseEntity<?> getSolicitudes(){
        return solicitudesService.obtenerSolicitudes();
    }

}
