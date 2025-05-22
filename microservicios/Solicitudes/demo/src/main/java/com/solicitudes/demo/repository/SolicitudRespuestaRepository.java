package com.solicitudes.demo.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.solicitudes.demo.models.SolicitudRespuesta;

@Repository
public interface SolicitudRespuestaRepository extends JpaRepository<SolicitudRespuesta, Long> {
    List<SolicitudRespuesta> findByDestinoUserId(Long destinoUserId);
}
