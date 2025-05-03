package com.gateway.demo.config;

import org.springframework.cloud.gateway.route.RouteLocator;
import org.springframework.cloud.gateway.route.builder.RouteLocatorBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.gateway.demo.filter.JwtAuthenticationFilter;

@Configuration
public class GatewayConfig {

    private JwtAuthenticationFilter jwtAuthenticationFilter;

    public GatewayConfig(JwtAuthenticationFilter jwtAuthenticationFilter){
        this.jwtAuthenticationFilter=jwtAuthenticationFilter;
    }

    @Bean
    public RouteLocator customRouteLocator(RouteLocatorBuilder builder) {
        return builder.routes()

                // Rutas públicas (sin token)
                .route("public-routes", r -> r.path(
                            "/public/**", 
                            "/user/login", 
                            "/user/register",
                            "/swagger-ui/**",
                            "/v3/api-docs/**",
                            "/swagger-ui.html",
                            "/user/delete"
                        )
                        .uri("http://localhost:8081"))

                // Rutas protegidas
                .route("secured-user-service", r -> r.path("/user/**")
                    .filters(f -> f.filters(jwtAuthenticationFilter))    
                    .uri("http://localhost:8081"))

                .build();
    }
}
