# Quiz Game

Un juego de preguntas interactivo y responsive desarrollado con HTML, CSS y JavaScript.

## Descripción

Este proyecto es un cuestionario interactivo que presenta preguntas de conocimiento general con múltiples opciones de respuesta. Los usuarios pueden probar sus conocimientos, recibir puntuaciones instantáneas y ver sus resultados al finalizar el quiz.

## Características

- **Interfaz moderna y responsive** - Se adapta a diferentes tamaños de pantalla
- **Preguntas dinámicas** - Las preguntas se cargan y muestran automáticamente
- **Sistema de puntuación** - Seguimiento en tiempo real del puntaje
- **Retroalimentación visual** - Colores diferentes para respuestas correctas e incorrectas
- **Barra de progreso** - Muestra el avance durante el quiz
- **Pantalla de resultados** - Muestra el puntaje final con mensajes personalizados
- **Reinicio fácil** - Permite jugar múltiples veces

## Tecnologías Utilizadas

- **HTML5** - Estructura semántica
- **CSS3** - Estilos y diseño responsive
- **JavaScript (ES6)** - Lógica interactiva y manipulación del DOM

## Estructura de Archivos
```
quiz-game/
│
├── index.html # Estructura principal de la aplicación
├── style.css # Estilos y diseño responsive
└── script.js # Lógica del juego y funcionalidades
```

## Cómo Ejecutar

1. **Descarga los archivos**: Asegúrate de tener los tres archivos (`index.html`, `style.css`, `script.js`) en la misma carpeta.

2. **Abre el proyecto**:
   - Método 1: Haz doble clic en `index.html`
   - Método 2: Abre `index.html` en tu navegador web
   - Método 3: Usa un servidor local (como Live Server en VS Code)

3. **¡Juega!**: Haz clic en "Start Quiz" para comenzar.

## Cómo Jugar

1. **Inicio**: Haz clic en "Start Quiz" en la pantalla inicial
2. **Responder**: Selecciona una respuesta haciendo clic en los botones
3. **Retroalimentación**: 
   - Verde = Respuesta correcta
   - Rojo = Respuesta incorrecta
4. **Progreso**: Avanza automáticamente a la siguiente pregunta
5. **Resultados**: Al finalizar, verás tu puntuación y un mensaje personalizado
6. **Reiniciar**: Usa "Restart Quiz" para jugar nuevamente

## Preguntas Incluidas

El quiz incluye 5 preguntas sobre:
- Capitales del mundo
- Planetas del sistema solar
- Geografía y océanos
- Lenguajes de programación
- Símbolos químicos

## Personalización

### Agregar Más Preguntas
Edita el array `quizQuestions` en `script.js`:

```javascript
{
    question: "Tu pregunta aquí?",
    answers: [
        { text: "Opción 1", correct: false },
        { text: "Opción 2", correct: true },
        { text: "Opción 3", correct: false },
        { text: "Opción 4", correct: false }
    ]
}
```
### Posibles Mejoras Futuras

- Temporizador por pregunta

- Diferentes categorías de preguntas

- Sistema de niveles de dificultad

- Almacenamiento de puntuaciones máximas

- Efectos de sonido

- Animaciones más elaboradas
---
# Explicación del Código - Quiz Game

## Estructura General del Código JavaScript

### 1. Selección de Elementos DOM
```javascript
const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
// ... otros elementos

const quizQuestions = [
    {
        question: "Texto de la pregunta",
        answers: [
            { text: "Opción", correct: true/false }
        ]
    }
];
```

- Estructura: Array de objetos, cada objeto representa una pregunta

- Cada pregunta contiene:

    -    question: Texto de la pregunta

    -   answers: Array de posibles respuestas

    -   correct: Booleano que indica si es la respuesta correcta

```javascript
let currentQuestionIndex = 0;
let score = 0;
let answersDisabled = false;
```
***currentQuestionIndex***: Controla qué pregunta se muestra actualmente
***score***: Lleva el conteo de respuestas correctas
***answersDisabled***: Previene múltiples clics durante la transición

### 2. Funciones principales

```javascript
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    scoreSpan.textContent = 0;
    
    startScreen.classList.remove("active");
    quizScreen.classList.add("active");
    
    showQuestion();
}

function showQuestion() {
    const currentQuestion = quizQuestions[currentQuestionIndex];
    
    // Actualiza número de pregunta
    currentQuestionSpan.textContent = currentQuestionIndex + 1;
    
    // Actualiza barra de progreso
    const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100;
    progressBar.style.width = progressPercent + "%";
    
    // Muestra la pregunta
    questionText.textContent = currentQuestion.question;
    
    // Crea botones de respuestas
    answersContainer.innerHTML = "";
    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.textContent = answer.text;
        button.dataset.correct = answer.correct;
        button.addEventListener("click", selectAnswer);
        answersContainer.appendChild(button);
    });
}

function selectAnswer(event) {
    if (answersDisabled) return;
    answersDisabled = true;

    const selectedButton = event.target;
    const isCorrect = selectedButton.dataset.correct === "true";

    // Aplica estilos de retroalimentación
    Array.from(answersContainer.children).forEach(button => {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        } else if (button === selectedButton) {
            button.classList.add("incorrect");
        }
    });

    // Actualiza puntuación si es correcta
    if (isCorrect) {
        score++;
        scoreSpan.textContent = score;
    }

    // Espera 1 segundo y pasa a siguiente pregunta o resultados
    setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < quizQuestions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 1000);
}

function showResults() {
    quizScreen.classList.remove("active");
    resultScreen.classList.add("active");

    finalScoreSpan.textContent = score;

    const percentage = (score / quizQuestions.length) * 100;

    // Mensaje personalizado según puntuación
    if (percentage === 100) {
        resultMessage.textContent = "Perfect! You're a genius!";
    } else if (percentage >= 80) {
        // ... otros mensajes
    }
}

function restartQuiz() {
    resultScreen.classList.remove("active");
    startQuiz();
}
```

### 3. Event Listeners
```javascript
startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);
```
***startButton***: Inicia el quiz desde la pantalla inicial

***restartButton***: Reinicia desde la pantalla de resultados

### 4. Conceptos Técnicos Clave
**dataset**:
```javascript
button.dataset.correct = answer.correct;
```
Permite almacenar datos personalizados en elementos HTML y se accede como propiedad en JavaScript.

**classList**:
```javascript
element.classList.add("active");
element.classList.remove("active");
```
Maneja clases CSS dinámicamente y controla qué pantalla es visible.

**setTimeout**:
```javascript
setTimeout(() => {
    // código después de 1 segundo
}, 1000);
```
Crea un retraso antes de ejecutar código y mejora la experiencia de usuario mostrando retroalimentación.

### 5. Flujo del Programa

1. Usuario hace clic en "Start Quiz" → startQuiz()
2. Se muestra primera pregunta → showQuestion()
3. Usuario selecciona respuesta → selectAnswer()
4. Retroalimentación visual y espera 1 segundo
5. Siguiente pregunta o resultados finales
6. Pantalla de resultados → showResults()
7. Opción de reiniciar → restartQuiz()

Este código demuestra manipulación del DOM, manejo de eventos, y gestión de estado en una aplicación web interactiva.