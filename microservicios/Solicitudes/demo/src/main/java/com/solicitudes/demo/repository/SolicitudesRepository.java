package com.solicitudes.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.solicitudes.demo.models.Solicitud;

@Repository
public interface SolicitudesRepository extends JpaRepository<Solicitud,Long>{
    Optional<List<Solicitud>> findByUserId(Long userId);
}
