FROM openjdk:17-jdk-slim

LABEL maintainer = "alonsodmx@gmail.com"

VOLUME /tmp

EXPOSE 8083

ARG JAR_FILE=target/demo-0.0.1-SNAPSHOT.jar

ADD ${JAR_FILE} solicitudes.jar


ENTRYPOINT ["java","-Djava.security.egd=file:/dev/ ./urandom","-jar","/solicitudes.jar"]