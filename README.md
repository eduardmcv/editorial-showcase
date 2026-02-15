# Editorial Showcase — Especiales interactivos

Proyecto de maquetación editorial interactiva inspirado en los especiales de [20minutos.es](https://www.20minutos.es). Desarrollado como demostración de capacidades en diseño digital, maquetación HTML/SCSS y JavaScript vanilla.

## Tecnologías

- **HTML5** semántico (`section`, `main`, `blockquote`, `cite`, `nav`)
- **SCSS** con arquitectura modular: variables, mixins, partials y metodología BEM
- **JavaScript vanilla** — manipulación del DOM, eventos de scroll, animaciones procedurales
- **Vite** como bundler de desarrollo
- **Mobile First** y responsive design
- **Git** con conventional commits

## Arquitectura SCSS

```
scss/
├── _variables.scss      → Colores, tipografías, breakpoints, espaciado
├── _mixins.scss         → Responsive breakpoints, utilidades de texto
├── _shared.scss         → Reexporta variables y mixins (@forward)
├── _base.scss           → Reset, estilos globales, tipografía base
├── _layout.scss         → Contenedores y estructura general
├── components/
│   ├── _header.scss     → Cabecera del medio
│   └── _footer.scss     → Pie con enlaces legales y RRSS
└── pages/
    └── _especial-1.scss → Especial "La Banda del Peugeot"
```

La arquitectura sigue el patrón **7-1 simplificado**: cada partial tiene una responsabilidad clara, los componentes son reutilizables y las páginas contienen estilos específicos de cada especial.

## Funcionalidades destacadas

### Composición visual animada (Hero)
Composición de recortes fotográficos con animación CSS mediante `@keyframes`. Uso de custom properties (`--bote`) para parametrizar la intensidad de cada elemento, evitando duplicar animaciones.

### Efectos de scroll con JavaScript
- **Imagen reveal**: transición progresiva entre dos capas (grayscale + opacidad) vinculada al progreso de scroll
- **Imagen multicapa**: sistema de 4 capas superpuestas con desvanecimiento y desplazamiento controlado por scroll

Ambos efectos usan `getBoundingClientRect()` para calcular el progreso del elemento en el viewport y aplicar transformaciones en tiempo real.

### Responsive y Mobile First
Todo el CSS base está escrito para móvil. Los estilos de tablet y desktop se añaden progresivamente mediante mixins (`@include tablet`, `@include desktop`).

### Accesibilidad
- Textos alternativos descriptivos en imágenes; `alt=""` en imágenes decorativas
- Semántica HTML5 correcta (`blockquote` + `cite`, `section`, `main`, `nav`)
- Base tipográfica en `62.5%` para respetar la configuración del navegador
- Estilos `:focus-visible` para navegación con teclado
- `aria-label` en botones con contenido exclusivamente icónico (menú, login)
- Contraste de colores conforme a WCAG AA (ratio mínimo 4.5:1 en textos)
- Tamaño mínimo de áreas táctiles de 44px en elementos interactivos
- `prefers-reduced-motion`: desactiva animaciones y transiciones si el usuario lo configura en su sistema

### Performance
- Scroll listeners unificados y optimizados con `requestAnimationFrame`
- `loading="lazy"` en imágenes fuera del viewport inicial
- `preconnect` a Google Fonts para reducir latencia de carga
- Variables del DOM cacheadas fuera del listener para evitar lecturas repetidas

## Desarrollo

```bash
npm install
npm run dev
```

## Build y despliegue

```bash
npm run build    # genera /dist
```

Desplegable en Vercel conectando el repositorio. Detecta Vite automáticamente.

## Especiales incluidos

### La Banda del Peugeot
Especial editorial basado en la noticia de 20minutos sobre la reorganización interna del PSOE. Incluye hero animado con composición fotográfica, bloques de texto editorial con citas destacadas, e imágenes interactivas con efectos de scroll.

---

Desarrollado por Eduard · 2025
