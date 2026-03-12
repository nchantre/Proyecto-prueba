# MVPProyecto

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
- **Pruebas**:
  - Pruebas unitarias con Jasmine + Karma, archivos `*.spec.ts` junto al código.

