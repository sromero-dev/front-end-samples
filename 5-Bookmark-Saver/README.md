# 📚 Bookmark Saver - Documentación técnica

## 🎯 Descripción General
**Bookmark Saver** es una aplicación web que permite a los usuarios guardar y gestionar sus marcadores favoritos de forma local en el navegador, utilizando **localStorage** para persistencia de datos.

---

## 🏗️ HTML

### **Estructura Base HTML5**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Bookmark Saver</title>
    <link rel="stylesheet" href="style.css" />
</head>
```

**Componentes explicados:**
- `<!DOCTYPE html>`: Declara documento HTML5
- `<html lang="en">`: Elemento raíz con idioma inglés
- `<head>`: Metadatos y recursos
  - `charset="UTF-8"`: Codificación de caracteres universal
  - `viewport`: Configuración responsive para dispositivos móviles
  - `title`: Título en la pestaña del navegador
  - `link`: Vinculación con hoja de estilos

### **Cuerpo de la Aplicación**
```html
<body>
    <div class="app-container">
        <h1>Bookmark Saver</h1>
        <div class="input-container">
            <input type="text" placeholder="Bookmark Name" id="bookmark-name">
            <input type="url" placeholder="Bookmark URL" id="bookmark-url">
            <button id="add-bookmark">Add Bookmark</button>
        </div>
        <ul id="bookmark-list"></ul>
    </div>
    <script src="script.js"></script>
</body>
```

**Elementos y sus funciones:**
- **`.app-container`**: Contenedor principal que centraliza toda la aplicación
- **`<h1>`**: Título principal de la aplicación
- **`.input-container`**: Agrupa los campos de entrada y botón
- **Inputs**:
  - `bookmark-name`: Campo de texto para nombre del bookmark
  - `bookmark-url`: Campo tipo URL (mejora semántica)
  - `placeholder`: Texto guía para el usuario
- **`#add-bookmark`**: Botón para agregar nuevos bookmarks
- **`#bookmark-list`**: Lista contenedora donde se renderizan los bookmarks
- **`<script>`**: Inclusión del JavaScript al final para optimizar carga

---

## 🎨 CSS

### Reset y Configuración Global
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
```
- **Reset completo**: Elimina márgenes y paddings por defecto del navegador
- **`box-sizing: border-box`**: Hace que padding y border se incluyan en el width/height

### Estilos del Body
```css
body {
  font-family: sans-serif;
  background-color: #fff;
  color: black;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
```
- **Centrado perfecto**: Usa Flexbox para centrar vertical y horizontalmente
- **`height: 100vh`**: Ocupa 100% del alto de la ventana (viewport height)
- **Tipografía**: Fuente sans-serif limpia y legible

### Contenedor Principal
```css
.app-container {
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  width: 90%;
  text-align: center;
}
```
- **Diseño de tarjeta**: Fondo blanco con sombra sutil
- **`border-radius: 8px`**: Esquinas redondeadas estilo moderno
- **Responsive**: 
  - `max-width: 400px`: Ancho máximo en pantallas grandes
  - `width: 90%`: Se adapta al 90% en móviles
- **`box-shadow`**: Sombra sutil para efecto de elevación

### Título Principal
```css
h1 {
  color: #2ecc71;
  margin-bottom: 20px;
}
```
- **Color verde (#2ecc71)**: Tema consistente con botones
- **Espaciado**: Margen inferior para separación visual

### Contenedor de Inputs
```css
.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
```
- **Diseño columna**: Los elementos se apilan verticalmente
- **`gap: 10px`**: Espacio consistente entre elementos (moderno, evita margins)
- **Separación**: Margen inferior para separar de la lista

### Campos de Entrada
```css
input {
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
}
```
- **Espaciado interno**: `padding` para texto cómodo
- **Bordes suaves**: Radio de 8px y color gris claro (#ddd)

### Botones
```css
button {
  padding: 10px;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #27ae60;
}
```
- **Estilo principal**: Verde brillante con texto blanco
- **Interactividad**: 
  - `cursor: pointer`: Indica elemento clickeable
  - `transition`: Animación suave al hacer hover
  - `hover`: Verde más oscuro al pasar el mouse

### Lista de Bookmarks
```css
#bookmark-list {
  list-style: none;
  padding: 0;
}

#bookmark-list li {
  background-color: #f9f9f9;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
- **Sin viñetas**: `list-style: none` para diseño limpio
- **Tarjetas individuales**: Cada bookmark tiene fondo gris muy claro
- **Layout flexible**: 
  - `display: flex`: Alineación horizontal
  - `justify-content: space-between`: Enlace a la izquierda, botón a la derecha
  - `align-items: center`: Centrado vertical

### Enlaces y Botones de la Lista
```css
#bookmark-list a {
  color: #2ecc71;
  text-decoration: none;
}

#bookmark-list button {
  background-color: #e74c3c;
  padding: 5px 10px;
}

#bookmark-list button:hover {
  background-color: #c0392b;
}
```
- **Enlaces verdes**: Coherencia con el tema de color
- **Botones de eliminar**: 
  - Rojo (`#e74c3c`) para acción destructiva
  - Padding reducido para tamaño más compacto
  - Hover rojo oscuro para feedback visual

---

## ⚙️ JavaScript

### 1. Inicialización y selección de elementos
```
Usuario escribe → Validación → [Error → Alert] → [Éxito → 
→ Agregar a DOM → Guardar en Storage → Limpiar formulario]

Al cargar página → Leer Storage → Renderizar bookmarks existentes

Eliminar bookmark → Remover del DOM → Actualizar Storage
```

Este proyecto demuestra **desarrollo web moderno** con JavaScript vanilla, manipulación del DOM, y persistencia de datos local, siguiendo las mejores prácticas de organización de código y experiencia de usuario.

```javascript
const addBookmarkBtn = document.getElementById("add-bookmark");
const bookmarkList = document.getElementById("bookmark-list");
const bookmarkNameInput = document.getElementById("bookmark-name");
const bookmarkUrlInput = document.getElementById("bookmark-url")
```
- **Objetivo**: Seleccionar elementos del DOM para manipularlos
- **Detalle**: 
  - `addBookmarkBtn`: Botón para agregar nuevos bookmarks
  - `bookmarkList`: Lista UL donde se mostrarán los bookmarks
  - `bookmarkNameInput`: Campo de texto para el nombre del bookmark
  - `bookmarkUrlInput`: Campo para la URL del bookmark

### 2. Carga inicial de bookmarks

```javascript
document.addEventListener("DOMContentLoaded", loadBookmarks);
```
- **Objetivo**: Ejecutar código cuando la página termine de cargar
- **Detalle**: Cuando el DOM está listo, llama a `loadBookmarks()` para cargar bookmarks guardados

### 3. Event Listener para agregar bookmarks

```javascript
addBookmarkBtn.addEventListener("click", function () {
  const name = bookmarkNameInput.value.trim();
  const url = bookmarkUrlInput.value.trim();

  if (!name||!url) {
    alert("Please enter both name and URL.")
    return
  } else {
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      alert("Invalid URL format.")
      return
    }

    addBookmark(name, url);
    saveBookmark(name, url);

    bookmarkNameInput.value="";
    bookmarkUrlInput.value="";
  }
});
```

**Proceso detallado**:
1. **Obtener valores**: `trim()` elimina espacios en blanco
2. **Validación básica**: Verifica que ambos campos no estén vacíos
3. **Validación de URL**: Verifica que la URL comience con protocolo válido
4. **Agregar visualmente**: Llama a `addBookmark()` para mostrar en pantalla
5. **Guardar en storage**: Llama a `saveBookmark()` para persistencia
6. **Limpiar campos**: Vacía los inputs para nueva entrada

### 4. Función addBookmark - Crear elemento visual

```javascript
function addBookmark(name, url) {
  const li = document.createElement("li");
  const link = document.createElement("a");

  link.href = url;
  link.textContent = name;
  link.target = "_blank";

  const removeButton = document.createElement("button");
  removeButton.textContent = "Remove";
  removeButton.addEventListener("click", function () {
    bookmarkList.removeChild(li);
    removeBookmarkFromStorage(name, url);
  });

  li.appendChild(link);
  li.appendChild(removeButton);
  bookmarkList.appendChild(li);
}
```

**Proceso detallado**:
1. **Crear elementos**: Crea `<li>` y `<a>` para el bookmark
2. **Configurar enlace**: 
   - `href`: URL destino
   - `textContent`: Nombre visible
   - `target="_blank"`: Abre en nueva pestaña
3. **Crear botón eliminar**: 
   - Texto "Remove"
   - Event listener para eliminar tanto visualmente como del storage
4. **Ensamblar elementos**: Agrega enlace y botón al `<li>`, luego a la lista

### 5. Funciones de Storage - Persistencia de datos

```javascript
function getBookmarksFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks");
  return bookmarks ? JSON.parse(bookmarks) : []
}
```
- **Objetivo**: Obtener bookmarks guardados
- **Detalle**: 
  - `localStorage.getItem()`: Recupera datos del almacenamiento local
  - `JSON.parse()`: Convierte string JSON a array de objetos
  - Operador ternario: Si no hay datos, retorna array vacío

```javascript
function saveBookmark(name, url) {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.push({name, url});
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
```
- **Objetivo**: Guardar nuevo bookmark
- **Detalle**:
  - Obtiene bookmarks existentes
  - Agrega nuevo objeto `{name, url}` al array
  - `JSON.stringify()`: Convierte array a string para storage
  - `localStorage.setItem()`: Guarda en almacenamiento local

### 6. Función loadBookmarks - Cargar al iniciar

```javascript
function loadBookmarks() {
  const bookmarks = getBookmarksFromStorage();
  bookmarks.forEach((bookmark) => addBookmark(bookmark.name, bookmark.url));
}
```
- **Objetivo**: Recuperar y mostrar bookmarks guardados
- **Detalle**: Itera sobre cada bookmark y llama a `addBookmark()` para recrearlos visualmente

### 7. Función removeBookmarkFromStorage - Eliminar permanentemente

```javascript
function removeBookmarkFromStorage(name, url) {
  let bookmarks = getBookmarksFromStorage();
  bookmarks = bookmarks.filter((bookmark) => bookmark.name !== name || bookmark.url !== url);
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}
```

**Proceso detallado**:
1. **Obtener bookmarks actuales**
2. **Filtrar array**: `filter()` crea nuevo array excluyendo el bookmark a eliminar
3. **Condición de filtro**: Mantiene bookmarks cuyo nombre O URL sean diferentes
4. **Guardar cambios**: Actualiza el storage con el nuevo array

### **Flujo completo del script:**

1. **Inicialización** → Cargar bookmarks existentes
2. **Usuario agrega** → Validar → Crear visual → Guardar en storage
3. **Usuario elimina** → Remover visual → Remover del storage
4. **Persistencia** → Todos los cambios se mantienen entre sesiones

Este script implementa un **CRUD completo** (Create, Read, Delete) para bookmarks con persistencia en localStorage.

---

## 🎯 **Características Técnicas Destacadas**

### **Arquitectura MVC Implícita**
- **Model**: localStorage + funciones de gestión de datos
- **View**: HTML + CSS + renderizado dinámico
- **Controller**: Event listeners y coordinación

### **Patrones de Diseño Implementados**
1. **Separación de Concerns**: HTML estructura, CSS presentación, JS comportamiento
2. **Event Delegation**: Listeners en elementos dinámicos
3. **Data Persistence**: localStorage como base de datos local

### **Responsive Design**
- **Mobile-first**: `width: 90%` en contenedor principal
- **Flexbox**: Layouts flexibles y centrados
- **Touch-friendly**: Botones y áreas clickeables adecuadas

### **UX/UI Considerations**
- **Feedback visual**: Hover states en botones
- **Validación en tiempo real**: Alertas para entradas inválidas
- **Accesibilidad**: Enlaces con `target="_blank"` para no perder la aplicación