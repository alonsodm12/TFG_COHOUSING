package com.gestionusuarios.demo.models;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Table(name = "users")
@Entity
public class User implements UserDetails {

    @Schema(description = "ID del usuario")
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Schema(description = "Nombre del usuario")
    @Column(nullable = false)
    private String username;

    @Schema(description = "Email del usuario")

    @Column(unique = true, nullable = false)
    private String email;

    @Column(unique = false, nullable = false)
    private String password;

    @Column(nullable = false)
    private boolean enabled = true;

    @Column(name = "role")
    String role;

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

    @Column(name = "idComunidad")
    Long idComunidad;

    public User() {
    }

    public User(String username, String email, String password, boolean enabled, String role, int sociabilidad,
            int tranquilidad, int compartirEspacios, int limpieza, int actividad) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.enabled = enabled;
        this.role = role;
        this.actividad = actividad;
        this.compartirEspacios = compartirEspacios;
        this.limpieza = limpieza;
        this.tranquilidad = tranquilidad;
        this.sociabilidad = sociabilidad;
        this.idComunidad = 0L;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
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

    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", email=" + email + ", password=" + password
                + ", enabled=" + enabled + ", role=" + role + ", sociabilidad=" + sociabilidad + ", tranquilidad="
                + tranquilidad + ", compartirEspacios=" + compartirEspacios + ", limpieza=" + limpieza + ", actividad="
                + actividad + "]";
    }

}