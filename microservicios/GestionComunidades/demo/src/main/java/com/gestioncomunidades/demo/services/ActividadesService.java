package com.gestioncomunidades.demo.services;

import java.awt.image.BufferedImage;
import java.io.ByteArrayOutputStream;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import javax.imageio.ImageIO;

import com.gestioncomunidades.demo.DTOs.NotificacionRepartoDTO;
import com.gestioncomunidades.demo.DTOs.UserDTO;
import com.gestioncomunidades.demo.config.RabbitMQConfig;
import com.gestioncomunidades.demo.models.Community;
import com.gestioncomunidades.demo.models.EstadoTarea;
import com.gestioncomunidades.demo.models.Tarea;
import com.gestioncomunidades.demo.repository.CommunityRepository;
import com.gestioncomunidades.demo.repository.TareaRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.amqp.rabbit.core.RabbitTemplate;

import com.itextpdf.kernel.geom.PageSize;
import com.itextpdf.kernel.pdf.PdfDocument;
import com.itextpdf.kernel.pdf.PdfWriter;
import com.itextpdf.layout.Document;
import com.itextpdf.layout.element.Image;
import com.itextpdf.layout.element.Paragraph;
import com.itextpdf.io.image.ImageDataFactory;
import com.itextpdf.layout.properties.HorizontalAlignment;
import com.itextpdf.layout.properties.TextAlignment;

import org.jfree.chart.ChartFactory;
import org.jfree.chart.ChartUtils;
import org.jfree.chart.JFreeChart;
import org.jfree.chart.plot.PlotOrientation;
import org.jfree.data.category.DefaultCategoryDataset;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.*;

import java.util.Base64;

@Service
public class ActividadesService {

    private final TareaRepository tareaRepository;
    private final CommunityRepository communityRepository;
    private final RabbitTemplate rabbitTemplate;
    private final WebClient usuarioWebClient;
    private final SendGrid sendGrid;

    @Autowired
    public ActividadesService(TareaRepository tareaRepository, WebClient usuarioWebClient,
                              CommunityRepository communityRepository, RabbitTemplate rabbitTemplate,
                              SendGrid sendGrid) {
        this.tareaRepository = tareaRepository;
        this.communityRepository = communityRepository;
        this.rabbitTemplate = rabbitTemplate;
        this.usuarioWebClient = usuarioWebClient;
        this.sendGrid = sendGrid;
    }

    @Transactional
    public void repartirTareasCiclico(Long idComunidad) {
        Community comunidad = communityRepository.findById(idComunidad).orElseThrow();
        List<Long> usuarios = comunidad.getIntegrantes();
        if (usuarios.isEmpty()) return;

        List<Tarea> tareas = tareaRepository.findByidComunidad(idComunidad);
        if (tareas.isEmpty()) return;

        int totalUsuarios = usuarios.size();
        int indiceActual = comunidad.getIndiceRotacion();

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
        }

        tareaRepository.saveAll(tareas);
        comunidad.setIndiceRotacion(indiceActual);
    }

    @Scheduled(cron = "0 0 23 * * SUN")
    @Transactional
    public void repartirTareasSemanalmente() {
        List<Community> comunidades = communityRepository.findAll();
        LocalDate hoy = LocalDate.now();

        for (Community comunidad : comunidades) {
            repartirTareasCiclico(comunidad.getId());
            generarResumenSemanal(comunidad, hoy);

            NotificacionRepartoDTO payload = new NotificacionRepartoDTO(
                comunidad.getId(),
                comunidad.getName(),
                "Se ha realizado el reparto de tareas en tu comunidad",
                new ArrayList<>(comunidad.getIntegrantes())
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
            Files.createDirectories(ruta.getParent());
            if (Files.exists(ruta)) Files.delete(ruta);

            PdfWriter writer = new PdfWriter(Files.newOutputStream(ruta));
            PdfDocument pdf = new PdfDocument(writer);
            Document doc = new Document(pdf, PageSize.A4);

            doc.add(new Paragraph("SHAREHOUSE")
                    .setFontSize(24).setBold().setTextAlignment(TextAlignment.CENTER).setMarginBottom(20));
            doc.add(new Paragraph("Resumen semanal")
                    .setFontSize(22).setBold().setTextAlignment(TextAlignment.CENTER));

            InputStream is = getClass().getResourceAsStream("/images/final2.png");
            Path tempFile = Files.createTempFile("final2", ".png");
            Files.copy(is, tempFile, StandardCopyOption.REPLACE_EXISTING);
            Image logo = new Image(ImageDataFactory.create(tempFile.toString()));
            logo.scaleToFit(200, 200);
            logo.setHorizontalAlignment(HorizontalAlignment.CENTER);
            doc.add(logo);

            doc.add(new Paragraph("Comunidad: " + comunidad.getName()).setFontSize(16).setMarginBottom(10));

            List<UserDTO> usuarios = obtenerUsuariosPorComunidad(comunidad.getId());

            int totalTareasCompletadas = 0;
            int totalTareasSinCompletar = 0;
            long totalTiempoInvertido = 0;
            DefaultCategoryDataset dataset = new DefaultCategoryDataset();

            for (UserDTO integrante : usuarios) {
                doc.add(new Paragraph("Participante: " + integrante.username()).setBold());

                List<Tarea> tareas = tareaRepository.findByUsuariosParticipantes(integrante.id());
                int tareasCompletadas = 0, tareasSinCompletar = 0;
                long tiempoInvertido = 0;

                for (Tarea tarea : tareas) {
                    if (tarea.getEstado() == EstadoTarea.COMPLETADA) tareasCompletadas++;
                    else tareasSinCompletar++;
                    tiempoInvertido += tarea.getDuracion();
                }

                doc.add(new Paragraph(" - Tareas completadas: " + tareasCompletadas));
                doc.add(new Paragraph(" - Tareas sin completar: " + tareasSinCompletar));
                doc.add(new Paragraph(" - Tiempo invertido: " + tiempoInvertido + " minutos"));
                doc.add(new Paragraph(" "));

                dataset.addValue(tareasCompletadas, "Completadas", integrante.username());
                dataset.addValue(tareasSinCompletar, "Sin completar", integrante.username());

                totalTareasCompletadas += tareasCompletadas;
                totalTareasSinCompletar += tareasSinCompletar;
                totalTiempoInvertido += tiempoInvertido;
            }

            doc.add(new Paragraph("Resumen Total").setFontSize(18).setBold().setMarginTop(20));
            doc.add(new Paragraph("Tareas completadas: " + totalTareasCompletadas));
            doc.add(new Paragraph("Tareas sin completar: " + totalTareasSinCompletar));
            doc.add(new Paragraph("Tiempo invertido total: " + totalTiempoInvertido + " minutos"));

            // Gráfico
            JFreeChart barChart = ChartFactory.createBarChart(
                    "Tareas por Participante",
                    "Participante",
                    "Cantidad",
                    dataset,
                    PlotOrientation.VERTICAL,
                    true, true, false
            );
            BufferedImage chartImage = barChart.createBufferedImage(500, 300);
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            ChartUtils.writeBufferedImageAsPNG(baos, chartImage);
            Image chart = new Image(ImageDataFactory.create(baos.toByteArray()));
            chart.setHorizontalAlignment(HorizontalAlignment.CENTER);
            doc.add(chart);

            doc.close();

            // Enviar email con SendGrid
            Email from = new Email("sharespacemail@gmail.com");
            String subject = "Resumen semanal de la comunidad " + comunidad.getName();
            Content content = new Content("text/plain", "Archivo con el resumen semanal de la comunidad.");

            Mail mail = new Mail();
            mail.setFrom(from);
            mail.setSubject(subject);
            mail.addContent(content);

            // Adjuntar PDF
            byte[] pdfBytes = Files.readAllBytes(ruta);
            Attachments attachments = new Attachments();
            attachments.setContent(Base64.getEncoder().encodeToString(pdfBytes));
            attachments.setType("application/pdf");
            attachments.setFilename("ResumenSemanal_" + semana + ".pdf");
            attachments.setDisposition("attachment");

            Personalization personalization = new Personalization();
            //for (UserDTO u : usuarios) {
              //  personalization.addTo(new Email(u.email()));
            //}
            personalization.addTo(new Email("alonsodmx@gmail.com"));
            mail.addPersonalization(personalization);

            mail.addAttachments(attachments);

            Request request = new Request();
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());

            Response response = sendGrid.api(request);
            System.out.println("SendGrid response: " + response.getStatusCode());

        } catch (Exception e) {
            e.printStackTrace();
            throw new RuntimeException("Error envio correo");
        }
    }
}
