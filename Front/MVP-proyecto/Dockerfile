# --------------------------------------
# Etapa 1: Build Angular
# --------------------------------------
FROM node:20-alpine AS build

WORKDIR /app

# Copia archivos de dependencias
COPY package*.json ./

# Instala dependencias
RUN npm install

# Copia todo el proyecto
COPY . .

# Crear polyfills si no existe (Angular 20+ lo requiere)
RUN test -f src/polyfills.ts || touch src/polyfills.ts

# Build producción Angular
RUN npm run build

# --------------------------------------
# Etapa 2: Servir con Nginx
# --------------------------------------
FROM nginx:alpine

# Borra configuración default de Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia configuración personalizada de Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia build Angular a Nginx
COPY --from=build /app/dist/MVP-proyecto /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]