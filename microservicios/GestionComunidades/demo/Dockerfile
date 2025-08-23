FROM openjdk:17-jdk-slim

LABEL maintainer="alonsodmx@gmail.com"

WORKDIR /app

# Instalamos las librerías necesarias para evitar problemas con fuentes y AWT headless
RUN apt-get update && apt-get install -y \
    curl \
    libfreetype6 \
    fontconfig \
    libxrender1 \
    libxtst6 \
    libxi6 \
    libxext6 && \
    rm -rf /var/lib/apt/lists/*

ENV JAVA_TOOL_OPTIONS="-Djava.awt.headless=true"

# Copiamos el JAR generado por Maven
COPY target/demo-0.0.1-SNAPSHOT.jar app.jar

EXPOSE 8082

ENTRYPOINT ["java", "-jar", "app.jar"]
