FROM openjdk:17-jdk-slim

LABEL maintainer="alonsodmx@gmail.com"

# Creamos directorio de trabajo
WORKDIR /app

# Copiamos el JAR generado por Maven
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

# Exponemos el puerto del gateway
EXPOSE 8084

# Ejecutamos la app
ENTRYPOINT ["java", "-jar", "app.jar"]
