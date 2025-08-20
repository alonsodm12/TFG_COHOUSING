FROM openjdk:17-jdk-slim

LABEL maintainer="alonsodmx@gmail.com"

# Creamos directorio de trabajo
WORKDIR /app

# Exponemos el puerto del gateway
EXPOSE 8084

# Ejecutamos la app
ENTRYPOINT ["java", "-jar", "app.jar"]
