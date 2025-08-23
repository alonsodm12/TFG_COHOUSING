FROM openjdk:17-jdk-slim

LABEL maintainer="alonsodmx@gmail.com"

WORKDIR /app

# Copiamos el JAR generado por Maven
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8081

ENTRYPOINT ["java", "-jar", "app.jar"]
