package com.gestioncomunidades.demo.models;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "communities")
public class Community {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(nullable = false, unique = true)
    private String name;

    @Column(nullable = false)
    private String descripcion;

    @Column(name = "sociabilidad")
    private int sociabilidad;

    @Column(name = "tranquilidad")
    private int tranquilidad;

    @Column(name = "compartir_espacios")
    private int compartirEspacios;

    @Column(name = "limpieza")
    private int limpieza;

    @Column(name = "actividad")
    private int actividad;

    @ElementCollection
    @CollectionTable(name = "community_integrantes", joinColumns = @JoinColumn(name = "community_id"))
    @Column(name = "integrante_id")
    private List<Long> integrantes = new ArrayList<>();

    @Column(name = "admin", nullable = false)
    private Long idAdmin;

    @Column(name = "foto_url")
    private String fotoUrl;

    @Column(name = "latitud")
    private Double latitud;

    @Column(name = "longitud")
    private Double longitud;

    @Column(name = "direccion")
    private String direccion; 

    @Column(name = "precio")
    private Double precio;

    @Column(name = "indiceRotacion")
    private int indiceRotacion = 0;

    @Column(name = "numeroIntegrantes")
    private int numeroIntegrantes = 0;





    // Constructor vacío
    public Community() {}

    // Constructor completo
    public Community(String name, String descripcion, Long idAdmin, int sociabilidad, int tranquilidad,
                     int compartirEspacios, int limpieza, int actividad, String fotoUrl, Double latitud, Double longitud, String direccion, Double precio, int numeroIntegrantes) {
        this.name = name;
        this.descripcion = descripcion;
        this.idAdmin = idAdmin;
        this.sociabilidad = sociabilidad;
        this.tranquilidad = tranquilidad;
        this.compartirEspacios = compartirEspacios;
        this.limpieza = limpieza;
        this.actividad = actividad;
        this.fotoUrl = fotoUrl;
        this.latitud = latitud;
        this.longitud = longitud;
        this.direccion = direccion;
        this.precio = precio;
        this.numeroIntegrantes = numeroIntegrantes;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescripcion() {
        return descripcion;
    }

    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
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

    public List<Long> getIntegrantes() {
        return integrantes;
    }

    public void setIntegrantes(List<Long> integrantes) {
        this.integrantes = integrantes;
    }

    public Long getIdAdmin() {
        return idAdmin;
    }

    public void setIdAdmin(Long idAdmin) {
        this.idAdmin = idAdmin;
    }

    public String getFotoUrl() {
        return fotoUrl;
    }
    
    public void setFotoUrl(String fotoUrl) {
        this.fotoUrl = fotoUrl;
    }
    
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

    public Double getPrecio(){
        return this.precio;
    }
    public void setPrecio(Double precio){
        this.precio = precio;
    }
    public int getIndiceRotacion() {
        return indiceRotacion;
    }

    public void setIndiceRotacion(int indiceRotacion) {
        this.indiceRotacion = indiceRotacion;
    }


    public int getNumeroIntegrantes() {
        return numeroIntegrantes;
    }

    public void setNumeroIntegrantes(int numeroIntegrantes) {
        this.numeroIntegrantes = numeroIntegrantes;
    }
}
