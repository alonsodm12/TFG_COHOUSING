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
