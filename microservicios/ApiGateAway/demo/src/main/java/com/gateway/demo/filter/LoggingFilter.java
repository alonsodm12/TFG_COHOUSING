package com.gateway.demo.filter;

import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.GatewayFilterChain;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

@Component
public class LoggingFilter implements GlobalFilter {
    @Override
    public Mono<Void> filter(ServerWebExchange exchange, GatewayFilterChain chain) {
        var request = exchange.getRequest();
        var method = request.getMethod();
        var path = request.getURI().getPath();

        System.out.println("[REQUEST] " + method + " " + path);

        return chain.filter(exchange).then(
            Mono.fromRunnable(() -> {
                var response = exchange.getResponse();
                System.out.println("[RESPONSE] status: " + response.getStatusCode());
            })
        );
    }
}