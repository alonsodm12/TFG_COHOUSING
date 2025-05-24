package com.gestioncomunidades.demo.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;

@Configuration
public class RabbitMQConfig {

    //BUZON DEL MICRO GESTION DE COMUNIDADES
    public static final String EXCHANGE_NAME = "comunidad.exchange";

    //EVENTO ENVIAR MENSAJE A SOLICITUDES PARA CREAR LA SOLICITUD AL ADMIN
    //COLA A LA QUE VA A ENRUTAR EL BUZON
    public static final String QUEUE_NAME = "comunidad.join.queue";
    //CLAVE QUE IDENTIFICA LA COLA
    public static final String ROUTING_KEY = "comunidad.join";

    //EVENTO ESCUCHAR UNIR USUARIO A COMUNIDAD - TRAS ADMIN ACEPTAR
    public static final String RESPONSE_QUEUE = "comunidad.response.queue";
    public static final String RESPONSE_ROUTING_KEY = "comunidad.response";


    //EVENTO ENVIAR A USUARIO EL ID DE LA COMUNIDAD A LA QUE PERTENECE
    public static final String USER_COMMUNITY_UPDATE_QUEUE = "usuario.comunidad.update.queue";
    public static final String USER_COMMUNITY_UPDATE_ROUTING_KEY = "usuario.comunidad.update";

    /**************************************************************************/
    
    //BEAN PARA CONVERTIR DTOs A JSON
    @Bean
    public MessageConverter jsonMessageConverter(){
        return new Jackson2JsonMessageConverter();
    }

    //BEAN GENERAL RABBIT TEMPLATE
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter);
        return rabbitTemplate;
    }

    //EXCHANGE GENERAL DEL MICRO
    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    /**************************************************************************/

    //COLA EVENTO ENVIAR MENSAJE A SOLICITUDES
    @Bean
    public Queue queue() {
        return new Queue(QUEUE_NAME, false);
    }

    //BINDING EVENTO ENVIAR MENSAJE A SOLICITUDES
    @Bean
    public Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY);
    }

    /**************************************************************************/
    
    //COLA EVENTO ESCUCHAR UNIR USUARIO A COMUNIDAD
    @Bean
    public Queue responseQueue() {
        return new Queue(RESPONSE_QUEUE, false);
    }
    
    //SU CORRESPONDIENTE BINDING
    @Bean
    public Binding responseBinding(Queue responseQueue, TopicExchange exchange) {
        return BindingBuilder.bind(responseQueue).to(exchange).with(RESPONSE_ROUTING_KEY);
    }
    
    /**************************************************************************/

    //COLA EVENTO ENVIAR A USUARIO EL ID DE LA COMUNIDAD A LA QUE PERTENECE

    @Bean
    public Queue userCommunityUpdateQueue() {
        return new Queue(USER_COMMUNITY_UPDATE_QUEUE, false);
    }

    // NUEVO binding para la cola de actualización de comunidad
    @Bean
    public Binding userCommunityUpdateBinding(Queue userCommunityUpdateQueue, TopicExchange exchange) {
        return BindingBuilder.bind(userCommunityUpdateQueue).to(exchange).with(USER_COMMUNITY_UPDATE_ROUTING_KEY);
    } 


    
}
