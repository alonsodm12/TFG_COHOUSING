package com.solicitudes.demo.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class Solicitud {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;
    private Long userOrigenId;
    private Long communityId;

    private LocalDateTime fecha;

    private String descripcion;
    private String tipo;



    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getUserOrigenId() {
        return userOrigenId;
    }

    public void setUserOrigenId(Long userOrigenId) {
        this.userOrigenId = userOrigenId;
    }

    public LocalDateTime getFecha() {
        return fecha;
    }

    public void setFecha(LocalDateTime fecha) {
        this.fecha = fecha;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Long getCommunityId() {
        return communityId;
    }

    public void setCommunityId(Long communityId) {
        this.communityId = communityId;
    }
    public String getTipo() {
        return tipo;
    }

    public void setTipo(String tipo) {
        this.tipo = tipo;
    }
}
