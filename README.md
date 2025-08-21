# Trabajo de Fin de Grado: Sistema multiplataforma para la búsqueda y gestión de pisos compartidos

**Repositorio oficial del Trabajo de Fin de Grado de Alonso Doña Martínez – Universidad de Granada.**  

**Autor:** Alonso Doña Martínez  
**Tutor:** Luis López Escudero

## Descripción
Este proyecto consiste en el desarrollo de una plataforma de búsqueda y gestión para comunidades de co-housing siguiendo una arquitectura de microservicios, integración continua y tecnologías modernas.

La arquitectura general del proyecto se muestra en el siguiente diagrama, donde se reflejan los distintos microservicios y
la relación que existe entre ellos.
![Diagrama de arquitectura](./docs/arquitectura-frontend.png)
## Generación de la documentación

Para generar el PDF de la documentación, necesitas tener instalado **TeXLive** en tu sistema.  

Pasos para compilar la documentación:

Situarse en el directorio `doc`:
---

## Flujo a seguir en el desarrollo del proyecto
main             ← producción estable

develop          ← integración y pruebas

feature/frontend ← desarrollo del frontend

feature/usuarios ← desarrollo del microservicio "usuarios"

Crea ramas feature/* para trabajar cosas aisladas (uno por microservicio o pantalla).

Cuando termines una parte, haz PR a develop.

En develop se hacen pruebas e integración de los servicios.

Si todo va bien, mergeas develop a main para desplegar a producción.

## 🚧 Estado de Workflows y Cobertura

### CI/CD por rama

| Rama | CI/CD Status | Cobertura |
|------|--------------|-----------|
| `main` | [![Main CI](https://github.com/alonsodm12/TFG_COHOUSING/actions/workflows/ci-cd.yml/badge.svg?branch=main)](https://github.com/alonsodm12/TFG_COHOUSING/actions/workflows/ci-cd.yml) | [![codecov](https://codecov.io/gh/alonsodm12/TFG_COHOUSING/branch/main/graph/badge.svg?token=BEeK9qXuVn)](https://codecov.io/gh/alonsodm12/TFG_COHOUSING) |
| `GestionUsuarios` | [![Usuarios CI](https://github.com/alonsodm12/TFG_COHOUSING/actions/workflows/ci-cd.yml/badge.svg?branch=GestionUsuarios)](https://github.com/alonsodm12/TFG_COHOUSING/actions/workflows/ci-cd.yml) | |
| `front-end` | [![Frontend CI](https://github.com/alonsodm12/TFG_COHOUSING/actions/workflows/ci-cd.yml/badge.svg?branch=front-end)](https://github.com/alonsodm12/TFG_COHOUSING/actions/workflows/ci-cd.yml) | |
| `ci-cd` | [![CI Infra](https://github.com/alonsodm12/TFG_COHOUSING/actions/workflows/ci-cd.yml/badge.svg?branch=ci-cd)](https://github.com/alonsodm12/TFG_COHOUSING/actions/workflows/ci-cd.yml) | |

---

## 🔧 Tecnologías utilizadas en la realización del proyecto

- ⚙️ **Backend**: Java 17, Spring Boot, Maven  
- 🧪 **Testing**: JUnit, Jacoco, Codecov  
- 🌐 **Frontend**: React, TypeScript  
- 🐳 **Contenedores**: Docker & Docker Compose  
- 🛠️ **CI/CD**: GitHub Actions, Docker Hub  
- 🔐 **Seguridad**: Spring Security + JWT
- 📡 **Comunicación**: REST API, RabbitMQ  
- 🗃️ **BBDD**: PostgreSQL  

---

## 🧱 Estructura del repositorio

```plaintext
TFG_COHOUSING/
├── .github/workflows/       # Workflows de CI/CD
├── ci-cd/                   # Configuraciones de despliegue, Docker, Jenkins, etc.
├── docker/                  # Dockerfiles por microservicio
├── front-end/               # Aplicación React
├── microservicios/          # Carpeta principal de microservicios
│   ├── GestionUsuarios/     # Microservicio de usuarios
│   ├── GestionMaterial/     # Peticiones y gestión de material
│   ├── GestionEspacios/     # Gestión de espacios comunes
│   └── ...
├── docs/                    # Documentación técnica
├── README.md
└── .gitignore
```
## 🎯 Objetivos del proyecto

- ✅ Facilitar la convivencia organizada en comunidades de co-housing  
- ✅ Permitir la gestión autónoma por parte de los residentes  
- ✅ Automatizar flujos de petición, reserva y asignación de recursos  
- ✅ Aplicar buenas prácticas de ingeniería del software: DDD, CI/CD, testing, etc.  
- ✅ Servir como demostración de competencias en arquitectura y desarrollo backend/frontend  

---

## 🧪 Testing y cobertura

Todos los microservicios están integrados con **Jacoco** para generar cobertura de tests y con **Codecov** para visualizar los reportes de forma centralizada.

## ⚙️ Automatización CI/CD

Con cada **push** o **pull request** se ejecuta automáticamente el siguiente flujo:

- 🧪 **Tests** con Maven y Jacoco  
- 📈 **Subida de cobertura** a Codecov  
- 🐳 **Build de imágenes Docker**  
- ✅ **Validaciones y checks automáticos**  

🔧 Archivos del workflow: `.github/workflows/`


## 🧠 Metodología
- Diseño Basado en Domain-Driven Desing (DDD)
- Metodología ágil (Scrum)

