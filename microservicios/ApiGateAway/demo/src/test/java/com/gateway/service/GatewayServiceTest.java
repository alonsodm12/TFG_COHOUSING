package com.gateway.service;

import com.gateway.demo.filter.JwtAuthenticationFilter;
import com.gateway.demo.util.JwtUtil;
import org.junit.jupiter.api.Test;

import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpCookie;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;
import reactor.test.StepVerifier;

import static org.mockito.Mockito.*;

public class GatewayServiceTest {

    @Test
    void testFiltroTokenValido() {
        
        JwtUtil jwtUtil = mock(JwtUtil.class);
        GatewayFilterChain chain = mock(GatewayFilterChain.class);
        ServerWebExchange exchange = mock(ServerWebExchange.class);
        ServerHttpRequest request = mock(ServerHttpRequest.class);
        ServerHttpResponse response = mock(ServerHttpResponse.class);
        HttpCookie cookie = mock(HttpCookie.class);

        // Configurar mocks
        when(cookie.getValue()).thenReturn("tokenValido");
        LinkedMultiValueMap<String, HttpCookie> cookies = new LinkedMultiValueMap<>();
        cookies.add("auth-token", cookie);
        when(request.getCookies()).thenReturn(cookies);
        when(exchange.getRequest()).thenReturn(request);
        when(exchange.getResponse()).thenReturn(response);
        when(jwtUtil.validateJwtToken("tokenValido")).thenReturn(true);
        when(chain.filter(exchange)).thenReturn(Mono.empty());

        // Ejecutar filtro
        JwtAuthenticationFilter filter = new JwtAuthenticationFilter(jwtUtil);
        Mono<Void> result = filter.filter(exchange, chain);

        // Verificaciones
        StepVerifier.create(result)
                .verifyComplete();

        verify(chain, times(1)).filter(exchange);
        verify(response, never()).setComplete();
    }

    @Test
    void testFiltroTokenInvalido() {
        // Mocks
        JwtUtil jwtUtil = mock(JwtUtil.class);
        GatewayFilterChain chain = mock(GatewayFilterChain.class);
        ServerWebExchange exchange = mock(ServerWebExchange.class);
        ServerHttpRequest request = mock(ServerHttpRequest.class);
        ServerHttpResponse response = mock(ServerHttpResponse.class);
        HttpCookie cookie = mock(HttpCookie.class);

        // Configurar mocks
        when(cookie.getValue()).thenReturn("tokenInvalido");
        LinkedMultiValueMap<String, HttpCookie> cookies = new LinkedMultiValueMap<>();
        cookies.add("auth-token", cookie);
        when(request.getCookies()).thenReturn(cookies);
        when(exchange.getRequest()).thenReturn(request);
        when(exchange.getResponse()).thenReturn(response);
        when(jwtUtil.validateJwtToken("tokenInvalido")).thenReturn(false);
        when(response.setComplete()).thenReturn(Mono.empty());

        // Ejecutar filtro
        JwtAuthenticationFilter filter = new JwtAuthenticationFilter(jwtUtil);
        Mono<Void> result = filter.filter(exchange, chain);

        // Verificaciones
        StepVerifier.create(result)
                .verifyComplete();

        verify(response, times(1)).setStatusCode(HttpStatus.UNAUTHORIZED);
        verify(chain, never()).filter(exchange);
    }
}
