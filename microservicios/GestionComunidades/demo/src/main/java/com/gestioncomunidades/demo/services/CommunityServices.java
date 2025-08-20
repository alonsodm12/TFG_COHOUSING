package com.gestioncomunidades.demo.services;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.amqp.AmqpException;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.gestioncomunidades.demo.DTOs.CommunityDTO;
import com.gestioncomunidades.demo.DTOs.EventoDTO;
import com.gestioncomunidades.demo.DTOs.LifestyleDTO;
import com.gestioncomunidades.demo.DTOs.TareaDTO;
import com.gestioncomunidades.demo.DTOs.UnionRequestDTO;
import com.gestioncomunidades.demo.DTOs.UnionResponseDTO;
import com.gestioncomunidades.demo.DTOs.UpdateUserCommunityDTO;
import com.gestioncomunidades.demo.config.RabbitMQConfig;
import com.gestioncomunidades.demo.models.Community;
import com.gestioncomunidades.demo.models.EstadoTarea;
import com.gestioncomunidades.demo.models.Evento;
import com.gestioncomunidades.demo.models.Tarea;
import com.gestioncomunidades.demo.repository.CommunityRepository;
import com.gestioncomunidades.demo.repository.EventoRepository;
import com.gestioncomunidades.demo.repository.TareaRepository;

import jakarta.transaction.Transactional;

/*
 * Clase servicio con la logica de negocio de las comunidades
 */

@Service
public class CommunityServices {

    private CommunityRepository communityRepository;
    private TareaRepository tareaRepository;
    private EventoRepository eventoRepository;

    private RabbitTemplate rabbitTemplate;

    public CommunityServices(CommunityRepository communityRepository, RabbitTemplate rabbitTemplate,
            TareaRepository tareaRepository, EventoRepository eventoRepository) {
        this.communityRepository = communityRepository;
        this.rabbitTemplate = rabbitTemplate;
        this.tareaRepository = tareaRepository;
        this.eventoRepository = eventoRepository;
    }

    /*
     * registrarComunidad(CommunityDTO)
     * 
     * Logica de negocio para registrar una Comunidad
     * Devuelve la comunidad creada
     * 
     */
    public Community registrarComunidad(CommunityDTO communityDTO) throws Exception {

        Community nuevaComunidad = new Community(communityDTO.name(), communityDTO.descripcion(),
                communityDTO.idAdmin(),
                communityDTO.lifestyleDTO().sociabilidad(),
                communityDTO.lifestyleDTO().tranquilidad(),
                communityDTO.lifestyleDTO().compartirEspacios(),
                communityDTO.lifestyleDTO().limpieza(),
                communityDTO.lifestyleDTO().actividad(),
                communityDTO.fotoUrl(),
                communityDTO.latitud(),
                communityDTO.longitud(),
                communityDTO.direccion(),
                communityDTO.precio(),
                communityDTO.num_integrantes());

        List<Long> integrantes = new ArrayList<>();
        if (communityDTO.integrantes() != null && !communityDTO.integrantes().isEmpty()) {
            integrantes.add(communityDTO.idAdmin());
            for (Long id : communityDTO.integrantes()) {
                integrantes.add(id);
            }
            nuevaComunidad.setIntegrantes(integrantes);
        } else {
            integrantes.add(communityDTO.idAdmin());
            nuevaComunidad.setIntegrantes(integrantes);
        }
        return communityRepository.save(nuevaComunidad);

    }

    /*
     * obtenerComunidadName(communityName)
     * 
     * Permite obtener una comunidad a partir de su nombre identificador
     * Devuelve la comunidad buscada
     * 
     */
    public Optional<CommunityDTO> obtenerComunidadName(String communityname) {
        Optional<Community> comunidad = communityRepository.findByName(communityname);

        if (comunidad.isPresent()) {
            Community community = comunidad.get();

            // Convertimos manualmente la entidad Community a CommunityDTO
            LifestyleDTO lifestyleDTO = new LifestyleDTO(
                    community.getSociabilidad(),
                    community.getTranquilidad(),
                    community.getCompartirEspacios(),
                    community.getLimpieza(),
                    community.getActividad());

            // Convertir Community a CommunityDTO manualmente
            CommunityDTO communityDTO = new CommunityDTO(
                    community.getId(),
                    community.getName(),
                    community.getDescripcion(),
                    community.getIdAdmin(),
                    lifestyleDTO,
                    community.getIntegrantes(),
                    community.getFotoUrl(),
                    community.getLatitud(),
                    community.getLongitud(),
                    community.getDireccion(),
                    community.getPrecio(),community.getNumeroIntegrantes());

            // Devuelve el DTO envuelto en un Optional
            return Optional.of(communityDTO);
        } else {
            return Optional.empty();
        }
    }

    /*
     * obtenerComunidadId(communityId)
     * 
     * Permite obtener una comunidad a partir de su id identificador
     * Devuelve la comunidad buscada
     * 
     */
    public Optional<CommunityDTO> obtenerComunidadId(Long communityId) {
        Optional<Community> comunidad = communityRepository.findById(communityId);

        if (comunidad.isPresent()) {
            Community community = comunidad.get();

            // Convertimos manualmente la entidad Community a CommunityDTO
            LifestyleDTO lifestyleDTO = new LifestyleDTO(
                    community.getSociabilidad(),
                    community.getTranquilidad(),
                    community.getCompartirEspacios(),
                    community.getLimpieza(),
                    community.getActividad());

            // Convertir Community a CommunityDTO manualmente
            CommunityDTO communityDTO = new CommunityDTO(
                    community.getId(),
                    community.getName(),
                    community.getDescripcion(),
                    community.getIdAdmin(),
                    lifestyleDTO,
                    community.getIntegrantes(),
                    community.getFotoUrl(),
                    community.getLatitud(),
                    community.getLongitud(),
                    community.getDireccion(),
                    community.getPrecio(),community.getNumeroIntegrantes());

            // Devuelve el DTO envuelto en un Optional
            return Optional.of(communityDTO);
        } else {
            return Optional.empty();
        }
    }

    public String guardarFoto(MultipartFile foto) {
        // Construimos un nombre único para evitar colisiones
        String filename = System.currentTimeMillis() + "_" + foto.getOriginalFilename();

        // Usamos la carpeta 'uploads' en el directorio home del usuario para evitar
        // problemas de permisos
        Path uploadsDir = Paths.get("/app/uploads/");

        // Ruta completa al archivo
        Path ruta = uploadsDir.resolve(filename);

        try {
            System.out.println("Guardando foto en: " + ruta.toAbsolutePath());

            // Creamos la carpeta uploads si no existe
            if (!Files.exists(uploadsDir)) {
                Files.createDirectories(uploadsDir);
                System.out.println("Carpeta uploads creada en: " + uploadsDir.toAbsolutePath());
            } else {
                System.out.println("Carpeta uploads ya existe");
            }

            // Guardamos el archivo
            foto.transferTo(ruta.toFile());

            // Devolvemos la ruta relativa para que puedas guardar en DB
            return "/uploads/" + filename;

        } catch (IOException e) {
            System.err.println("Error guardando la foto en: " + ruta.toAbsolutePath());
            e.printStackTrace();
            throw new RuntimeException("Error guardando la foto", e);
        }
    }

    /*
     * obtieneComunidades()
     * 
     * Permite obtener una lista con todas las comunidades en el sistema
     * Devuelve una lista de comunidades
     * 
     */
    public List<Community> obtenerComunidades() {
        List<Community> comunidades = communityRepository.findAll();

        return comunidades;
    }

    /*
     * modificarCommunity(communityName, communityDTO)
     * 
     * Permite modificar los datos de una comunidad por unos nuevos presentes
     * en el DTO
     * 
     * Devuelve la comunidad modificada
     * 
     */

    public Optional<Community> modificarCommunity(String communityName, CommunityDTO communityDTO) {
        Community comunidad = communityRepository.findByName(communityName)
                .orElseThrow(() -> new RuntimeException("Comunidad no encontrada"));

        if (communityDTO.name() != null)
            comunidad.setName(communityDTO.name());
        if (communityDTO.descripcion() != null)
            comunidad.setDescripcion(communityDTO.descripcion());

        if (communityDTO.lifestyleDTO() != null) {
            if (communityDTO.lifestyleDTO().actividad() != 0)
                comunidad.setActividad(communityDTO.lifestyleDTO().actividad());
            if (communityDTO.lifestyleDTO().compartirEspacios() != 0)
                comunidad.setCompartirEspacios(communityDTO.lifestyleDTO().compartirEspacios());
            if (communityDTO.lifestyleDTO().limpieza() != 0)
                comunidad.setLimpieza(communityDTO.lifestyleDTO().limpieza());
            if (communityDTO.lifestyleDTO().sociabilidad() != 0)
                comunidad.setSociabilidad(communityDTO.lifestyleDTO().sociabilidad());
            if (communityDTO.lifestyleDTO().tranquilidad() != 0)
                comunidad.setTranquilidad(communityDTO.lifestyleDTO().tranquilidad());
        }

        Community communityUpdate = communityRepository.save(comunidad);
        return Optional.of(communityUpdate);

    }

    /*
     * deleteCommunity(communityName)
     * 
     * Permite eliminar la comunidad cuyo nombre se ha especificado
     * Devuelve void
     * 
     */

    public void deleteCommunity(Long idComunidad) throws Exception {
        Optional<Community> communityOptional = communityRepository.findById(idComunidad);

        if (communityOptional.isPresent())
            communityRepository.delete(communityOptional.get());
        else {
            throw new Exception("Comunidad no existe");
        }
    }

    /*
     * procesarUnion(UnionRequestDTO)
     * 
     * Permite procesar una solicitud de union a una comunidad
     * Interviene RabbitMQ
     * 
     * Devuelve la comunidad buscada
     * 
     */

    public void procesarUnion(UnionRequestDTO requestDTO) {
        try {
            rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME, RabbitMQConfig.ROUTING_KEY, requestDTO);
        } catch (AmqpException e) {
            throw new RuntimeException("Error al enviar la solicitud a la cola", e);
        }

    }

    @Transactional
    @RabbitListener(queues = RabbitMQConfig.RESPONSE_QUEUE)
    public void recibirRespuestaUnion(UnionResponseDTO response) {
        if (!response.aceptado()) {
            System.out.println("Unión rechazada para usuario: " + response.userId());
            return;
        }

        // Buscar la comunidad una sola vez
        Community comunidad = communityRepository.findById(response.comunidadId())
                .orElseThrow(() -> new RuntimeException("Comunidad no encontrada"));

        List<Long> integrantes = comunidad.getIntegrantes();
        Long userId = response.userId();

        // Solo añadir y guardar si no está ya en la comunidad
        if (integrantes.contains(userId)) {
            System.out.println("Usuario ya es integrante de la comunidad");
            return;
        }

        integrantes.add(userId);
        communityRepository.save(comunidad);

        System.out.println("Unión aceptada para usuario: " + userId);

        UpdateUserCommunityDTO payload = new UpdateUserCommunityDTO(userId, comunidad.getId());
        rabbitTemplate.convertAndSend(RabbitMQConfig.EXCHANGE_NAME,
                RabbitMQConfig.USER_COMMUNITY_UPDATE_ROUTING_KEY,
                payload);
    }

    /**************************************************************************/

    // Funcion para registrar una nueva tarea en el sistema

    public Tarea registrarTarea(TareaDTO tareaDTO) throws Exception {

        Tarea nuevaTarea = new Tarea();

        nuevaTarea.setTitulo(tareaDTO.titulo());
        nuevaTarea.setDescripcion(tareaDTO.descripcion());

        //if (tareaDTO.fechaTope() == null){
            //nuevaTarea.setFechaTope(LocalDateTime.now().plusDays(7));
        //}
        nuevaTarea.setEstado(tareaDTO.estado());
        nuevaTarea.setDuracion(tareaDTO.duracion());
        nuevaTarea.setIdComunidad(tareaDTO.idComunidad());
        nuevaTarea.setNumParticipantes(tareaDTO.numParticipantes());

        if (tareaDTO.usuariosParticipantes() != null && !tareaDTO.usuariosParticipantes().isEmpty()) {
            List<Long> participantes = new ArrayList<>();
            for (Long id : tareaDTO.usuariosParticipantes()) {
                participantes.add(id);
            }
            nuevaTarea.setUsuariosParticipantes(participantes);
        }

        if (tareaDTO.asignacion().equals("ahora")){
            List<Long> participantes = new ArrayList<>();
            for(int i =0;i<tareaDTO.numParticipantes();i++){
                Long user = this.usuarioMenosTareas(tareaDTO.idComunidad());
                participantes.add(user);
            }
        }

        return this.tareaRepository.save(nuevaTarea);

    }

    // Funcion para modificar la Fecha de una tarea concreta por parte del usuario

    public void establecerFechaTarea(Long idTarea, LocalDateTime date) throws Exception {

        try {
            Tarea tarea = tareaRepository.findById(idTarea).get();
            tarea.setFechaTope(date);
            tareaRepository.save(tarea);

        } catch (Exception e) {
            e.printStackTrace();

        }

    }

    // Funcion para encontrar al usuario dentro de una comunidad con el menor numero
    // de tareas asignadas

    public Long usuarioMenosTareas(Long communityId) throws Exception {
        Community comunidad = communityRepository.findById(communityId).get();

        List<Long> usuarios = comunidad.getIntegrantes();
        Long usuarioAasignar = 0L;
        int usuarioMinTareas = 0;
        int usuarioTareas = 0;
        for (Long usuario : usuarios) {
            usuarioTareas = tareaRepository.findByUsuariosParticipantes(usuario).size();
            if (usuarioTareas <= usuarioMinTareas)
                usuarioAasignar = usuario;
        }

        return usuarioAasignar;

    }

    // Funcion para registrar un nuevo evento en el sistema

    public Evento registrarEvento(EventoDTO eventoDTO) throws Exception {

        Evento nuevoEvento = new Evento();

        nuevoEvento.setTitulo(eventoDTO.titulo());
        nuevoEvento.setDescripcion(eventoDTO.descripcion());
        nuevoEvento.setFechaTope(eventoDTO.fechaTope());
        nuevoEvento.setLugar(eventoDTO.lugar());
        nuevoEvento.setHoraInicio(eventoDTO.horaInicio());
        nuevoEvento.setHoraFinal(eventoDTO.horaFinal());
        nuevoEvento.setIdComunidad(eventoDTO.idComunidad());
        nuevoEvento.setNumParticipantes(eventoDTO.numParticipantes());

        if (eventoDTO.usuariosParticipantes() != null && !eventoDTO.usuariosParticipantes().isEmpty()) {
            List<Long> participantes = new ArrayList<>();
            for (Long id : eventoDTO.usuariosParticipantes()) {
                participantes.add(id);
            }
            nuevoEvento.setUsuariosParticipantes(participantes);
        }
        return this.eventoRepository.save(nuevoEvento);

    }

    public List<TareaDTO> obtenerTareasComunidad(Long idComunidad) {
        return tareaRepository.findByidComunidad(idComunidad)
                .stream()
                .map(this::convertirATareaDTO)
                .collect(Collectors.toList());
    }

    public List<TareaDTO> obtenerTareasUsuario(Long idUsuario) {
        return tareaRepository.findByUsuariosParticipantes(idUsuario)
                .stream()
                .map(this::convertirATareaDTO)
                .collect(Collectors.toList());
    }

    public List<EventoDTO> obtenerEventosUsuarioComunidad(Long idUsuario) {
        return eventoRepository.findByUsuariosParticipantes(idUsuario)
                .stream()
                .map(this::convertirAEventoDTO)
                .collect(Collectors.toList());
    }

    public List<EventoDTO> obtenerEventosComunidad(Long idComunidad) {
        return eventoRepository.findByidComunidad(idComunidad)
                .stream()
                .map(this::convertirAEventoDTO)
                .collect(Collectors.toList());
    }

    public TareaDTO obtenerTarea(Long idTarea) {
        return convertirATareaDTO(tareaRepository.findById(idTarea)
                .orElseThrow(() -> new RuntimeException("Tarea no encontrada")));
    }

    public EventoDTO obtenerEvento(Long idEvento) {
        return convertirAEventoDTO(eventoRepository.findById(idEvento)
                .orElseThrow(() -> new RuntimeException("Evento no encontrado")));
    }

    private TareaDTO convertirATareaDTO(Tarea tarea) {
        return new TareaDTO(
                tarea.getId(),
                tarea.getTitulo(),
                tarea.getDescripcion(),
                tarea.getUsuariosParticipantes(), // Ya es List<Long>
                tarea.getFechaTope(),
                tarea.getEstado(),
                tarea.getDuracion(),
                tarea.getIdComunidad(),
                tarea.getNumParticipantes(),
                "AHORA");
    }

    private EventoDTO convertirAEventoDTO(Evento evento) {
        return new EventoDTO(
                evento.getId(),
                evento.getTitulo(),
                evento.getDescripcion(),
                evento.getUsuariosParticipantes(), // Ya es List<Long>
                evento.getFechaTope(),
                evento.getLugar(),
                evento.getHoraInicio(),
                evento.getHoraFinal(),
                evento.getIdComunidad(), evento.getNumParticipantes());
    }

    public boolean marcarTareaCompletada(Long idTarea) {
        Optional<Tarea> tarea = tareaRepository.findById(idTarea);
        if (tarea.isPresent()) {
            Tarea tareaCompletada = tarea.get();

            tareaCompletada.setEstado(EstadoTarea.COMPLETADA);
            tareaRepository.save(tareaCompletada);
            return true;
        } else {
            return false;
        }
    }

    public boolean marcarEventoCompletado(Long idEvento){
        Optional<Evento> evento = eventoRepository.findById(idEvento);
        
        eventoRepository.delete(evento.get());

        return true;
    }

    public boolean marcarTareaProgreso(Long idTarea) {
        Optional<Tarea> tarea = tareaRepository.findById(idTarea);
        if (tarea.isPresent()) {
            Tarea tareaEnProgreso = tarea.get();

            tareaEnProgreso.setEstado(EstadoTarea.EN_PROGRESO);
            tareaRepository.save(tareaEnProgreso);
            return true;
        } else {
            return false;
        }
    }

    public boolean deleteTarea(Long idComunidad) throws Exception {
        try {
            tareaRepository.deleteById(idComunidad);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    public void asignarTareaUsuario(Long idTarea, Long idUsuario) {
        Optional<Tarea> tarea = tareaRepository.findById(idTarea);
        if (tarea.isPresent()) {
            Tarea tareaAsignada = tarea.get();

            List<Long> usuarios = tareaAsignada.getUsuariosParticipantes();
            usuarios.add(idUsuario);

            tareaRepository.save(tareaAsignada);
        }
    }

    public List<CommunityDTO> obtenerComunidadesIds(List<Long> idsComunidades){
        return communityRepository.findAllById(idsComunidades)
                .stream()
                .map(this::convertirACommunityDTO)
                .collect(Collectors.toList());
    }

    private CommunityDTO convertirACommunityDTO(Community community) {
        LifestyleDTO lifestyleDTO = new LifestyleDTO(community.getSociabilidad(), community.getTranquilidad(), community.getCompartirEspacios(), community.getLimpieza(), community.getActividad());
        return new CommunityDTO(
                community.getId(),
                community.getName(),
                community.getDescripcion(),
                community.getIdAdmin(),
                lifestyleDTO,
                community.getIntegrantes(),
                community.getFotoUrl(),
                community.getLatitud(),
                community.getLongitud(),
                community.getDireccion(),
                community.getPrecio(),community.getNumeroIntegrantes());
    }


    public int obtenerPorcentajeTareasRealizadasGlobal(Long idComunidad) {
        try {
            List<Tarea> tareas = tareaRepository.findByidComunidad(idComunidad);
            int totalTareas = tareas.size();
            if (totalTareas == 0) return 0; // evitar división por cero
    
            int completadas = 0;
            for (Tarea tarea : tareas) {
                EstadoTarea estado = tarea.getEstado();
                if (estado.equals(EstadoTarea.COMPLETADA))
                    completadas++;
            }
    
            return (int) ((double) completadas / totalTareas * 100);
    
        } catch (Exception e) {
            System.out.println("Error calculando el porcentaje de tareas de la comunidad");
            return 0;
        }
    }
    
    public int obtenerPorcentajeTareasRealizadasIndividual(Long idUsuario) {
        try {
            List<Tarea> tareas = tareaRepository.findByUsuariosParticipantes(idUsuario);
            int totalTareas = tareas.size();
            if (totalTareas == 0) return 0; // evitar división por cero
    
            int completadas = 0;
            for (Tarea tarea : tareas) {
                EstadoTarea estado = tarea.getEstado();
                if (estado.equals(EstadoTarea.COMPLETADA))
                    completadas++;
            }
    
            return (int) ((double) completadas / totalTareas * 100);
    
        } catch (Exception e) {
            System.out.println("Error calculando el porcentaje de tareas del usuario");
            return 0;
        }
    }

    @Transactional
    public void eliminarMiembroComunidad(Long idUsuario,Long idComunidad){
        try{
            Community comunidad = communityRepository.findById(idComunidad).orElseThrow(() -> new RuntimeException("Error durante la modificacion de la comunidad"));
            List<Long> nuevosIntegrantes = new ArrayList<>();
            for(Long integrante : comunidad.getIntegrantes()){
                if(integrante != idUsuario){
                    nuevosIntegrantes.add(integrante);
                }

            }

            comunidad.setIntegrantes(nuevosIntegrantes);
            communityRepository.save(comunidad);

        }catch(Exception e){
            System.out.println("Error al eliminar miembro de una comunidad");
        }
    }
    
}
