package com.gestioncomunidades.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.gestioncomunidades.demo.models.Tarea;

public interface TareaRepository extends JpaRepository<Tarea,Long>{
    List<Tarea> findByUsuariosParticipantes(Long usuarioId);
    List<Tarea> findByidComunidad(Long comunidadId);

}
