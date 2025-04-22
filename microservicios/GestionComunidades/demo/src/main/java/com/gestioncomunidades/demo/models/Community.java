package com.gestioncomunidades.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "communities")
@Entity
public class Community {

    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false, unique = true)
    private String description;

    @Column(name = "sociabilidad")
    int sociabilidad;

    @Column(name = "tranquilidad")
    int tranquilidad;

    @Column(name = "compartirEspacios")
    int compartirEspacios;

    @Column(name = "limpieza")
    int limpieza;

    @Column(name = "actividad")
    int actividad;

    public Community() {
    }

    public Community(String name, String description, int sociabilidad, int tranquilidad,
            int compartirEspacios, int limpieza, int actividad) {
        this.name = name;
        this.description = description;
        this.sociabilidad = sociabilidad;
        this.tranquilidad = tranquilidad;
        this.compartirEspacios = compartirEspacios;
        this.limpieza = limpieza;
        this.actividad = actividad;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public int getSociabilidad() {
        return sociabilidad;
    }

    public void setSociabilidad(int sociabilidad) {
        this.sociabilidad = sociabilidad;
    }

    public int getTranquilidad() {
        return tranquilidad;
    }

    public void setTranquilidad(int tranquilidad) {
        this.tranquilidad = tranquilidad;
    }

    public int getCompartirEspacios() {
        return compartirEspacios;
    }

    public void setCompartirEspacios(int compartirEspacios) {
        this.compartirEspacios = compartirEspacios;
    }

    public int getLimpieza() {
        return limpieza;
    }

    public void setLimpieza(int limpieza) {
        this.limpieza = limpieza;
    }

    public int getActividad() {
        return actividad;
    }

    public void setActividad(int actividad) {
        this.actividad = actividad;
    }

}