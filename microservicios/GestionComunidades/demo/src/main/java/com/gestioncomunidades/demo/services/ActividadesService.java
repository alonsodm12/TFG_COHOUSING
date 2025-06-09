package com.gestioncomunidades.demo.services;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.gestioncomunidades.demo.DTOs.CommunityDTO;
import com.gestioncomunidades.demo.DTOs.NotificacionRepartoDTO;
import com.gestioncomunidades.demo.DTOs.UpdateUserCommunityDTO;
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
        List<Long> usuarios = communityRepository.findById(idComunidad).map(Community::getIntegrantes)
                .orElse(Collections.emptyList());
        if (usuarios.isEmpty()) return;

        List<Tarea> tareas = tareaRepository.findByidComunidad(idComunidad);

        for (Tarea tarea : tareas) {
            //El error es porque esto esta vacio la primera vez
            List<Long> usuariosAsignados = tarea.getUsuariosParticipantes();

            List<Long> nuevosUsuariosAsignados = new ArrayList<>();

            if (usuariosAsignados == null || usuariosAsignados.isEmpty()){

                int cantidad = Math.min(tarea.getNumParticipantes(), usuarios.size());
                nuevosUsuariosAsignados.addAll(usuarios.subList(0, cantidad));
            } else{
                for (Long usuario : usuariosAsignados){
                    int indiceActual = usuarios.indexOf(usuario);
    
                    int indiceSiguiente = (indiceActual == -1) ? 0 : (indiceActual + 1) % usuarios.size();
    
                    Long siguienteUsuario = usuarios.get(indiceSiguiente);
    
                    nuevosUsuariosAsignados.add(siguienteUsuario);
                }    
            }
            
            tarea.setUsuariosParticipantes(nuevosUsuariosAsignados);
            Date fechaActual = tarea.getFechaTope();
            Calendar cal = Calendar.getInstance();
            cal.setTime(fechaActual);
            cal.add(Calendar.DAY_OF_MONTH, 7);
            tarea.setFechaTope(cal.getTime());

            tareaRepository.save(tarea);
        }
    }

    @Scheduled(cron = "0 * * * * *")
    @Transactional
    public void repartirTareasSemanalmente() {
        List<Community> comunidades = communityRepository.findAll();
        System.out.println("Funcionó el reparto");
    
        for (Community comunidad : comunidades) {
            // Lógica de reparto interno
            repartirTareasCiclico(comunidad.getId());
    
            // Obtener IDs de usuarios integrantes
            List<Long> idUsuarios = new ArrayList<>(comunidad.getIntegrantes());
    
            // Crear el payload de notificación
            NotificacionRepartoDTO payload = new NotificacionRepartoDTO(
                comunidad.getId(),
                comunidad.getName(),
                "Se ha realizado el reparto de tareas en tu comunidad",
                idUsuarios
            );
    
            // Enviar el evento por RabbitMQ
            rabbitTemplate.convertAndSend(
                RabbitMQConfig.EXCHANGE_NAME,
                RabbitMQConfig.REPARTO_TAREAS_ROUTING_KEY,
                payload
            );
        }
    }
}
