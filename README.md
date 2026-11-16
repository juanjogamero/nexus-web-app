<div align="center">

# nexus.

**Marketplace de segunda mano y ofertas · Angular 21**

Interfaz web responsive diseñada para descubrir artículos de segunda mano y comparar ofertas en un único catálogo.

[Explorar la experiencia web](https://juanjogamero.github.io/nexus-web-app/) · [Ver componentes](src/app/components/) · [Ver arquitectura](#arquitectura)

![Angular](https://img.shields.io/badge/Angular-21-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![Pruebas](https://github.com/juanjogamero/nexus-web-app/actions/workflows/angular.yml/badge.svg)

</div>

## El proyecto

**Nexus Web App** es el frontend de un concepto de marketplace que reúne publicaciones de particulares y ofertas comerciales. La interfaz se construyó con **Angular 21**, componentes standalone, TypeScript, rutas dinámicas y una arquitectura de servicios preparada para integrarse con una API REST.

Esta versión se ha completado como **proyecto de portfolio**. Funciona de manera independiente en modo de demostración y mantiene los servicios HTTP originales para una futura conexión con el backend.

> **Nota importante:** los anuncios, tiendas, precios y descripciones que aparecen en la demostración son ficticios. No se pueden efectuar compras, reservar productos, contactar con vendedores ni crear cuentas reales desde la muestra pública.

## Funcionalidades comprobables

- **Catálogo combinado:** productos de segunda mano y ofertas.
- **Buscador real:** búsqueda local por título, descripción y categoría.
- **Filtros y ordenación:** tipo de publicación, categoría y precio.
- **Favoritos:** guardar o quitar artículos; preferencias almacenadas en el navegador.
- **Fichas de producto:** información, galería de imágenes, precios y enlaces compartibles.
- **Estados de carga y error:** pantalla de error cuando falla una petición a la API.
- **Diseño adaptable:** navegación, catálogo y fichas para escritorio y móvil.
- **Página del proyecto:** explica qué funciona sin backend y qué servicios faltan.

El botón de las ofertas hacia una tienda externa solo está disponible cuando la API real proporciona una URL HTTPS. En modo de demostración las acciones de transacción no se muestran como operativas.

## Tecnologías

| Área | Tecnología |
| --- | --- |
| Frontend | Angular 21 |
| Lenguaje | TypeScript 5.9 |
| Estilos | CSS nativo |
| Navegación | Angular Router |
| Datos | Servicios RxJS y HttpClient |
| Estado local | Signals y localStorage para favoritos |
| Pruebas | Vitest |
| CI/CD | GitHub Actions / GitHub Pages |

## Empezar

Requiere **Node.js 22** y npm.

```bash
git clone https://github.com/juanjogamero/nexus-web-app.git
cd nexus-web-app
npm ci
npm start
```

Abre **http://localhost:4200** para explorar la app de demostración. No necesita un servidor de base de datos.

Para comprobar la versión de producción y ejecutar las pruebas:

```bash
npm run build
npm test -- --watch=false
```

## Conectar una API REST

La configuración pública se encuentra en `src/environments/enviroment.ts` (se mantiene el nombre de archivo utilizado originalmente en los imports del proyecto).

```ts
demoMode: true,
apiUrl: 'http://localhost:8080',
```

Establece `demoMode: false` y configura `apiUrl` para conectarla a **tu propia API**, compatible con los endpoints que esperan los servicios `ProductoService`, `OfertaService`, `AuthService` y `NexusService`.

**El backend no forma parte de este repositorio.** Un build satisfactorio no prueba que las rutas de la API externa funcionen; deben verificarse por separado. No incluyas claves privadas en configuraciones de Angular porque quedan accesibles en el navegador.

## Arquitectura

```text
src/
  app/
    components/
      header/          Navegación y búsqueda
      hero/            Portada editorial
      home/            Catálogo y filtros
      product-card/    Tarjeta y favoritos
      product-detail/  Ficha, imágenes y compartir
      about/           Información y alcance del proyecto
    services/          Acceso HTTP, feed y favoritos
    models/            Contratos de productos y ofertas
    data/              Datos ficticios para la demostración
    interceptors/      Adjunta el token solo a la API configurada
    app.routes.ts      Rutas del frontend
  environments/        Configuración de modo demo y URL API
```

## Publicación

La web está preparada para [GitHub Pages](https://juanjogamero.github.io/nexus-web-app/), con un flujo automatizado que compila Angular usando la ruta base `/nexus-web-app/`.

Si la URL no está disponible, activa **Settings → Pages → Build and deployment → GitHub Actions** en el repositorio y ejecuta el workflow [Publicar Nexus en GitHub Pages](https://github.com/juanjogamero/nexus-web-app/actions/workflows/pages.yml).

## Alcance

Este repositorio demuestra capacidades de desarrollo frontend, diseño de interfaz, búsqueda, filtrado, gestión de estado y consumo de servicios REST. **No es una plataforma comercial en producción** ni incluye pagos, moderación de anuncios, autenticación del servidor o mensajería operativa.

Las imágenes del catálogo de muestra se cargan desde Unsplash y se utilizan únicamente como apoyo visual de las fichas ficticias.

---

<div align="center">Diseñado y desarrollado como proyecto de portfolio · **Nexus Web App**</div>
