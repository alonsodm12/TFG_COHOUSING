FROM openjdk:17-jdk-slim

WORKDIR /app
# Copiamos el JAR generado por Maven
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8083

ENTRYPOINT ["java", "-jar", "app.jar"]
