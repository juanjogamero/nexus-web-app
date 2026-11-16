<div align="center">

# Nexus — Marketplace & Ofertas

**Frontend de un marketplace que combina productos de segunda mano y ofertas comerciales.**

[Ver código](https://github.com/juanjogamero/nexus-web-app) · [Demo en GitHub Pages](https://juanjogamero.github.io/nexus-web-app/) · [Reportar un problema](https://github.com/juanjogamero/nexus-web-app/issues)

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/Deployment-GitHub%20Pages-222?logo=github)

</div>

## Descripción

Nexus es un proyecto web de interfaz de marketplace orientado a explorar artículos de segunda mano y ofertas de tiendas en una experiencia visual unificada. La aplicación está construida con Angular, TypeScript y CSS, con un diseño oscuro, componentes independientes y servicios HTTP preparados para integrarse con un backend.

> **Estado del proyecto:** frontend en desarrollo / portfolio. El despliegue de GitHub Pages publica únicamente los archivos estáticos. El catálogo, la autenticación y otras acciones requieren una API independiente que no se incluye en este repositorio. Sin una API configurada, el feed se mostrará vacío. Las pantallas de acceso, registro y publicación, así como algunos enlaces de navegación, aún no están implementados.

## Funcionalidades implementadas

- Página de inicio con presentación visual y catálogo.
- Feed combinado de productos y ofertas, consumido mediante servicios HTTP.
- Filtros por todo el contenido, ofertas y segunda mano.
- Fichas de detalle de productos y ofertas con galería de imágenes.
- Formateo de precios, descuentos y estado de disponibilidad.
- Servicios preparados para productos, ofertas, usuarios y autenticación.

## Tecnologías

| Área | Tecnología |
| --- | --- |
| Frontend | Angular 21 (standalone components) |
| Lenguaje | TypeScript 5.9 |
| Estilos | CSS, diseño responsive y tema oscuro |
| Reactividad | RxJS |
| Pruebas | Vitest (configuración del proyecto) |
| Despliegue | GitHub Actions + GitHub Pages |

## Estructura

```text
src/
├── app/
│   ├── components/    # Header, hero, inicio, tarjetas y detalle
│   ├── services/      # HTTP, feed, imágenes y autenticación
│   ├── interceptors/  # Interceptor de autenticación
│   ├── models/        # Interfaces y tipos de dominio
│   └── app.routes.ts  # Enrutamiento
├── environments/      # Configuración local de API (no versionada)
└── styles.css         # Diseño global
```

## Ejecución local

**Requisitos:** Node.js 22 y npm.

```bash
git clone https://github.com/juanjogamero/nexus-web-app.git
cd nexus-web-app
npm ci
```

Crea el archivo `src/environments/enviroment.ts` (se mantiene la grafía `enviroment` utilizada en las importaciones originales):

```ts
export const environment = {
  production: false,
  apiUrl: 'http://localhost:8080',
  upload: {
    allowedImageTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxFileSize: 5 * 1024 * 1024
  }
};
```

Ajusta `apiUrl` a la URL real de tu backend y arranca:

```bash
npm start
```

Abre [http://localhost:4200](http://localhost:4200).

## Despliegue en GitHub Pages

Este repositorio contiene el workflow `.github/workflows/deploy.yml`. Compila el frontend de Angular con la ruta base `/nexus-web-app/` y publica `dist/nexusapp/browser`. También incluye un `404.html` para permitir cargar rutas del cliente al abrir enlaces directos.

1. En **Settings → Pages → Build and deployment**, selecciona **GitHub Actions** como origen.
2. En **Settings → Secrets and variables → Actions → Variables**, crea `NEXUS_API_URL` con la URL HTTPS pública del backend, si dispones de él. **No incluyas tokens ni secretos** en esta variable: su contenido se compila en el JavaScript público.
3. Ejecuta **Actions → Deploy Angular to GitHub Pages → Run workflow**, o sube un commit a `main`.
4. Una vez completado correctamente el workflow y habilitado Pages, el sitio estará en **https://juanjogamero.github.io/nexus-web-app/**.

Si no estableces `NEXUS_API_URL`, se utilizará una URL de ejemplo no operativa y el catálogo no recibirá datos. Para consumir la API desde GitHub Pages, el backend debe admitir HTTPS y configurar CORS para el origen `https://juanjogamero.github.io`.

## Pendiente

- Implementar o conectar y verificar el backend y sus endpoints.
- Completar las pantallas de inicio de sesión, registro y publicación.
- Dar funcionalidad a búsqueda, favoritos, notificaciones y navegación pendiente.
- Añadir estados de error específicos, pruebas funcionales y accesibilidad.
- Realizar pruebas extremo a extremo con la API de producción.

## Autor

Desarrollado por [Juan José Gamero López](https://github.com/juanjogamero).

---

*Proyecto en evolución. Esta versión pública no debe interpretarse como un servicio comercial operativo.*
