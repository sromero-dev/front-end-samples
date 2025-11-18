# Apuntes

## HTML
### [Elements](https://developer.mozilla.org/en-US/docs/Web/HTML/Guides/Cheatsheet)

## [CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)
### [Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/box-shadow)
- `margin: 0;`
    - Elimina todos los márgenes externos por defecto de todos los elementos
    - Evita espaciados inconsistentes entre navegadores

- `padding: 0;`
    - Elimina todos los rellenos internos por defecto
    - Proporciona un punto de partida limpio para el diseño

- `box-sizing: border-box;`
    - **Cambia el modelo** de caja tradicional
    - Con esta propiedad:
        - `width` y `height` incluyen el contenido + padding + border
        - Sin esta propiedad:
            - `width` y `height` solo incluyen el contenido
            - El padding y border se añaden por fuera
- `background-color: #fff;`
    - Fondo blanco para el contenedor
- `padding: 20px;`
    - Espacio interno de 20px en todos los lados
- `border-radius: 8px;`
    - Bordes redondeados de 8 píxeles
- `box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);`
    - Sombra exterior sutil
    - Parámetros: ***offset-x*** | ***offset-y*** | ***blur-radius*** | ***color***
- `max-width: 400px;`
    - Ancho máximo de 400px
    - Se adapta en pantallas más pequeñas
- `width: 90%;`
    - Ocupa el 90% del ancho disponible
    - Responsive por defecto
- `text-align: center;`
    - Centra el texto horizontalmente
- `justify-content: center;`
    - Centra elementos hijos horizontalmente
transition
overflow

**⚠️ Ninguna de las DOS propiedades anteriores funciona sin `display:flex`**

---
### [Selectors](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors)

---
### Conceptos rápidos sobre unidades
- **`px`** — píxeles: unidad absoluta en pantalla (perfecta para control fino).  
- **`rem`** — “root em”: relativa al tamaño de fuente raíz (`<html>`). Útil para tipografía y espaciado escalable.  
- **`em`** — relativa al tamaño de fuente del elemento padre (puede cascada).  
- **`%`** — porcentaje basado en el contenedor.  
- **`vh` / `vw`** — viewport height/width: 1vh = 1% de la altura del viewport; 1vw = 1% del ancho.  
- **`vmin` / `vmax`** — relativo al lado menor/mayor del viewport.  
- **`fr`** — fracción de espacio disponible en CSS Grid.  
- **`ch`** — ancho del carácter “0” en la fuente actual.  
- **`ex`** — altura de la “x” de la fuente (poco usado).  
- **Unidades físicas** — `cm`, `mm`, `in`, etc. (para impresión, casi no en web).  
- **Valor `0`** — no lleva unidad (`margin: 0`).

### Explicación detallada por unidad

#### `px`
- **Definición**: Unidad fija y precisa.  
- **Uso recomendado**: Ideal para bordes, iconos, sombras, etc.  
- **Ejemplo**:
    ```css
    button {
    padding: 8px 12px;
    border-radius: 4px;
    }
    ```

#### `rem` (Root EM)
- **Definición**: Relativa al tamaño de fuente del elemento raíz (`html`)
- **Valor por defecto**: `1rem = 16px`
- **Uso recomendado**: Ideal para tipografía y espaciado escalable
- **Ejemplo**:
    ```css
    html { font-size: 16px; }
    h1 { font-size: 2rem; } /* 32px */
    ```

#### `em` (EM)
- **Definición**: Relativa al font-size del elemento padre
- **Ejemplo**:
    ```css
    .card { font-size: 1rem; }
    .card p { font-size: 0.875em; }
    ```

#### `%` (Porcentaje)
- **Definición**: Relativa al tamaño del contenedor
- **Ejemplo**:
    ```css
    .container { width: 800px; }
    .child { width: 50%; } /* 400px */
    ```

#### `vh`, `vw`, `vmin`, `vmax` (Viewport Units)
- **Definición**: Basado en el viewport (pantalla visible)
- **Uso recomendado**: Útiles para secciones a pantalla completa o texto fluido
- **Ejemplo**:
    ```css
    .hero { height: 100vh; }
    .title { font-size: 4vw; }
    ```

#### `fr` (CSS Grid Only)
- **Definición**: Reparte el espacio restante entre columnas/filas
- **Ejemplo**:
    ```css
    .grid {
    display: grid;
    grid-template-columns: 1fr 2fr 100px;
    }
    ```

### Prácticas recomendadas

| Propósito | Unidad Recomendada |
|-----------|-------------------|
| **Tipografía** | `rem` |
| **Componentes que escalan** | `em` |
| **Layouts flexibles** | `fr` o `%` |
| **Pantalla completa** | `vh` / `vw` |
| **Detalles precisos** | `px` |
| **Espacados coherentes** | `rem` |

## JavaScript

preventDefault()
document.*