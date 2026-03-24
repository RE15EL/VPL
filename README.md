# Practice Lab

Aplicacion React pensada como contenedor de pruebas tecnicas y ejercicios de preparacion diaria.

El objetivo del proyecto es centralizar soluciones en una sola interfaz navegable, agrupadas por categoria y accesibles mediante rutas estables del tipo `/:category/:slug`.

Actualmente la app ya cuenta con:

- shell de aplicacion con navegacion lateral persistente
- catalogo tipado de practicas
- enrutado con `React Router`
- modo oscuro por defecto
- primera practica registrada: `networking/fetch-with-retry`

## Stack actual

- React 19
- TypeScript
- Vite
- React Router DOM
- Tailwind CSS v4
- shadcn/ui
- Phosphor Icons
- ESLint

## Scripts disponibles

### `npm run dev`

Levanta el servidor de desarrollo con Vite.

### `npm run build`

Ejecuta chequeo de tipos con TypeScript y genera el build de produccion.

### `npm run lint`

Ejecuta ESLint sobre todo el proyecto.

### `npm run preview`

Sirve localmente el build generado para validacion manual.

## Como ejecutar el proyecto

1. Instalar dependencias:

```bash
npm install
```

2. Ejecutar en desarrollo:

```bash
npm run dev
```

3. Abrir la URL indicada por Vite, normalmente:

```text
http://localhost:5173
```

## Arquitectura general

La app sigue una arquitectura simple de `application shell`:

- `main.tsx` monta React e inicializa el tema oscuro
- `App.tsx` renderiza `RouterProvider`
- `src/app/router` define el arbol de rutas
- `src/app/layout` contiene la shell persistente
- `src/app/catalog` define el contrato de las practicas y su registro central
- `src/features` contiene cada prueba tecnica como unidad aislada

Esto permite que agregar una nueva practica no implique tocar la shell ni duplicar logica de navegacion.

## Estructura de carpetas

```text
src/
|-- app/
|   |-- catalog/
|   |   |-- practices.ts
|   |   `-- types.ts
|   |-- layout/
|   |   `-- app-shell.tsx
|   |-- pages/
|   |   |-- catalog-home.tsx
|   |   `-- not-found-page.tsx
|   `-- router/
|       `-- index.tsx
|-- assets/
|-- components/
|   `-- ui/
|-- features/
|   `-- networking/
|       `-- fetch-with-retry/
|           |-- helpers/
|           |   |-- fetch-with-retry.ts
|           |   `-- sleep.ts
|           |-- fetch-with-retry-page.tsx
|           |-- index.ts
|           `-- types.ts
|-- lib/
|   `-- utils.ts
|-- App.tsx
|-- index.css
`-- main.tsx
```

## Flujo del enrutado

El router se construye en [`src/app/router/index.tsx`](src/app/router/index.tsx):

- `/` renderiza el indice del catalogo
- `/:category/:slug` renderiza una practica registrada
- `*` renderiza la pagina de no encontrado

Las rutas reales no se escriben una por una en el router manualmente. Se generan a partir de `practiceDefinitions`, definido en [`src/app/catalog/practices.ts`](src/app/catalog/practices.ts).

## Contrato del catalogo

Cada practica debe cumplir el tipo `PracticeDefinition` definido en [`src/app/catalog/types.ts`](src/app/catalog/types.ts):

```ts
export type PracticeDefinition = {
  category: string;
  slug: string;
  title: string;
  status: "draft" | "in-progress" | "completed";
  component: ComponentType;
};
```

Ese contrato alimenta tres cosas:

- la generacion de rutas
- el sidebar de navegacion
- la home del catalogo

## Como agregar una nueva practica y su ruta

### 1. Crear la carpeta de la feature

Seguir esta estructura:

```text
src/features/<category>/<slug>/
```

Ejemplo:

```text
src/features/algorithms/two-sum/
```

### 2. Crear la pagina de la practica

Crear un componente de pagina, por ejemplo:

```text
src/features/algorithms/two-sum/two-sum-page.tsx
```

Ese componente sera el contenido que se renderiza en la ruta.

### 3. Exportar la definicion tipada

Crear un `index.ts` en la feature:

```ts
import type { PracticeDefinition } from "@/app/catalog/types";
import { TwoSumPage } from "./two-sum-page";

export const twoSumPractice = {
  category: "algorithms",
  slug: "two-sum",
  title: "Two Sum",
  status: "completed",
  component: TwoSumPage,
} satisfies PracticeDefinition;
```

### 4. Registrar la practica en el catalogo

Agregar la exportacion en [`src/app/catalog/practices.ts`](src/app/catalog/practices.ts):

```ts
import { twoSumPractice } from "@/features/algorithms/two-sum";

export const practiceDefinitions: PracticeDefinition[] = [
  fetchWithRetryPractice,
  twoSumPractice,
];
```

Con eso ya queda integrada en:

- la ruta `/algorithms/two-sum`
- el sidebar
- la home del catalogo

## Convenciones recomendadas para nuevas practicas

- usar una carpeta por practica
- mantener helpers y tipos locales dentro de la feature si solo se usan ahi
- usar `category` y `slug` en kebab-case
- usar `title` legible para UI
- no duplicar categorias en constantes separadas; el catalogo deriva de `practiceDefinitions`

## Practica existente

La primera practica implementada esta en:

- [`src/features/networking/fetch-with-retry`](src/features/networking/fetch-with-retry)

Expone la ruta:

```text
/networking/fetch-with-retry
```

Y contiene:

- la pagina de la practica
- su metadata tipada
- helpers locales para `fetchWithRetry` y `sleep`
- tipos propios del payload de ejemplo

## UI y tema

- la app arranca en dark mode por defecto desde [`src/main.tsx`](src/main.tsx)
- el layout principal vive en [`src/app/layout/app-shell.tsx`](src/app/layout/app-shell.tsx)
- los estilos globales y tokens visuales viven en [`src/index.css`](src/index.css)

## Alias de importacion

El proyecto usa el alias:

```text
@ -> src
```

Ejemplo:

```ts
import { appRouter } from "@/app/router";
```

## Estado actual

Estado funcional actual del proyecto:

- catalogo navegable operativo
- sidebar por categorias
- home de indice del catalogo
- pagina 404
- una practica migrada a la nueva arquitectura
- build y lint funcionando
