package com.gestioncomunidades.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestioncomunidades.demo.models.Evento;


public interface EventoRepository extends JpaRepository<Evento,Long>{
    List<Evento> findByUsuariosParticipantes(Long usuarioId);
    List<Evento> findByidComunidad(Long comunidadId);
}
