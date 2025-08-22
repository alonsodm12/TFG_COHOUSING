package com.gateway.controller;

import static org.mockito.Mockito.when;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.reactive.AutoConfigureWebTestClient;
import org.springframework.boot.test.context.SpringBootTest;

import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.reactive.server.WebTestClient;

import com.gateway.demo.DemoApplication;
import com.gateway.demo.util.JwtUtil;

@SpringBootTest(classes = DemoApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
@AutoConfigureWebTestClient
@ActiveProfiles("test")
class GatewayControllerTest {

    @Autowired
    private WebTestClient webTestClient;

    @MockitoBean
    JwtUtil jwtUtil;

    @Test
    void testRutaUsuarios() {


        when(jwtUtil.validateJwtToken("tokenValido")).thenReturn(true);

        webTestClient.get()
                .uri("/user/usuarios")
                .cookie("auth-token", "tokenValido")
                .exchange()
                .expectStatus().is5xxServerError();
    }

    @Test
    void testRutaSolicitudes() {

        when(jwtUtil.validateJwtToken("tokenValido")).thenReturn(true);

        webTestClient.post()
                .uri("/solicitudes/1")
                .cookie("auth-token", "tokenValido")
                .exchange()
                .expectStatus().is5xxServerError();
    }
}

