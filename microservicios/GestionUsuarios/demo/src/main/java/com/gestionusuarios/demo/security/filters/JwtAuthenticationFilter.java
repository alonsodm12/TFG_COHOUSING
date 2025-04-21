package com.gestionusuarios.demo.security.filters;


import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.gestionusuarios.demo.services.CustomUserDetailsService;
import com.gestionusuarios.demo.utils.JwtUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;


/**
 * This file contains the implementation of a new filter that it is
 * going to control the request flow in the application
 * The mission of this filter is to defend the access to certain resources
 * to users logged in the application.
 */
 @Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private JwtUtil jwtUtil;
    private CustomUserDetailsService customUserDetailsService;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, CustomUserDetailsService customUserDetailsService) {
        this.jwtUtil = jwtUtil;
        this.customUserDetailsService = customUserDetailsService;
    }

    /**
     * Creación de un nuevo filtro para validar el token del usuario y autenticarlo
     * Primero se obtiene el token del header
     * 2. Se elimina el prefijo Bearer
     * 3. Se valida el token y de el se obtiene el nombre de usuario
     * 4. Se crea un objeto UsernamePasswordAuthenticationToken que representa al
     * usuario
     * Este objeto es clave pq es utilizado por Spring Security para saber que el
     * user esta autenticado
     * 5. Se almacena en el SecurityContextHolder, esto indica a Spring Security que
     * el user esta autenticado.
     * 
     * @return void
     */
     @Override
     protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) {

        final String authorizationHeader = request.getHeader("Authorization");

        try {
            if (authorizationHeader != null && authorizationHeader.startsWith("Bearer ")) {
                String token = authorizationHeader.substring(7);
                System.out.println("Token recibido: " + token);
                if (jwtUtil.validateJwtToken(token)) {
                    String username = jwtUtil.getUsernameFromToken(token);

                    String role = jwtUtil.getRoleFromToken(token);
                    
                    UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails,null, userDetails.getAuthorities());
                    System.out.println(userDetails.getAuthorities().toString());
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                    
                    SecurityContextHolder.getContext().setAuthentication(authentication);
                
                }
            }
            chain.doFilter(request, response);

        } catch (Exception e) {
            e.printStackTrace();
        }
    }

}

/*
 * En este caso, el servidor de autenticación es el propio microservicio de
 * gestión de usuarios, ya que es quien genera, firma y valida los tokens JWT.
 * Es decir, este microservicio cumple el rol de Identity Provider (IdP) en el
 * sistema.
 * ¿Qué hace este microservicio como servidor de autenticación?
 * 
 * Generar tokens JWT:
 * Cuando un usuario inicia sesión enviando sus credenciales (por ejemplo,
 * usuario y contraseña), el microservicio verifica las credenciales contra su
 * base de datos.
 * Si las credenciales son válidas, genera un token JWT firmado con una clave
 * secreta (almacenada de forma segura).
 * 
 * Firmar tokens JWT:
 * La firma del JWT asegura que el token no ha sido alterado.
 * Cualquier otro servicio que tenga acceso a la clave de firma puede validar la
 * autenticidad del token.
 * 
 * Validar tokens JWT:
 * El microservicio verifica la validez del token en solicitudes posteriores,
 * comprobando:
 * La firma del token.
 * Si el token ha expirado.
 * Si contiene los claims esperados (como el nombre de usuario, roles, etc.).
 * 
 * ¿Por qué es necesario un servidor de autenticación?
 * 
 * Un servidor de autenticación proporciona:
 * 
 * Centralización de la autenticación:
 * Un lugar único donde los usuarios se autentican, separando esta lógica de
 * otros microservicios.
 * Generación y gestión de tokens:
 * Proporciona tokens JWT que pueden ser usados por otros microservicios para
 * autorizar solicitudes.
 * Escalabilidad y modularidad:
 * Otros microservicios pueden delegar la autenticación al servidor de
 * autenticación y enfocarse en sus propias responsabilidades.
 * 
 * ¿Qué ocurre en este diseño con otros microservicios?
 * 
 * Uso de JWT:
 * Los demás microservicios no necesitan realizar la autenticación directamente.
 * Reciben el JWT en cada solicitud, lo validan (sin necesidad de consultar al
 * servidor de autenticación) y extraen la información necesaria.
 * 
 * Separación de responsabilidades:
 * El microservicio de gestión de usuarios se encarga de la autenticación y la
 * emisión de tokens.
 * Otros microservicios manejan únicamente la lógica de negocio.
 */