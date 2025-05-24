package com.gestionusuarios.demo.config;

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
    
    //BUZON DEL MICRO GESTION DE USUARIOS
    public static final String EXCHANGE_NAME = "usuario.exchange";

    //ROUTING KEY
    public static final String USER_COMMUNITY_UPDATE_ROUTING_KEY = "usuario.comunidad.update";

    //QUEUE A LA QUE ENRUTAR EL EVENTO

    public static final String USER_COMMUNITY_UPDATE_QUEUE = "usuario.comunidad.update.queue";

    @Bean
    public org.springframework.amqp.support.converter.MessageConverter jsonMessageConverter(){
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
