package com.gestionusuarios.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

}


//Me pasaba lo siguiente defino un bean con SecurityPasswrod en Security config
//Ese bean lo usaba en CustomAuthProvider como lo necesitaba por constructor no
//iba tuve que meterle a el el bean en esa clase