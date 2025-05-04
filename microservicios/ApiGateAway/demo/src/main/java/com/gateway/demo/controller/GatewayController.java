package com.gateway.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GatewayController {
    
    @GetMapping("/")
    public String home() {
        return "Gateway activo";
    }
}
