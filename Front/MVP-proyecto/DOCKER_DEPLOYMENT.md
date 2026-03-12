# Despliegue con Docker

Esta aplicación Angular con SSR puede desplegarse fácilmente usando Docker.

## Requisitos previos

- Docker instalado en tu sistema
- Docker Compose (opcional, pero recomendado)

## Construcción y ejecución

### Opción 1: Usando Docker Compose (Recomendado)

1. **Construir y ejecutar:**
   ```bash
   docker-compose up --build
   ```

2. **Ejecutar en segundo plano:**
   ```bash
   docker-compose up -d --build
   ```

3. **Detener:**
   ```bash
   docker-compose down
   ```

### Opción 2: Usando Docker directamente

1. **Construir la imagen:**
   ```bash
   docker build -t angular-ssr-app .
   ```

2. **Ejecutar el contenedor:**
   ```bash
   docker run -p 4000:4000 angular-ssr-app
   ```

## Acceso a la aplicación

Una vez desplegada, la aplicación estará disponible en:
- **http://localhost:4000**

## Configuración adicional

### Variables de entorno

Puedes configurar variables de entorno creando un archivo `.env` en la raíz del proyecto:

```env
NODE_ENV=production
PORT=4000
```

### Puerto personalizado

Para cambiar el puerto, modifica el `docker-compose.yml`:

```yaml
ports:
  - "8080:4000"  # Cambia 8080 por el puerto deseado
```

## Producción

Para despliegue en producción:

1. **Optimización:**
   - Asegúrate de que `npm run build` genera los archivos optimizados
   - Considera usar un servidor web como Nginx como proxy reverso

2. **Escalado:**
   - Usa Docker Swarm o Kubernetes para múltiples instancias
   - Implementa balanceo de carga

3. **Monitoreo:**
   - Agrega logs y métricas según necesites

## Troubleshooting

- **Puerto ocupado:** Cambia el puerto en `docker-compose.yml`
- **Errores de build:** Verifica que todos los archivos estén presentes
- **Problemas de memoria:** Aumenta los límites de Docker si es necesario