package com.gestioncomunidades.demo.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Evento extends Actividad {

    @Column(name="lugar")
    private String lugar;

    @Column(name = "horaInicio")
    private Double horaInicio;

    @Column(name = "horaFinal")
    private Double horaFinal;

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public Double getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(Double horaInicio) {
        this.horaInicio = horaInicio;
    }

    public Double getHoraFinal() {
        return horaFinal;
    }

    public void setHoraFinal(Double horaFinal) {
        this.horaFinal = horaFinal;
    }

    
}
