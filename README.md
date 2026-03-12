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


