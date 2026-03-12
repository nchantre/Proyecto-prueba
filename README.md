 
# MVP-Proyecto - Levantamiento de Infraestructura con Docker

## 1. Requisitos previos

Antes de iniciar, asegúrate de tener instalado:

- **Docker** (20+)
- **Docker Compose** (1.29+)
- Acceso a la terminal / PowerShell / WSL2 si estás en Windows

---

## 2. Levantamiento de APIs (Back-end)

1. Navega al directorio del back-end:

```bash
cd /mnt/d/ProyectoToyota/Proyecto-prueba/Back/MVP-proyecto
```

2. Construye las imágenes Docker de cada API:

```bash
docker build -t pagosapi -f Pagos.API/Dockerfile .
docker build -t pedidosapi -f Pedidos.API/Dockerfile .
docker build -t userapi -f User.API/Dockerfile .
```

3. Levanta los contenedores individualmente:

```bash
docker run -p 8080:8080 --name pagos-api-container pagosapi
docker run -p 8081:8080 --name pedidos-api-container pedidosapi
docker run -p 8082:8080 --name user-api-container userapi
```

> Ahora tus APIs deberían estar accesibles desde tu navegador o Postman:
> - Pagos API → http://localhost:8080  
> - Pedidos API → http://localhost:8081  
> - User API → http://localhost:8082  

4. **Opcional:** Levantar todos los servicios con Docker Compose:

```bash
docker compose -p servicios up --build
```

---

## 3. Levantamiento del Front-end (Angular)

1. Navega al directorio del front-end:

```bash
cd /mnt/d/ProyectoToyota/Proyecto-prueba/Front/MVP-proyecto
```

2. Construye la imagen Docker de Angular:

```bash
docker build -t angular-app .
```

3. Levanta el contenedor de Angular:

```bash
docker run -p 8083:80 --name mvp-container angular-app
```

> Accede a tu aplicación Angular en el navegador:  
> http://localhost:8083  

---

## 4. Tips y buenas prácticas

- Para detener todos los contenedores levantados con Docker Compose:

```bash
docker compose -p servicios down
```

- Para reconstruir todo y levantar de nuevo:

```bash
docker compose -p servicios up --build
```

- Ver logs de un contenedor:

```bash
docker logs -f mvp-container
```

- Abrir terminal dentro de un contenedor:

```bash
docker exec -it mvp-container sh
```

---

## 5. Estructura final de puertos

| Servicio            | Contenedor           | Puerto externo |
|--------------------|--------------------|----------------|
| Pagos API          | pagos-api-container | 8080           |
| Pedidos API        | pedidos-api-container | 8081         |
| User API           | user-api-container  | 8082           |
| Angular (Front)    | mvp-container       | 8083           |

---
## Revisar directorio Arquitectura 
# Microservicios MVP-Proyecto

## Descripción General

Este proyecto está diseñado con una arquitectura de **microservicios**, donde cada dominio de negocio funciona como un servicio independiente.  
Actualmente cuenta con los siguientes microservicios:

- **Pagos** (`Pagos.API`)  
- **Pedidos** (`Pedidos.API`)  
- **Usuarios** (`User.API`)  

Cada microservicio está desacoplado, cuenta con su propia lógica de negocio, y puede desplegarse y escalarse de manera independiente.

---

## Arquitectura

El proyecto sigue el patrón **Clean Architecture** (Arquitectura Limpia) combinada con microservicios:

### Capas por Microservicio

1. **API Layer (`*.API`)**  
   - Contiene los controladores HTTP y endpoints REST.  
   - Maneja middlewares, autenticación, logging y transformaciones de respuesta.  
   - Ejemplos: `Pagos.API/Controllers`, `Pedidos.API/Controllers`, `User.API/Controllers`.

2. **Application Layer (`*.Application`)**  
   - Implementa la lógica de aplicación: comandos, queries y handlers.  
   - Gestiona la interacción entre la capa de dominio y la infraestructura.  
   - Contiene servicios de apoyo, mapeos y orquestación de operaciones.

3. **Domain Layer (`*.Domain`)**  
   - Contiene las entidades y agregados del negocio.  
   - Define las reglas de negocio y contratos (interfaces) para repositorios y servicios externos.  
   - Maneja excepciones y validaciones de negocio.

4. **Infrastructure Layer (`*.Infrastructure`)**  
   - Implementa la persistencia de datos y la integración con sistemas externos.  
   - Contiene repositorios, especificaciones y servicios de integración con bases de datos.  
   - Ejemplos: `Pagos.Infrastructure/Database`, `Pedidos.Infrastructure/Mongo`.

### Beneficios de esta Arquitectura

- **Desacoplamiento:** Cada microservicio es independiente.  
- **Escalabilidad:** Permite escalar servicios críticos sin afectar a otros.  
- **Mantenibilidad:** Cambios en un microservicio no afectan a los demás.  
- **Testabilidad:** Cada capa puede probarse de manera aislada.  
- **Flexibilidad:** Facilidad para integrar nuevas funcionalidades o servicios.

### Comunicación entre Microservicios

- Se realiza mediante **APIs REST**.  
- Cada microservicio mantiene su **base de datos independiente**.  
- Esto permite implementar patrones de **resiliencia**, como retries, circuit breaker o colas de mensajería, si fuera necesario.

---

## Estructura de Carpetas General

```
├───Pagos.API
│   ├
│   ├───Controllers
│   ├───Extensions
│   ├───logs
│   ├───Middleware
│   ├───Properties
│   └───Response
├───Pagos.Application
│   ├
│   ├───Commands
│   ├───Handlers
│   ├───LogServices
│   ├───Mappings
│   ├───Owers
│   ├───Queries
│   └───Services
├───Pagos.Domain
│   ├
│   ├───Entities
│   ├───Exceptions
│   ├───Interfaces
│   ├───Repositories
│   └───Specifications
├───Pagos.Infrastructure
│   ├
│   ├───Database
│   ├───Mongo
│   ├───Repositories
│   └───Specifications
├───Pedidos.API
│   ├
│   ├───Controllers
│   ├───Extensions
│   ├───logs
│   ├───Middleware
│   ├───Properties
│   └───Response
├───Pedidos.Application
│   ├
│   ├───Handlers
│   ├───LogServices
│   ├───Mappings
│   ├───Owers
│   ├───Queries
│   └───Services
├───Pedidos.Domain
│   ├
│   ├───Entities
│   ├───Exceptions
│   ├───Interfaces
│   ├───Repositories
│   └───Specifications
├───Pedidos.Infrastructure
│   ├
│   ├───Database
│   ├───Mongo
│   ├───Repositories
│   └───Specifications
├───User.API
│   ├
│   ├───Controllers
│   ├───Extensions
│   ├───logs
│   ├───Middleware
│   ├───Properties
│   └───Response
├───User.Application
│   ├
│   ├───Commands
│   ├───Handlers
│   ├───LogServices
│   ├───Mappings
│   ├───Owers
│   ├───Queries
│   └───Services
├───User.Domain
│   │
│   ├───Entities
│   ├───Exceptions
│   ├───Interfaces
│   ├───Repositories
│   └───Specifications
└───User.Infrastructure
    │
    ├───Database
    ├───Mongo
    ├───Repositories
    └───Specifications
...
```

> Cada microservicio sigue la misma estructura de carpetas y capas, permitiendo coherencia y estandarización en todo el proyecto.

---

## Principios Clave

- **Clean Architecture:** Separación de responsabilidades en capas.  
- **Microservicios:** Independencia funcional y de despliegue.  
- **Autonomía:** Cada servicio tiene su propia lógica, datos y APIs.  
- **Escalabilidad horizontal:** Se pueden replicar servicios según demanda.  
- **Mantenibilidad y testabilidad:** Cambios localizados sin impacto global.




# MVPProyecto Front

Este repositorio contiene una aplicación Angular 20 con renderizado del lado del servidor (SSR) y despliegue en contenedor.

## Arquitectura

- **Framework principal**: Angular 20 generado con Angular CLI.
- **Lenguaje**: TypeScript.
- **SSR**: Implementado con `@angular/platform-server` y un servidor Express.
- **Estructura de carpetas**:
  - `src/app/core`: servicios globales, guardias e interceptores.
  - `src/app/features`: módulos de características (auth, pagos, pedidos, users), cada uno con su propio enrutamiento, páginas y servicios.
  - `src/app/layout`: componentes de diseño compartidos (navbar, sidebar).
  - `src/app/pages`: páginas principales como dashboard.
  - `src/app/shared`: modelos y utilidades compartidas.
  - `assets/` y `public/`: recursos estáticos.
  - `environments/`: configuración por ambiente.
