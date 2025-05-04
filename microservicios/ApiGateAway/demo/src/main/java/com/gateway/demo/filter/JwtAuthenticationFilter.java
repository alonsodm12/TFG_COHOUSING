package com.gateway.demo.filter;


import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;

import com.gateway.demo.util.JwtUtil;

import reactor.core.publisher.Mono;

//WebFlux framework reactivo para desarrollar aplicaciones web de 
//manera no bloqueante
//Contrario a MVC que bloquea aquí es un modelo reactivo
//se maneja de manera asíncrona.

@Component
public class JwtAuthenticationFilter implements GatewayFilter {

    private final JwtUtil jwtUtil;

    public JwtAuthenticationFilter(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain){

        ServerHttpRequest request = exchange.getRequest();

        final String authorizationHeader = request.getHeaders().getFirst("Authorization");

        if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
            String token = authorizationHeader.substring(7);  // Remove "Bearer " prefix

            if (jwtUtil.validateJwtToken(token)) {
                // Token válido, continuar con la cadena de filtros
                return chain.filter(exchange);
            }
        }

        // Token no válido o ausente -> respuesta 401
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED);
        return exchange.getResponse().setComplete();
    
    }

}
