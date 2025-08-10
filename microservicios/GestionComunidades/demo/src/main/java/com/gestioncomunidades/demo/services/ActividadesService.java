package com.gestioncomunidades.demo.services;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import com.gestioncomunidades.demo.DTOs.NotificacionRepartoDTO;

import com.gestioncomunidades.demo.DTOs.UserDTO;
import com.gestioncomunidades.demo.config.RabbitMQConfig;
import com.gestioncomunidades.demo.models.Community;
import com.gestioncomunidades.demo.models.EstadoTarea;
import com.gestioncomunidades.demo.models.Tarea;
import com.gestioncomunidades.demo.repository.CommunityRepository;
import com.gestioncomunidades.demo.repository.TareaRepository;
import com.itextpdf.io.image.ImageData;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;

import jakarta.mail.internet.MimeMessage;
import jakarta.transaction.Transactional;

@Service
public class ActividadesService {
    private TareaRepository tareaRepository;
    private CommunityRepository communityRepository;
    private RabbitTemplate rabbitTemplate;
    private final WebClient usuarioWebClient;
    @Autowired
    private JavaMailSender javaMailSender;

    public ActividadesService(TareaRepository tareaRepository, WebClient usuarioWebClient,CommunityRepository communityRepository,RabbitTemplate rabbitTemplate) {
        this.tareaRepository = tareaRepository;
        this.communityRepository = communityRepository;
        this.rabbitTemplate = rabbitTemplate;
        this.usuarioWebClient = usuarioWebClient;
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
            tarea.setEstado(EstadoTarea.PENDIENTE);
            tarea.setFechaTope(null);
            tareaRepository.save(tarea);
        }

        comunidad.setIndiceRotacion(indiceRotacion);
    }


    @Scheduled(cron = "0 */3 * * * *")
    @Transactional
    public void repartirTareasSemanalmente() {
        List<Community> comunidades = communityRepository.findAll();
        LocalDate hoy = LocalDate.now();

        for (Community comunidad : comunidades) {
            repartirTareasCiclico(comunidad.getId());
            //generarResumenSemanal(comunidad, hoy);

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

    public List<UserDTO> obtenerUsuariosPorComunidad(Long idComunidad) {
        return usuarioWebClient.get()
                .uri("/user/obtenerUsuariosPorComunidad/{idComunidad}", idComunidad)
                .retrieve()
                .bodyToFlux(UserDTO.class)
                .collectList()
                .block();
    }
    

    public void generarResumenSemanal(Community comunidad, LocalDate semana) {
        String nombreArchivo = "/app/resumenes/" + comunidad.getId() + "/" + semana + ".pdf";
    
        Path ruta = Paths.get(nombreArchivo);
    
        try {
            // Crear carpetas si no existen
            Files.createDirectories(ruta.getParent());
            // Si el archivo ya existe, lo borramos para reemplazarlo
            if (Files.exists(ruta)) {
                Files.delete(ruta);
            }
            PdfWriter writer = new PdfWriter(Files.newOutputStream(ruta));
            PdfDocument pdf = new PdfDocument(writer);
            Document doc = new Document(pdf);
    
            // Título
            doc.add(new Paragraph("SHAREHOUSE")
                .setFontSize(24)
                .setBold()
                .setTextAlignment(TextAlignment.CENTER)
                .setMarginBottom(20));
            doc.add(new Paragraph("Resumen semanal").setFontSize(22).setBold());

            String imagePath = "/app/uploads/prueba-logo.png";  // Puede ser ruta local o URL
            ImageData imageData = ImageDataFactory.create(imagePath);
            Image image = new Image(imageData);

            // Opcional: ajustar tamaño
            image.scaleToFit(200, 200); // ancho máximo 200, alto máximo 200

            // Opcional: centrar imagen
            image.setHorizontalAlignment(HorizontalAlignment.CENTER);

            doc.add(image);
            doc.add(new Paragraph("Comunidad: " + comunidad.getName()).setFontSize(16).setMarginBottom(10));
    
            // Obtener usuarios por comunidad (suponiendo que ya tienes implementado este método)
            List<UserDTO> usuarios = obtenerUsuariosPorComunidad(comunidad.getId());
    
            // Variables para resumen total
            int totalTareasCompletadas = 0;
            int totalTareasSinCompletar = 0;
            long totalTiempoInvertido = 0; // en minutos o la unidad que uses
    
            for (UserDTO integrante : usuarios) {
                doc.add(new Paragraph("Participante: " + integrante.username()).setBold());

                // Suponiendo que tienes un método para obtener tareas del usuario en esa semana
                List<Tarea> tareas = tareaRepository.findByUsuariosParticipantes(integrante.id());
    
                int tareasCompletadas = 0;
                int tareasSinCompletar = 0;
                long tiempoInvertido = 0;
    
                for (Tarea tarea : tareas) {
                    if (tarea.getEstado() == EstadoTarea.COMPLETADA) {
                        tareasCompletadas++;
                    } else {
                        tareasSinCompletar++;
                    }
                    tiempoInvertido += tarea.getDuracion(); // o como calcules el tiempo invertido
                }
    
                // Añadir resumen de ese usuario
                doc.add(new Paragraph(" - Tareas completadas: " + tareasCompletadas));
                doc.add(new Paragraph(" - Tareas sin completar: " + tareasSinCompletar));
                doc.add(new Paragraph(" - Tiempo invertido: " + tiempoInvertido + " minutos"));
                doc.add(new Paragraph(" ")); // línea en blanco para separación
    
                // Sumar para el resumen total
                totalTareasCompletadas += tareasCompletadas;
                totalTareasSinCompletar += tareasSinCompletar;
                totalTiempoInvertido += tiempoInvertido;
            }
    
            // Añadir resumen total
            doc.add(new Paragraph("Resumen Total").setFontSize(18).setBold().setMarginTop(20));
            doc.add(new Paragraph("Tareas completadas: " + totalTareasCompletadas));
            doc.add(new Paragraph("Tareas sin completar: " + totalTareasSinCompletar));
            doc.add(new Paragraph("Tiempo invertido total: " + totalTiempoInvertido + " minutos"));
    
            doc.close();
             // Enviar el email a cada usuario con el archivo adjunto
            FileSystemResource file = new FileSystemResource(new File(nombreArchivo));
            MimeMessage message = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            helper.setTo("alonsodmx@gmail.com");
            helper.setSubject("Resumen semanal de la comunidad " + comunidad.getName());
            helper.setText("Adjunto encontrarás el resumen semanal de la comunidad.");
            helper.setFrom("alonsodmx@gmail.com");
            // Adjuntar el PDF guardado en disco
            helper.addAttachment("ResumenSemanal_" + semana + ".pdf", file);

            javaMailSender.send(message);
            for (UserDTO integrante : usuarios) {

            }
    
        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error en la generación del resumen semanal", e);
        }
    }
}
