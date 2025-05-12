package com.gestioncomunidades.demo.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.gestioncomunidades.demo.models.Community;

@Repository
public interface CommunityRepository extends JpaRepository<Community,Long>{
    public Optional<Community> findByName(String name);
    public Optional<Community> findByIdAdmin(Long id);
}
