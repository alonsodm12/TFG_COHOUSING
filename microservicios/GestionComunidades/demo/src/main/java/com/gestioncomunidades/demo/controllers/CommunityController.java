package com.gestioncomunidades.demo.controllers;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.gestioncomunidades.demo.DTOs.CommunityDTO;
import com.gestioncomunidades.demo.DTOs.EventoDTO;
import com.gestioncomunidades.demo.DTOs.FechaDTO;
import com.gestioncomunidades.demo.DTOs.TareaDTO;
import com.gestioncomunidades.demo.DTOs.UnionRequestDTO;
import com.gestioncomunidades.demo.models.Community;
import com.gestioncomunidades.demo.models.EstadoTarea;
import com.gestioncomunidades.demo.models.Evento;
import com.gestioncomunidades.demo.models.Tarea;
import com.gestioncomunidades.demo.services.CommunityServices;

import jakarta.validation.Valid;

@Controller
@RequestMapping("/comunidades")
public class CommunityController {
    private CommunityServices communityServices;

    public CommunityController(CommunityServices communityServices) {
        this.communityServices = communityServices;
    }

    @GetMapping("/obtener")
    ResponseEntity<?> obtenerComunidadesDisponibles() {
        List<Community> comunidades = communityServices.obtenerComunidades();

        if (!comunidades.isEmpty()) {
            List<String> nombres = comunidades.stream()
                    .map(Community::getName)
                    .toList();

            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(Map.of("Comunidades", nombres));
        }

        return ResponseEntity.status(HttpStatus.ACCEPTED)
                .body(Map.of("Error", "No se ha encontrado ninguna comunidad"));
    }

    @GetMapping("/{communityname}")
    public ResponseEntity<?> obtenerComunidad(@PathVariable String communityname) {
        Optional<CommunityDTO> comunidad = this.communityServices.obtenerComunidadName(communityname);

        if (comunidad.isPresent())
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(comunidad);
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @GetMapping("/id/{communityID}")
    public ResponseEntity<?> obtenerComunidadId(@PathVariable Long communityID) {
        Optional<CommunityDTO> comunidad = this.communityServices.obtenerComunidadId(communityID);

        if (comunidad.isPresent())
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(comunidad);
        else
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> crearComunidad(@RequestPart(value = "community") @Valid CommunityDTO communityDTO,
            @RequestPart(value = "foto", required = false) MultipartFile foto) {
        try {

            if (foto != null && !foto.isEmpty()) {
                String fotoUrl = communityServices.guardarFoto(foto);
                communityDTO = new CommunityDTO(communityDTO.name(), communityDTO.descripcion(), communityDTO.idAdmin(),
                        communityDTO.lifestyleDTO(), communityDTO.integrantes(), fotoUrl, communityDTO.latitud(),
                        communityDTO.longitud(), communityDTO.direccion(), communityDTO.precio());
            }
            Community comunidad = communityServices.registrarComunidad(communityDTO);

            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body(Map.of("message", "Comunidad creada con éxito", "id", comunidad.getId()));
        } catch (Exception e) {
            System.out.println("Error creando la comunidad");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Error al crear comunidad"));
        }
    }

    @PatchMapping("/{communityname}")
    public ResponseEntity<?> modificarComunidad(@PathVariable String communityName,
            @RequestBody CommunityDTO communityDTO) {
        Community actualizado = communityServices.modificarCommunity(communityName, communityDTO)
                .orElseThrow(() -> new RuntimeException("Error durante la modificacion de la comunidad"));

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(Map.of("Comunidad modificada ", actualizado.toString()));
    }

    @PostMapping("/delete/{communityname}")
    public ResponseEntity<?> deleteCommunity(@PathVariable String communityname) {
        try {
            communityServices.deleteCommunity(communityname);
            return ResponseEntity.status(HttpStatus.ACCEPTED)
                    .body("Comunidad: " + communityname + " borrada correctamente");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error borrando la comunidad: " + communityname);
        }
    }

    @PostMapping("/unirse")
    public ResponseEntity<Map<String, String>> unirseAComunidad(@RequestBody UnionRequestDTO request) {

        try {
            communityServices.procesarUnion(request);
            Map<String, String> response = Map.of("message", "Solicitud de unión enviada exitosamente");
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = Map.of("error", "No se pudo procesar la solicitud. Inténtalo más tarde.");
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(error);
        }
    }

    @PostMapping("/tarea")
    public ResponseEntity<?> crearTarea(@RequestBody TareaDTO tareaDTO) {
        try {
            Tarea tarea = this.communityServices.registrarTarea(tareaDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(tarea);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/tareas/comunidad/{idComunidad}")
    public ResponseEntity<?> obtenerTareasUsuario(@PathVariable Long idComunidad) {
        try {
            List<TareaDTO> tareas = communityServices.obtenerTareasComunidad(idComunidad);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(tareas);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/eventos/comunidad/{idComunidad}")
    public ResponseEntity<?> obtenerEventosComunidad(@PathVariable Long idComunidad) {
        try {
            List<EventoDTO> eventos = communityServices.obtenerEventosComunidad(idComunidad);
            return ResponseEntity.status(HttpStatus.ACCEPTED).body(eventos);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PostMapping("/evento")
    public ResponseEntity<?> crearEvento(@RequestBody EventoDTO eventoDTO) {
        try {
            Evento evento = this.communityServices.registrarEvento(eventoDTO);
            return ResponseEntity.status(HttpStatus.CREATED).body(evento);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PatchMapping("/completarTarea/{idTarea}")
    public ResponseEntity<?> completarTarea(@PathVariable Long idTarea) {
        try {
            communityServices.marcarTareaCompletada(idTarea);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PatchMapping("/enProgresoTarea/{idTarea}")
    public ResponseEntity<?> enProgresoTarea(@PathVariable Long idTarea) {
        try {
            communityServices.marcarTareaProgreso(idTarea);
            return ResponseEntity.status(HttpStatus.ACCEPTED).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/tareas/{idUsuario}")
    public ResponseEntity<?> getTareasByUsuario(@PathVariable Long idUsuario) {
        List<TareaDTO> tareas = communityServices.obtenerTareasUsuario(idUsuario);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(tareas);

    }

    @GetMapping("/eventos/{idUsuario}")
    public ResponseEntity<?> getEventosByUsuario(@PathVariable Long idUsuario) {
        List<EventoDTO> eventos = communityServices.obtenerEventosUsuarioComunidad(idUsuario);

        return ResponseEntity.status(HttpStatus.ACCEPTED).body(eventos);
    }

    @GetMapping("tarea/{idTarea}")
    public ResponseEntity<?> consultarTarea(@PathVariable Long idTarea) {
        TareaDTO tarea = communityServices.obtenerTarea(idTarea);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(tarea);
    }

    @GetMapping("evento/{idEvento}")
    public ResponseEntity<?> consultarEvento(@PathVariable Long idEvento) {
        EventoDTO evento = communityServices.obtenerEvento(idEvento);
        return ResponseEntity.status(HttpStatus.ACCEPTED).body(evento);
    }

    @PatchMapping("tarea/modificarFecha/{idTarea}")
    public ResponseEntity<?> modificarFecha(@PathVariable Long idTarea, @RequestBody FechaDTO fecha) {

        try {
            communityServices.establecerFechaTarea(idTarea, fecha.getFecha());
            communityServices.marcarTareaProgreso(idTarea);
            return ResponseEntity.status(HttpStatus.OK).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }

    }

    @PostMapping("/filterPorId")
    public ResponseEntity<?> obtenerComunidadesIds(@RequestBody List<Long> idsComunidades) {
        try {
            List<CommunityDTO> comunidades = communityServices.obtenerComunidadesIds(idsComunidades);
            return ResponseEntity.status(HttpStatus.OK).body(comunidades);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/porcentajeTareasUsuario/{idUsuario}")
    public ResponseEntity<?> obtenerPorcentajeTareasUsuario(@PathVariable Long idUsuario) {
        try {
            int porcentaje = communityServices.obtenerPorcentajeTareasRealizadasIndividual(idUsuario);
            Map<String, Integer> respuesta = new HashMap<>();
            respuesta.put("porcentaje", porcentaje);
            return ResponseEntity.status(HttpStatus.OK).body(respuesta);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @GetMapping("/porcentajeTareasComunidad/{idComunidad}")
    public ResponseEntity<?> obtenerPorcentajeTareasComunidad(@PathVariable Long idComunidad) {
        try {
            int porcentaje = communityServices.obtenerPorcentajeTareasRealizadasGlobal(idComunidad);
            Map<String, Integer> respuesta = new HashMap<>();
            respuesta.put("porcentaje", porcentaje);
            return ResponseEntity.status(HttpStatus.OK).body(respuesta);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

}
