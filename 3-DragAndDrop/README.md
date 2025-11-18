# 📋 Kanban Board - Documentación Técnica

## 📄 Estructura HTML (index.html)

### 🏗️ Estructura General
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <!-- Metadatos y enlaces -->
</head>
<body>
    <div class="container">
        <h1>Simple Kanban Board</h1>
        <div class="board">
            <!-- Listas del Kanban -->
        </div>
    </div>
    <script src="script.js"></script>
</body>
</html>
```

### 🧩 Elementos Principales

#### Container Principal
```html
<div class="container">
```
- Función: Contenedor principal que centra todo el contenido
- Contenido: Título y el tablero completo

#### Tablero Kanban
```html
<div class="board">
```
- Función: Contenedor flexible que organiza las listas horizontalmente
- Características:
    - Usa Flexbox para distribución
    - Responsive (se vuelve vertical en móviles)

#### Listas Individuales
```html
<div class="list" id="list1">
    <h2>To-Do</h2>
    <div class="card" draggable="true" id="card1">Do Dishes</div>
</div>
```
- Atributos:
    - `class="list"`: Define el estilo CSS
    - `id="list1"`: Identificador único para scripting
- Elementos hijos:
    - `<h2>`: Título de la lista
    - `<div class="card">`: Tarjetas arrastrables

#### Tarjetas Arrastrables
```html
<div class="card" draggable="true" id="card1">Do Dishes</div>
```
- Atributos clave:
    - `draggable="true": Habilita la funcionalidad drag & drop nativa`
    - `id="cardX": Identificador único para tracking`
    - `class="card": Aplica estilos visuales`

## 🎨 Estilos CSS (style.css)

### 🎯 Reset y Configuración Global
```css
* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}
```
- `box-sizing: border-box`: Incluye padding y border en el cálculo del width/height
- Reset de márgenes/padding: Elimina estilos por defecto del navegador

### 🖥️ Layout del Body
```css
body {
    font-family: sans-serif;
    background-color: whitesmoke;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
}
```
- `display: flex`: Crea un contenedor flexible
- `justify-content: center`: Centra horizontalmente
- `align-items: center`: Centra verticalmente
- `min-height: 100vh`: Ocupa al menos toda la altura visible

### 📦 Container Principal
```css
.container {
    text-align: center;
    width: 100%;
    padding: 1.2rem;
}
```
- `text-align: center`: Centra el texto del título
- `width: 100%`: Ocupa todo el ancho disponible
- `padding: 1.2rem`: Espaciado interno

### 🎪 Tablero (Board)
```css
.board {
    display: flex;
    justify-content: space-around;
    align-items: start;
    width: 100%;
    max-width: 1200px;
    margin: 0 auto;
    gap: 20px;
}
```
- `justify-content: space-around`: Distribuye espacio alrededor de los elementos
- `align-items: start`: Alinea elementos al inicio verticalmente
- `max-width`: 1200px: Limita el ancho máximo
- `gap: 20px`: Espacio entre listas

### 📋 Listas
```css
.list {
    background-color: azure;
    padding: 1rem;
    border-radius: 8px;
    width: 30%;
    min-height: 400px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    transition: background-color 0.5s;
}
```
- `width`: 30%: Cada lista ocupa 30% del ancho del contenedor
- `min-height`: 400px: Altura mínima garantizada
- `border-radius`: 8px: Esquinas redondeadas
- `box-shadow`: Sombra para efecto de elevación
- `transition`: Transición suave para cambios de color

### 🃏 Tarjetas
```css
.card {
    background-color: white;
    color: #333;
    padding: 1rem;
    margin-bottom: 10px;
    border-radius: 8px;
    cursor: grab;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.2s, box-shadow 0.2s;
}
```
- `cursor: grab`: Cambia el cursor para indicar que es arrastrable
- `transition`: Animaciones suaves para transform y sombra
- `margin-bottom`: 10px: Espacio entre tarjetas

### 🎭 Estados Interactivos
```css
.card:active {
    cursor: grabbing;
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.list.over {
    background-color: bisque;
}
```
- `:active`: Se activa cuando la tarjeta está siendo arrastrada
- `.over`: Clase temporal cuando una lista es destino de drag

### 📱 Media Queries
```css
@media (max-width: 768px) {
    .board {
        flex-direction: column;
        align-items: center;
    }
    .list {
        width: 80%;
        margin-bottom: 20px;
    }
}
```
- `flex-direction`: column: Cambia a disposición vertical en móviles
- `width: 80%`: Las listas ocupan 80% del ancho en móviles

## ⚡ JavaScript (script.js)

### 🎯 Inicialización
```javascript
const cards = document.querySelectorAll(".card");
const lists = document.querySelectorAll(".list");
```
`querySelectorAll`: Selecciona todos los elementos que coinciden con el selector
`cards`: Colección de todas las tarjetas arrastrables
`lists`: Colección de todas las listas contenedoras

### 🎪 Configuración de Event Listeners
#### Para Tarjetas:
```javascript
for (const card of cards) {
    card.addEventListener("dragstart", dragStart);
    card.addEventListener("dragend", dragEnd);
}
```
- `dragstart`: Se dispara cuando comienza el arrastre
- `dragend`: Se dispara cuando termina el arrastre

#### Para Listas:
```javascript
for (const list of lists) {
    list.addEventListener("dragover", dragOver);
    list.addEventListener("dragenter", dragEnter);
    list.addEventListener("dragleave", dragLeave);
    list.addEventListener("drop", dragDrop);
}
```
- `dragover`: Se dispara cuando un elemento se arrastra sobre la lista
- `dragenter`: Se dispara cuando un elemento entra en la lista
- `dragleave`: Se dispara cuando un elemento sale de la lista
- `drop`: Se dispara cuando se suelta un elemento en la lista

### 🚀 Funciones de Drag & Drop
#### dragStart(e)
```javascript
function dragStart(e) {
    e.dataTransfer.setData("text/plain", this.id);
}
```
- ***Propósito***: Prepara los datos para transferir durante el drag
- `e.dataTransfer.setData()`: Almacena el ID de la tarjeta que se está arrastrando
- `this.id`: Referencia al ID del elemento que disparó el evento

#### dragOver(e) y dragEnter(e)
```javascript
function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
    this.classList.add("over");
}
```
- `e.preventDefault()`: Permite que el drop ocurra (comportamiento por defecto lo impide)
- `classList.add("over")`: Añade clase visual para feedback

#### dragLeave()
```javascript
function dragLeave() {
    this.classList.remove("over");
}
```
- ***Propósito***: Limpia el estado visual cuando el elemento sale del área

#### dragDrop(e)
```javascript
function dragDrop(e) {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(id);
    
    this.appendChild(card);
    this.classList.remove("over");
}
```
- Flujo completo:
    1. Previene comportamiento por defecto
    2. Recupera el ID de la tarjeta arrastrada
    3. Encuentra el elemento DOM correspondiente
    4. Mueve la tarjeta al nuevo contenedor
    5. Limpia el estado visual

## 🔄 Flujo de Eventos Completo
1. Inicio: Usuario hace drag en una tarjeta → `dragStart`
2. Sobre lista:
    - dragEnter → añade clase "over"
    - dragOver continuo → mantiene el drop permitido
3. Fuera de lista: `dragLeave` → remueve clase "over"
4. Finalización: `drop` → mueve tarjeta y limpia estilos

## 🛠️ Características Técnicas
### ✅ Compatibilidad
- **HTML5 Drag & Drop API**: Soporte nativo del navegador
- **Flexbox CSS**: Layout moderno y responsive
- **JavaScript ES6**: Sintaxis moderna

### 📱 Responsive Design
- **Desktop**: 3 columnas horizontales
- **Tablet/Mobile**: 1 columna vertical

### 🎨 Feedback Visual
- **Estados de drag**: Cambios de cursor y escala
- **Destino de drop**: Cambio de color de fondo
- **Transiciones**: Animaciones suaves en todas las interacciones

Este Kanban Board proporciona una implementación completa y funcional del patrón drag & drop usando tecnologías web estándar sin dependencias externas.

## Bibliografía

- **[MDN Documentation - File Drag and Drop](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API/File_drag_and_drop)**

