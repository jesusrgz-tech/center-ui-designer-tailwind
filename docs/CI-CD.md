# Infraestructura CI/CD

Base de infraestructura para este proyecto (actualmente un SPA estático
React/Vite basado en TailAdmin) pensada como punto de partida para
evolucionar hacia un SaaS de administración universitaria. Este documento
explica cada pieza y cómo probarla en local.

## Resumen de piezas

| Pieza | Archivo(s) | Estado |
|---|---|---|
| Contenedor de la app | `Dockerfile`, `docker/nginx.conf` | Activo |
| Dev local con Docker | `docker-compose.yml` | Activo |
| CI (lint/build) | `.github/workflows/ci.yml` | Activo (GitHub Actions) |
| CD (build/push imagen) | `.github/workflows/cd.yml` | Activo (GitHub Actions) |
| Pipeline Jenkins | `Jenkinsfile` | Referencia / aprendizaje |
| Pipeline Bitbucket | `bitbucket-pipelines.yml` | Referencia / aprendizaje |
| Manifiestos Kubernetes | `k8s/base`, `k8s/overlays/{dev,prod}` | Listo para aplicar a un cluster |

El repo vive en GitHub (`jesusrgz-tech/center-ui-designer-tailwind`), así
que **GitHub Actions es el pipeline que realmente corre**. El Jenkinsfile y
el `bitbucket-pipelines.yml` son equivalentes funcionales pensados para
comparar sintaxis entre las tres herramientas — útil si en el futuro el
proyecto se auto-hospeda (Jenkins) o se replica en Bitbucket.

## 1. Correr la app con Docker en local

```bash
# Build de producción servido por nginx en http://localhost:8080
docker compose up --build app

# Alternativa: dev server de Vite con hot-reload en http://localhost:5173
docker compose --profile dev up app-dev
```

El `Dockerfile` usa build multi-stage: una etapa `node:22-alpine` que
compila con `npm run build`, y una etapa final `nginx:1.27-alpine` que solo
sirve el `dist/` resultante. La imagen final no lleva Node ni
`node_modules`, solo los estáticos + nginx.

`docker/nginx.conf` resuelve el caso típico de SPA: cualquier ruta
desconocida cae a `index.html` (necesario para el router de React), los
assets con hash de Vite (`/assets/*`) llevan cache larga e inmutable, y hay
un endpoint `/healthz` usado por el `HEALTHCHECK` del contenedor y por las
probes de Kubernetes.

## 2. CI — GitHub Actions (`ci.yml`)

Corre en cada push/PR a `main`: `npm ci` → `npm run lint` → `npm run build`
(el build incluye typecheck vía `tsc -b`). Sube el `dist/` como artefacto
para poder inspeccionarlo desde la UI de Actions sin tener que reconstruir
localmente. No requiere secrets.

## 3. CD — GitHub Actions (`cd.yml`)

En cada push a `main` (o tag `vX.Y.Z`), reconstruye y publica la imagen en
GitHub Container Registry:

```
ghcr.io/jesusrgz-tech/center-ui-designer-tailwind:latest
ghcr.io/jesusrgz-tech/center-ui-designer-tailwind:<sha-corto>
```

Usa `secrets.GITHUB_TOKEN` (automático, no hay que crear nada) con permiso
`packages: write` declarado en el workflow. Este workflow **no hace deploy
a ningún cluster todavía** — solo deja la imagen publicada. El siguiente
paso natural cuando haya un cluster real es añadir un job que haga
`kustomize edit set image ...` + `kubectl apply -k k8s/overlays/prod`,
autenticándose con un kubeconfig guardado como secret
(`KUBE_CONFIG_PROD`, por ejemplo).

Por defecto el paquete en GHCR queda privado. Si vas a tirar de esta imagen
desde un cluster externo, hay que darle acceso de lectura (o hacerlo
público desde la configuración del paquete en GitHub).

## 4. Kubernetes (`k8s/`)

Manifiestos organizados con Kustomize:

```
k8s/
  base/            namespace, deployment, service, ingress, configmap
  overlays/dev/    1 réplica, host dev.tailadmin.local, tag "latest"
  overlays/prod/   3 réplicas, límites de recursos más altos, host propio
```

### Probar en local con kind

```bash
# 1. Crear un cluster local
kind create cluster --name tailadmin

# 2. Instalar un ingress controller (nginx)
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/main/deploy/static/provider/kind/deploy.yaml

# 3. Cargar la imagen construida localmente dentro del cluster kind
docker build -t ghcr.io/jesusrgz-tech/center-ui-designer-tailwind:local .
kind load docker-image ghcr.io/jesusrgz-tech/center-ui-designer-tailwind:local --name tailadmin

# 4. Aplicar el overlay de dev usando esa imagen local
cd k8s/overlays/dev
kustomize edit set image ghcr.io/jesusrgz-tech/center-ui-designer-tailwind=ghcr.io/jesusrgz-tech/center-ui-designer-tailwind:local
kubectl apply -k .

# 5. Ver el resultado
kubectl -n tailadmin-dev get pods,svc,ingress
```

Con el ingress de kind, se accede añadiendo `dev.tailadmin.local` a
`/etc/hosts` apuntando a `127.0.0.1` y visitando `http://dev.tailadmin.local`.

### Producción real (EKS/GKE/AKS/etc.)

El overlay `prod` no asume ningún proveedor concreto — es Kubernetes
estándar (`Deployment` + `Service` + `Ingress` con `ingressClassName:
nginx`). Cambia `spec.rules[0].host` en `k8s/overlays/prod/kustomization.yaml`
por tu dominio real, y usa cert-manager (no incluido aquí) si quieres TLS
automático con Let's Encrypt.

## 5. Jenkins y Bitbucket (referencia)

`Jenkinsfile` y `bitbucket-pipelines.yml` replican las mismas etapas que
GitHub Actions (install → lint → build → docker build/push → deploy
opcional) para que puedas comparar cómo se expresa el mismo pipeline en
cada herramienta. Ninguno de los dos está conectado a nada ahora mismo;
son material de estudio, no pipelines activos.

## 6. De aquí a un SaaS multi-tenant

Cosas a decidir cuando se pase de "template estático" a producto real, sin
resolverlas todavía en este base:

- **Backend/API**: hoy no hay backend. Cuando lo haya, probablemente otro
  Deployment + Service en el mismo namespace, con su propio pipeline de
  CI/CD y su propia imagen.
- **Multi-tenancy**: por subdominio (`cliente.tailadmin.app`) es lo más
  simple de mapear a Ingress (un host adicional o wildcard), vs. por
  esquema de base de datos, vs. cluster/namespace por cliente (más caro,
  más aislado).
- **Secrets**: hoy no hay ninguno real en el pipeline. Cuando aparezcan
  (DB, JWT, API keys de terceros), usar GitHub Encrypted Secrets para CI/CD
  y `Secret` de Kubernetes (o algo tipo External Secrets/Sealed Secrets)
  para runtime — nunca commitear `.env` con valores reales.
- **Observabilidad**: nada de logging/monitoring centralizado todavía;
  cuando haya tráfico real, considerar Prometheus/Grafana o un SaaS tipo
  Datadog.
