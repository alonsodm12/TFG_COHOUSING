package com.gestioncomunidades.demo.services;

import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.gestioncomunidades.demo.DTOs.NotificacionRepartoDTO;

import com.gestioncomunidades.demo.config.RabbitMQConfig;
import com.gestioncomunidades.demo.models.Community;
import com.gestioncomunidades.demo.models.Tarea;
import com.gestioncomunidades.demo.repository.CommunityRepository;
import com.gestioncomunidades.demo.repository.TareaRepository;

import io.jsonwebtoken.lang.Collections;
import jakarta.transaction.Transactional;

@Service
public class ActividadesService {
    private TareaRepository tareaRepository;
    private CommunityRepository communityRepository;
    private RabbitTemplate rabbitTemplate;

    public ActividadesService(TareaRepository tareaRepository, CommunityRepository communityRepository,RabbitTemplate rabbitTemplate) {
        this.tareaRepository = tareaRepository;
        this.communityRepository = communityRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Transactional
    public void repartirTareasCiclico(Long idComunidad) {
        
        Community comunidad = communityRepository.findById(idComunidad).get();

        List<Long> usuarios = comunidad.getIntegrantes();

        if (usuarios.isEmpty()) return;

        usuarios.sort(Comparator.naturalOrder()); // Asegura orden consistente

        List<Tarea> tareas = tareaRepository.findByidComunidad(idComunidad);
        if (tareas.isEmpty()) return;

        int totalUsuarios = usuarios.size();

        int indiceRotacion = comunidad.getIndiceRotacion();
        int indiceActual = indiceRotacion;

        for (Tarea tarea : tareas) {
            int numParticipantes = Math.min(tarea.getNumParticipantes(), totalUsuarios);
            List<Long> nuevosAsignados = new ArrayList<>();

            for (int i = 0; i < numParticipantes; i++) {
                int idx = (indiceActual + i) % totalUsuarios;
                nuevosAsignados.add(usuarios.get(idx));
            }

            indiceActual = (indiceActual + numParticipantes) % totalUsuarios;

            tarea.setUsuariosParticipantes(nuevosAsignados);
            tarea.setFechaTope(null);
            tareaRepository.save(tarea);
        }

        comunidad.setIndiceRotacion(indiceRotacion);
    }


    @Scheduled(cron = "0 */3 * * * *")
    @Transactional
    public void repartirTareasSemanalmente() {
        List<Community> comunidades = communityRepository.findAll();

        for (Community comunidad : comunidades) {
            repartirTareasCiclico(comunidad.getId());

            List<Long> idUsuarios = new ArrayList<>(comunidad.getIntegrantes());

            NotificacionRepartoDTO payload = new NotificacionRepartoDTO(
                comunidad.getId(),
                comunidad.getName(),
                "Se ha realizado el reparto de tareas en tu comunidad",
                idUsuarios
            );

            rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_NAME,
                RabbitMQConfig.REPARTO_TAREAS_ROUTING_KEY,
                payload
            );
        }
    }
}
