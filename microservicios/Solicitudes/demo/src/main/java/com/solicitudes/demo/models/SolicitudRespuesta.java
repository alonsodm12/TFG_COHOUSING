package com.solicitudes.demo.models;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class SolicitudRespuesta {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long destinoUserId;    // Usuario que la recibe

    private String mensaje;        // Contenido o descripción de la respuesta
    private LocalDateTime fecha;   // Fecha de creación

    // Constructors
    public SolicitudRespuesta() {
        this.fecha = LocalDateTime.now(); // Auto-set on creation
    }

    // Getters y Setters
    public Long getId() {
        return id;
    }


    public Long getDestinoUserId() {
        return destinoUserId;
    }

    public void setDestinoUserId(Long destinoUserId) {
        this.destinoUserId = destinoUserId;
    }

    public String getMensaje() {
        return mensaje;
    }

    public void setMensaje(String mensaje) {
        this.mensaje = mensaje;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }
}
