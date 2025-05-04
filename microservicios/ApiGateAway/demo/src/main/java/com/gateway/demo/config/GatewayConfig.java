package com.gateway.demo.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import com.gateway.demo.filter.JwtAuthenticationFilter;

@Configuration
public class GatewayConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public GatewayConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()

        // Rutas públicas (sin autenticación)
        .route("auth-routes", r -> r.path(
                    "/user/login",
                    "/user/register",
                    "/swagger-ui.html",
                    "/swagger-ui/**",
                    "/v3/api-docs/**"
                )
                .uri("http://gestion-usuarios:8081"))

        // Rutas protegidas para usuarios
        .route("user-protected-routes", r -> r.path(
                    "/user/usuario/**",
                    "/user/usuarios",
                    "/user/delete/**",
                    "/user/{username}",
                    "/user/usuario/{username}"
                )
                .filters(f -> f.filter(jwtAuthenticationFilter))
                .uri("http://gestion-usuarios:8081"))

        // Rutas protegidas para comunidades
        .route("community-protected-routes", r -> r.path(
                    "/comunidades/**"
                )
                .filters(f -> f.filter(jwtAuthenticationFilter))
                .uri("http://gestion-comunidades:8082"))

        .build();
    }
}
