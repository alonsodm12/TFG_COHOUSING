package com.gestioncomunidades.demo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpHeaders;
import org.springframework.web.reactive.function.client.WebClient;

@Configuration
public class WebClientConfig {
    @Bean
    public WebClient usuarioWebClient() {
        return WebClient.builder()
                .baseUrl("http://gestion-usuarios:8081")
                .defaultHeader(HttpHeaders.AUTHORIZATION, "Bearer " + "thisIsMysecregtfrdesww233eggtffeeddgkjjhhtdhttebd54ndhdhfhhhshs8877465sbbdd")
                .build();
    }
}
