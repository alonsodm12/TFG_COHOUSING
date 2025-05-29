FROM openjdk:17-jdk-slim

LABEL maintainer = "alonsodmx@gmail.com"

VOLUME /tmp

EXPOSE 8081

ARG JAR_FILE=target/demo-0.0.1-SNAPSHOT.jar

ADD ${JAR_FILE} websocket-demo.jar

RUN mkdir -p /app/uploads

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/ ./urandom","-jar","/websocket-demo.jar"]