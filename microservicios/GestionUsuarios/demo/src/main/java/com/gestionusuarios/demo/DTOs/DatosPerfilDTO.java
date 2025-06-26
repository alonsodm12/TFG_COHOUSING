package com.gestionusuarios.demo.DTOs;

public class DatosPerfilDTO {
    private String direccion;
    private Double latitud;
    private Double longitud;
    private Integer limpieza;
    private Integer compartirEspacios;
    private Integer actividad;
    private Integer tranquilidad;
    private Integer sociabilidad;

    public DatosPerfilDTO() {}

    public String getDireccion() {
        return direccion;
    }

    public void setDireccion(String direccion) {
        this.direccion = direccion;
    }

    public Double getLatitud() {
        return latitud;
    }

    public void setLatitud(Double latitud) {
        this.latitud = latitud;
    }

    public Double getLongitud() {
        return longitud;
    }

    public void setLongitud(Double longitud) {
        this.longitud = longitud;
    }

    public Integer getLimpieza() {
        return limpieza;
    }

    public void setLimpieza(Integer limpieza) {
        this.limpieza = limpieza;
    }

    public Integer getCompartirEspacios() {
        return compartirEspacios;
    }

    public void setCompartirEspacios(Integer compartirEspacios) {
        this.compartirEspacios = compartirEspacios;
    }

    public Integer getActividad() {
        return actividad;
    }

    public void setActividad(Integer actividad) {
        this.actividad = actividad;
    }

    public Integer getTranquilidad() {
        return tranquilidad;
    }

    public void setTranquilidad(Integer tranquilidad) {
        this.tranquilidad = tranquilidad;
    }

    public Integer getSociabilidad() {
        return sociabilidad;
    }

    public void setSociabilidad(Integer sociabilidad) {
        this.sociabilidad = sociabilidad;
    }
}
