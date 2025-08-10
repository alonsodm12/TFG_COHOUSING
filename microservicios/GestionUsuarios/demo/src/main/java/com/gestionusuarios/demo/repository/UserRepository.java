package com.gestionusuarios.demo.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestionusuarios.demo.models.User;

@Repository
public interface UserRepository extends JpaRepository<User,Long>{
    Optional<User> findByUsername(String username);
    Optional<User> findByEmail(String email);
    Optional<List<User>> findByIdComunidad(Long idComunidad);
}