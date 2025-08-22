package com.gestioncomunidades.demo.models;

import java.time.LocalDateTime;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;

@Entity
public class Evento extends Actividad {

    @Column(name="lugar")
    private String lugar;

    @Column(name = "horaInicio")
    private LocalTime horaInicio;

    @Column(name = "horaFinal")
    private LocalTime horaFinal;

    public String getLugar() {
        return lugar;
    }

    public void setLugar(String lugar) {
        this.lugar = lugar;
    }

    public LocalTime getHoraInicio() {
        return horaInicio;
    }

    public void setHoraInicio(LocalTime horaInicio) {
        this.horaInicio = horaInicio;
    }

    public LocalTime getHoraFinal() {
        return horaFinal;
    }

    public void setHoraFinal(LocalTime horaFinal) {
        this.horaFinal = horaFinal;
    }

    
}
