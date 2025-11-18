# Documentación Técnica - Formulario de Registro con Validación

## Descripción General

Este proyecto implementa un formulario de registro con validación en tiempo real utilizando HTML, CSS y JavaScript vanilla. El sistema valida campos requeridos, longitud de caracteres, formato de email y coincidencia de contraseñas.

## Estructura de Archivos

```
├── index.html      # Estructura del formulario
├── style.css       # Estilos y diseño visual
└── script.js       # Lógica de validación
```

## Documentación de HTML (`index.html`)

### Estructura Principal

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Metadatos y enlaces -->
</head>
<body>
  <div class="container">
    <form id="registration-form">
      <!-- Campos del formulario -->
    </form>
  </div>
</body>
</html>
```

### Elementos del Formulario

#### Contenedor Principal
- **Clase `container`**: Envuelve todo el formulario con estilos de tarjeta
- **ID `registration-form`**: Identificador único para el formulario

#### Campos de Entrada
Cada campo sigue esta estructura:

```html
<div class="form-group">
  <label for="username">Username</label>
  <input type="text" id="username" placeholder="Enter username">
  <small></small> <!-- Para mensajes de error -->
</div>
```

**Campos implementados:**
- `username`: Texto simple
- `email`: Tipo email con validación nativa
- `password` y `confirmPassword`: Campos de contraseña

## Documentación de CSS (`style.css`)

### Reset y Configuración Global

```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Modelo de caja consistente */
}
```

### Estilos del Body
- **Fuente**: Sans-serif como fallback
- **Fondo**: Color claro (#f9f5f1f2)
- **Display**: Flex para centrado vertical y horizontal
- **Altura mínima**: 100vh para ocupar toda la pantalla

### Contenedor Principal (.container)
```css
.container {
  background-color: #fff;           /* Fondo blanco */
  border-radius: 8px;               /* Esquinas redondeadas */
  box-shadow: 0px 5px 20px rgba(0, 0, 0, 0.1); /* Sombra suave */
  width: 100%;                      /* Ancho responsive */
  max-width: 400px;                 /* Ancho máximo fijo */
  padding: 30px;                    /* Espaciado interno */
  overflow: hidden;                 /* Contenido recortado */
}
```

### Grupos de Formulario (.form-group)
```css
.form-group {
  margin-bottom: 20px;    /* Separación entre campos */
  position: relative;     /* Para posicionar mensajes de error */
}
```

### Elementos de Formulario

#### Labels
- **Display**: Block para ocupar toda la línea
- **Color**: Gris oscuro (#555)
- **Font-weight**: Negrita para mejor legibilidad

#### Inputs
```css
input {
  border: 2px solid #f0f0f0;      /* Borde gris claro */
  border-radius: 4px;             /* Esquinas redondeadas */
  display: block;                 /* Ocupa todo el ancho */
  width: 100%;
  padding: 10px;                  /* Espaciado interno */
  font-size: 14px;                /* Tamaño de fuente */
  transition: border-color 0.3s;  /* Transición suave */
}
```

#### Estados de Input
```css
input:focus {
  outline: none;                  /* Elimina outline por defecto */
  border-color: #3498db;         /* Borde azul al enfocar */
}
```

### Mensajes de Error (small)
```css
small {
  visibility: hidden;     /* Oculto por defecto */
  position: absolute;     /* Posicionamiento absoluto */
  bottom: -18px;          /* Colocado debajo del input */
  font-size: 12px;        /* Tamaño pequeño */
}
```

### Botón de Envío
```css
button {
  cursor: pointer;                /* Cambia cursor al pasar */
  background-color: #3498db;      /* Azul principal */
  border-radius: 4px;             /* Esquinas redondeadas */
  border: none;                   /* Sin borde */
  color: white;                   /* Texto blanco */
  display: block;                 /* Ocupa todo el ancho */
  font-size: 1rem;                /* Tamaño de fuente */
  margin-top: 20px;               /* Separación superior */
  padding: 12px;                  /* Espaciado interno */
  width: 100%;
  transition: background-color 0.3s; /* Transición suave */
}

button:hover {
  background-color: #2980b9;      /* Azul más oscuro al hover */
}
```

### Estados de Validación

#### Estado de Error
```css
.form-group.error input {
  border-color: #e74c3c;          /* Borde rojo */
}

.form-group.error small {
  visibility: visible;            /* Muestra mensaje de error */
  color: #e74c3c;                /* Texto rojo */
}
```

#### Estado de Éxito
```css
.form-group.success input {
  border-color: #2ecc71;          /* Borde verde */
}
```

## Documentación de JavaScript (`script.js`)

### Variables Globales
```javascript
const form = document.getElementById("registration-form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
```

### Event Listener Principal

```javascript
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Previene envío por defecto

  // Validación en cascada
  const isRequiredValid = checkRequired([username, email, password, confirmPassword]);
  let isFormValid = isRequiredValid;

  if (isRequiredValid) {
    const isUsernameValid = checkLength(username, 3, 15);
    const isEmailValid = checkEmail(email);
    const isPasswordValid = checkLength(password, 6, 25);
    const isPasswordsMatch = checkPasswordsMatch(password, confirmPassword);

    isFormValid = isUsernameValid && isEmailValid && isPasswordValid && isPasswordsMatch;
  }

  if (isFormValid) {
    alert("Registration successful!");
    form.reset(); // Limpia el formulario
    // Restablece clases CSS
    document.querySelectorAll(".form-group").forEach((group) => {
      group.className = "form-group";
    });
  }
});
```

### Funciones de Validación

#### 1. `checkPasswordsMatch(input1, input2)`
**Propósito**: Verifica que dos contraseñas coincidan

```javascript
function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showError(input2, "Passwords do not match");
    return false;
  }
  return true;
}
```

#### 2. `checkEmail(email)`
**Propósito**: Valida formato de email usando expresión regular

```javascript
function checkEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email.value.trim())) {
    showSuccess(email);
    return true;
  } else {
    showError(email, "Email is not valid");
    return false;
  }
}
```

**Explicación del Regex**:
- `^[^\s@]+`: Comienza con uno o más caracteres que no sean espacio o @
- `@[^\s@]+`: Seguido de @ y uno o más caracteres que no sean espacio o @
- `\.[^\s@]+$`: Termina con punto y dominio

#### 3. `checkLength(input, min, max)`
**Propósito**: Valida longitud del texto en un input

```javascript
function checkLength(input, min, max) {
  if (input.value.length < min) {
    showError(input, `${formatFieldName(input)} must be at least ${min} characters.`);
    return false;
  } else if (input.value.length > max) {
    showError(input, `${formatFieldName(input)} must be less than ${max} characters.`);
    return false;
  } else {
    showSuccess(input);
    return true;
  }
}
```

#### 4. `checkRequired(inputArray)`
**Propósito**: Verifica que campos requeridos no estén vacíos

```javascript
function checkRequired(inputArray) {
  let isValid = true;

  inputArray.forEach((input) => {
    if (input.value.trim() === "") {
      showError(input, `${formatFieldName(input)} is required`);
      isValid = false;
    } else {
      showSuccess(input);
    }
  });

  return isValid;
}
```

### Funciones Auxiliares

#### 1. `formatFieldName(input)`
**Propósito**: Formatea el ID del input para mostrar en mensajes

```javascript
function formatFieldName(input) {
  if (input.id === "confirmPassword") { // Para mayor legibilidad
    return "Confirmed password"
  }
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}
// Ejemplo: "username" → "Username"
```

#### 2. `showError(input, message)`
**Propósito**: Muestra estado de error en un campo

```javascript
function showError(input, message) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group error"; // Aplica clases CSS
  const small = formGroup.querySelector("small");
  small.innerText = message; // Establece mensaje de error
}
```

#### 3. `showSuccess(input)`
**Propósito**: Muestra estado de éxito en un campo

```javascript
function showSuccess(input) {
  const formGroup = input.parentElement;
  formGroup.className = "form-group success"; // Aplica clases CSS
}
```

---
## Flujo de Validación

1. **Prevención de envío**: El formulario no se envía hasta que pase todas las validaciones
2. **Validación de campos requeridos**: Verifica que ningún campo esté vacío
3. **Validaciones específicas**:
   - Username: 3-15 caracteres
   - Email: Formato válido
   - Password: 6-25 caracteres
   - Confirm Password: Coincide con password
4. **Feedback visual**: Estados de error/éxito con colores y mensajes
5. **Reset**: Limpieza del formulario tras envío exitoso

## Consideraciones de UX

- **Feedback inmediato**: Mensajes de error claros y específicos
- **Estados visuales**: Colores diferenciados para éxito/error
- **Accesibilidad**: Labels asociados correctamente con inputs
- **Responsive**: Diseño adaptable a diferentes tamaños de pantalla