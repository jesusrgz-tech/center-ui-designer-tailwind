# syntax=docker/dockerfile:1

# ---- Etapa 1: build ----
FROM node:22-alpine AS build
WORKDIR /app

# Instala dependencias primero para aprovechar la cache de capas de Docker
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# ---- Etapa 2: runtime ----
FROM nginx:1.27-alpine AS runtime

# Config de nginx para SPA (fallback a index.html) + gzip + cache headers
COPY docker/nginx.conf /etc/nginx/conf.d/default.conf

# Quita el contenido por defecto de nginx y copia el build
RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/dist /usr/share/nginx/html

# nginx corre como root por defecto en la imagen alpine; lo dejamos así por
# simplicidad de puertos <1024. Para hardening real, ver docs/CI-CD.md.
EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO- http://localhost/healthz || exit 1

CMD ["nginx", "-g", "daemon off;"]
