package com.gestioncomunidades.demo.models;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Inheritance(strategy = InheritanceType.JOINED)
public abstract class Actividad {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String titulo;

    private String descripcion;

    @ElementCollection
    @CollectionTable(
        name = "tarea_usuario",
        joinColumns = @JoinColumn(name = "tarea_id")
    )
    @Column(name = "usuario_id")
    private List<Long> usuariosParticipantes = new ArrayList<>();

    private LocalDateTime fechaTope;

    private Long idComunidad;

    private int numParticipantes;

    public int getNumParticipantes() {
        return numParticipantes;
    }

    public void setNumParticipantes(int numParticipantes) {
        this.numParticipantes = numParticipantes;
    }

    public Long getIdComunidad() {
        return idComunidad;
    }

    public void setIdComunidad(Long idComunidad) {
        this.idComunidad = idComunidad;
    }

    public Long getId() {
        return id;
    }

    public String getTitulo() {
        return titulo;
    }

    public void setTitulo(String titulo) {
        this.titulo = titulo;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public List<Long> getUsuariosParticipantes() {
        return usuariosParticipantes;
    }

    public void setUsuariosParticipantes(List<Long> usuariosParticipantes) {
        this.usuariosParticipantes = usuariosParticipantes;
    }

    public LocalDateTime getFechaTope() {
        return fechaTope;
    }

    public void setFechaTope(LocalDateTime fechaTope) {
        this.fechaTope = fechaTope;
    }
}
