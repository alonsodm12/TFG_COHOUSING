package com.solicitudes.demo.configuration;

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

    public static final String QUEUE_NAME = "comunidad.join.queue";
    public static final String EXCHANGE_NAME = "comunidad.exchange";
    public static final String ROUTING_KEY = "comunidad.join";


    //EVENTO ENVIAR A USUARIOS EL REPARTO DE TAREAS
    public static final String REPARTO_TAREAS_QUEUE = "usuario.comunidad.repartoTareas.queue";
    public static final String REPARTO_TAREAS_ROUTING_KEY = "usuario.comunidad.repartoTareas";

    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public Queue queue() {
        return new Queue(QUEUE_NAME, false);
    }

    @Bean
    public TopicExchange exchange() {
        return new TopicExchange(EXCHANGE_NAME);
    }

    @Bean
    public Binding binding(Queue queue, TopicExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(ROUTING_KEY);
    }

    @Bean
    public Queue tareasqueue(){
        return new Queue(REPARTO_TAREAS_QUEUE,false);
    }

    @Bean
    public Binding Tareasbinding(Queue tareasqueue,TopicExchange exchange){
        return BindingBuilder.bind(tareasqueue).to(exchange).with(REPARTO_TAREAS_ROUTING_KEY);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter);
        return rabbitTemplate;
    }
}
