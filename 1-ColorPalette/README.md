# Color Palette Generator

## 1. Resumen del Funcionamiento

El Color Palette Generator es una aplicación web interactiva que permite a los usuarios generar paletas de colores aleatorias. Al cargar la página, se muestra automáticamente una paleta inicial de 5 colores. Los usuarios pueden:

    Generar nuevas paletas haciendo clic en el botón "Generate Palette"

    Copiar el código hexadecimal de cualquier color haciendo clic en el icono de copiar o directamente en el área del color

    Recibir confirmación visual cuando un color ha sido copiado (el icono cambia temporalmente a un checkmark verde)

La aplicación es completamente responsive y se adapta a diferentes tamaños de pantalla.

## 2. Explicación del CSS
#### Estructura general:
```css
/* Importa la fuente Roboto de Google Fonts */
@import url(https://fonts.googleapis.com/css?family=Roboto:100,200,300,regular,500,600,700,800,900,100italic,200italic,300italic,italic,500italic,600italic,700italic,800italic,900italic);

/* Reset básico para eliminar márgenes y paddings por defecto */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: "Roboto"; /* Establece Roboto como fuente principal */
}
```

#### Estilos del Body:
```css
body {
    background: linear-gradient(135deg, #83a8df, #c3cfe2); /* Fondo con gradiente azul */
    min-height: 100vh; /* Ocupa al menos toda la altura de la ventana */
    display: flex;
    align-items: center; /* Centra verticalmente */
    justify-content: center; /* Centra horizontalmente */
    padding: 20px; /* Espaciado interno */
}
```

#### Contenedor Principal:
```css
.container {
    background-color: aliceblue; /* Fondo blanco azulado */
    border-radius: 1rem; /* Bordes redondeados */
    padding: 2rem; /* Espaciado interno generoso */
    width: 100%;
    max-width: 800px; /* Ancho máximo en pantallas grandes */
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3) /* Sombra para efecto de elevación */
}
```

#### Título Principal:
```css
h1 {
    text-align: center;
    margin-bottom: 1.5rem;
    color: #333;
    position: relative;
    padding-bottom: 0.5rem;
}

/* Línea decorativa bajo el título */
h1::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 50%;
    height: 3px;
    background-color: #83a8df;
    border-radius: 2px;
}
```

#### Botón de Generación:
```css
#generate-btn {
    background: linear-gradient(45deg, #667eea, #764ba2); /* Gradiente morado/azul */
    color: white;
    border: none;
    padding: 0.8rem 1.5rem;
    border-radius: 50px; /* Bordes completamente redondeados */
    cursor: pointer;
    font-weight: 500;
    margin-bottom: 2rem;
    font-size: 1rem;
}

/* Efectos de hover y active */
#generate-btn:hover {
    transform: translateY(-2px); /* Efecto de elevación */
    box-shadow: 0 6px 10px rgba(100, 125, 235, 0.3);
}

#generate-btn:active {
    transform: translateY(0); /* Vuelve a posición original al hacer clic */
}
```

#### Contenedor de Paleta de Colores:
```css
.palette-container {
    display: grid;
    gap: 1rem; /* Espacio entre elementos */
    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr)); /* Grid responsive */
}
```

#### Cajas de Color Individuales:
```css
.color-box {
    border-radius: 10px;
    overflow: hidden; /* Asegura que los bordes redondeados se apliquen correctamente */
    box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s; /* Transición suave para efectos */
}

.color-box:hover {
    transform: translateY(-5px); /* Efecto de elevación al pasar el mouse */
}

.color {
    height: 120px; /* Altura fija para el área de color */
    cursor: pointer; /* Indica que es clickeable */
}
```

#### Información del Color (Hex + Botón Copiar):
```css
.color-info {
    background-color: #fff;
    padding: 0.7rem;
    display: flex;
    align-items: center;
    justify-content: space-between; /* Separa el texto hexadecimal del icono */
    font-size: 0.9rem;
}

.hex-value {
    font-weight: 500;
    letter-spacing: 0.5px; /* Mejora la legibilidad */
}

.copy-btn {
    cursor: pointer;
    color: #c3cfe2;
    transition: color 0.2s; 
}

.copy-btn:hover {
    color: #333; /* Cambia a color más oscuro al pasar el mouse */
}
```

#### Media Query para Responsividad:
```css
@media(max-width: 768px) {
    .palette-container{
        grid-template-columns: repeat(auto-fit, minmax(100px, 1fr)); /* Columnas más pequeñas en móviles */
    }
}
```

## 3. Explicación del JavaScript
#### Variables y Elementos DOM:
```javascript
const generateBtn = document.getElementById("generate-btn");
const paletteContainer = document.querySelector(".palette-container");
```
- Escucha el clic en el botón "Generate Palette"
- Ejecuta la función generatePalette() cuando se hace clic

#### Manejar Clics en la Paleta:
```javascript
paletteContainer.addEventListener("click", (e) => {
    // Maneja dos casos: clic en el icono de copiar y clic directo en el color
});
```

#### Funciones Principales:
1. showCopySuccessIcon(element)
```javascript
function showCopySuccessIcon(element) {
    const originalColor = element.style.color;

    // Cambia el icono de copiar a checkmark
    element.classList.remove("far", "fa-copy");
    element.classList.add("fas", "fa-check");
    element.style.color = '#48bb78'; // Verde de confirmación
    
    // Restaura el icono original después de 1.5 segundos
    setTimeout(() => {
        element.classList.remove("fas", "fa-check");
        element.classList.add("far", "fa-copy");
        element.style.color = originalColor;
    }, 1500);
}
```

2. generatePalette()
```javascript
function generatePalette() {
    const colors = [];
    
    // Genera 5 colores aleatorios
    for (let i = 0; i < 5; i++) {
        colors.push(generateRandomColor())
    }

    updatePaletteDisplay(colors) // Actualiza la interfaz
}
```

3. generateRandomColor()
```javascript
function generateRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";

    // Construye un código hexadecimal de 6 caracteres
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }

    return color;
}
```

4. updatePaletteDisplay(colors)
```javascript
function updatePaletteDisplay(colors) {
    const colorBoxes = document.querySelectorAll(".color-box");

    // Actualiza cada caja de color con los nuevos valores
    colorBoxes.forEach((box, id) => {
        const color = colors[id];
        const colorDiv = box.querySelector(".color");
        const hexVal = box.querySelector(".hex-value");

        colorDiv.style.backgroundColor = color; // Cambia el color de fondo
        hexVal.textContent = color; // Actualiza el texto hexadecimal
    });
}
```

#### Inicialización
```javascript
generatePalette(); // Genera una paleta inicial al cargar la página
```

#### Flujo de copiado al portapapeles
El código maneja dos formas de copiar colores:

    - Clic en el icono de copiar: Captura el texto hexadecimal del elemento hermano anterior.

    - Clic directo en el color: Navega al elemento hermano siguiente y busca el valor hexadecimal.

Ambos métodos utilizan la API del portapapeles (navigator.clipboard.writeText()) y muestran la confirmación visual.