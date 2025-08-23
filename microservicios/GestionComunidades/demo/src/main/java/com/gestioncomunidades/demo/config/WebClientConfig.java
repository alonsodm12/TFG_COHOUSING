package com.gestioncomunidades.demo.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {

    @Value("${users.service.url}")
    private String usuariosUrl;

    @Bean
    public WebClient usuarioWebClient() {
        return WebClient.builder()
                .baseUrl(usuariosUrl)
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + "thisIsMysecregtfrdesww233eggtffeeddgkjjhhtdhttebd54ndhdhfhhhshs8877465sbbdd")
                .build();
    }
}
