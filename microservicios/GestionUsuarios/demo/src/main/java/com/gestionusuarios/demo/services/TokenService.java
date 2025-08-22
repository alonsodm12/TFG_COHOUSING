package com.gestionusuarios.demo.services;


import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.oauth2.jwt.BadJwtException;
import org.springframework.security.oauth2.jwt.JwsHeader;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtClaimsSet;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtEncoder;
import org.springframework.security.oauth2.jwt.JwtEncoderParameters;
import org.springframework.stereotype.Service;

import com.gestionusuarios.demo.models.User;

@Service
public class TokenService {
    private static final Logger logger = LoggerFactory.getLogger(TokenService.class);
    @Value("${jwt.secret}")
    private String secretKey;
    @Value("${jwt.expiration}")
    private int jwtExpiration;

    private final JwtEncoder jwtEncoder;
    private final JwtDecoder jwtDecoder;

    public TokenService(JwtEncoder jwtEncoder,JwtDecoder jwtDecoder){
        this.jwtDecoder = jwtDecoder;
        this.jwtEncoder = jwtEncoder;
    }

    public String generateToken(Authentication authentication) {
        Instant now = Instant.now();
        
        String username = authentication.getName(); // siempre disponible
        
        // Obtener rol del primer authority (si hay alguno), o "USER" por defecto
        String role = authentication.getAuthorities().stream()
            .findFirst()
            .map(GrantedAuthority::getAuthority)
            .orElse("USER");
        
        JwtClaimsSet claims = JwtClaimsSet.builder()
            .subject(username)
            .claim("role", role)
            .issuedAt(now)
            .expiresAt(now.plus(jwtExpiration, ChronoUnit.MINUTES))
            .build();

        var jwtEncoderParameters = JwtEncoderParameters.from(
            JwsHeader.with(org.springframework.security.oauth2.jose.jws.MacAlgorithm.HS256).build(),
            claims
        );
        return this.jwtEncoder.encode(jwtEncoderParameters).getTokenValue();
    }

    public String getUserFromToken(String token){
        Jwt jwtToken = jwtDecoder.decode(token);
        return jwtToken.getSubject();
    }

    public String getRoleFromToken(String token){
        Jwt jwtToken = jwtDecoder.decode(token);
        return jwtToken.getClaim("role");
    }

    public boolean validateToken(String token){
        try{
            jwtDecoder.decode(token);
            return true;
        }catch (Exception e){
            logger.error("[USER] : Error while trying to validate token", e);
            throw new BadJwtException("Error while trying to validate token");
        
        }
    }
}
