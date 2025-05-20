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

    public static final String QUEUE_NAME = "comunidad.join.queue";
    public static final String EXCHANGE_NAME = "comunidad.exchange";
    public static final String ROUTING_KEY = "comunidad.join";
    public static final String RESPONSE_QUEUE = "comunidad.response.queue";
    public static final String RESPONSE_ROUTING_KEY = "comunidad.response";

    
    @Bean
    public MessageConverter jsonMessageConverter(){
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
    public Queue responseQueue() {
        return new Queue(RESPONSE_QUEUE, false);
    }
    
    @Bean
    public Binding responseBinding(Queue responseQueue, TopicExchange exchange) {
        return BindingBuilder.bind(responseQueue).to(exchange).with(RESPONSE_ROUTING_KEY);
    }
    


    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory, MessageConverter messageConverter) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(messageConverter);
        return rabbitTemplate;
    }


    
}
