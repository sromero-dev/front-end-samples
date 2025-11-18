# Expense Tracker - Documentación Técnica

## 🏗️ Estructura HTML

### Metadatos y Configuración
```html
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Expense Tracker</title>
  <link rel="stylesheet" href="style.css" />
  <link href="https://fonts.googleapis.com/css?family=Poppins..." rel="stylesheet" />
</head>
```

### Layout Principal
- **Contenedor principal**: `.container` - Envuelve toda la aplicación
- **Sección de balance**: `.balance-container` - Muestra balance total y resumen
- **Contenido principal**: `.main-content` - Grid de 2 columnas (transacciones + formulario)

### Componentes HTML
```html
<!-- Balance y Resumen -->
<div class="balance-container">
  <h2>Your Balance</h2>
  <h1 id="balance">0.00€</h1>
  <div class="summary">
    <div class="income">...</div>
    <div class="expenses">...</div>
  </div>
</div>

<!-- Lista de Transacciones -->
<div class="transaction-container">
  <h2>Transactions</h2>
  <ul id="transaction-list"><!-- Dinámico --></ul>
</div>

<!-- Formulario -->
<div class="form-container">
  <form id="transaction-form">
    <input type="text" id="description" required>
    <input type="number" id="amount" required>
    <button type="submit">Add Transaction</button>
  </form>
</div>
```

## 🎨 Estilos CSS

### Reset y Configuración Global
```css
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box; /* Modelo de caja consistente */
}

body {
  background: linear-gradient(135deg, #2e8b57, #a8d5ba);
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

### Sistema de Colores

- **Verde del contenedor principal**: *#2e8b57*, *#a8d5ba*, *#6b8e23*
- **Ingresos**: *#059669* (verde)
- **Gastos**: *#dc2626* (rojo)
- **Texto**: *#2d3436*, *#2d3748*, *#4a5568* (negro -> grisaceo)
- **Fondos**: *#fff*, *#f6f8fb*, *#f1f1f1* (blanco -> grisaceo)

### Layout con CSS Grid
```css
.summary {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}

.main-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
}
```

### Efectos y Transiciones

- **Hover effects**: transform: translateY(-2px) en tarjetas
- **Transiciones suaves**: transition: all 0.2s ease
- **Animaciones**: slideIn para entrada de transacciones
- **Gradientes**: linear-gradient(135deg, ...) para fondos

### Scrollbar Personalizado
```css
#transaction-list::-webkit-scrollbar {
  width: 8px;
}
#transaction-list::-webkit-scrollbar-track {
  background-color: #f1f1f1;
}
#transaction-list::-webkit-scrollbar-thumb {
  background-color: #cbd5e0;
}
```

### Diseño Responsive
```css
/* Tablets */
@media (max-width: 900px) {
  .main-content {
    grid-template-columns: 1fr;
  }
}

/* Móviles */
@media (max-width: 480px) {
  .summary {
    grid-template-columns: 1fr;
  }
  .balance-container h1 {
    font-size: 2.5rem;
  }
}
```

## ⚡ JavaScript - Funcionalidades

### Variables Globales
```js
const balanceEl = document.getElementById("balance");
const incomeAmountEl = document.getElementById("income-amount");
const expenseAmountEl = document.getElementById("expense-amount");
const transactionListEl = document.getElementById("transaction-list");
const transactionFormEl = document.getElementById("transaction-form");

let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
```

### Gestión de Estado

- **Almacenamiento**: `localStorage` para persistencia de datos
- **Array transactions**: Contiene objetos con `id`, `description`, `amount`

### Funciones Principales

#### 1. addTransaction(e)
```js
function addTransaction(e) {
  e.preventDefault();
  
  const description = descriptionEl.value.trim();
  const amount = parseFloat(amountEl.value);
  
  transactions.push({
    id: Date.now(), // ID único basado en timestamp
    description,
    amount,
  });
  
  localStorage.setItem("transactions", JSON.stringify(transactions));
  updateTransactionList();
  updateSummary();
  transactionFormEl.reset();
}
```

#### 2. updateTransactionList()
```js
function updateTransactionList() {
  transactionListEl.innerHTML = "";
  const sortedTransactions = [...transactions].reverse(); // Más recientes primero
  
  sortedTransactions.forEach((transaction) => {
    const transactionEl = createTransactionElement(transaction);
    transactionListEl.appendChild(transactionEl);
  });
}
```

#### 3. createTransactionElement(transaction)
```js
function createTransactionElement(transaction) {
  const li = document.createElement("li");
  li.classList.add("transaction");
  li.classList.add(transaction.amount > 0 ? "income" : "expense");
  
  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>
      ${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    </span>
  `;
  
  return li;
}
```

#### 4. updateSummary()
```js
function updateSummary() {
  const balance = transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const income = transactions
    .filter((transaction) => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const expenses = transactions
    .filter((transaction) => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  balanceEl.textContent = formatCurrency(balance);
  incomeAmountEl.textContent = formatCurrency(income);
  expenseAmountEl.textContent = formatCurrency(expenses);
}
```

#### 5. formatCurrency(number)
```js
function formatCurrency(number) {
  return new Intl.NumberFormat("sp-SP", {
    style: "currency",
    currency: "EUR",
  }).format(number);
}
```

#### 6. removeTransaction(id)
```js
function removeTransaction(id) {
  transactions = transactions.filter((transaction) => transaction.id !== id);
  localStorage.setItem("transactions", JSON.stringify(transactions)); // Nota: hay un typo en el código original
  updateTransactionList();
  updateSummary();
}
```

### Event Listeners
```js
transactionFormEl.addEventListener("submit", addTransaction);
```

## 🔧 Características Técnicas

### Persistencia de Datos
- **Almacenamiento**: Utiliza `localStorage` para guardar transacciones
- **Formato**: `JSON.stringify(transactions)`
- **Carga inicial**: `JSON.parse(localStorage.getItem("transactions")) || []`

### Formato de Moneda
- **Moneda**: Euro (EUR)
- **Localización**: Español de España (`sp-SP`)
- **Formato**: API nativa `Intl.NumberFormat`

### Diseño Responsive
- **Desktop**: Grid de 2 columnas
- **Tablet**: Una columna, lista de transacciones con altura fija
- **Móvil**: Ajustes de tipografía y espaciado

### Interacciones de Usuario
- **Efectos hover** en tarjetas y botones
- **Scroll personalizado** en lista de transacciones
- **Animaciones de entrada** para nuevas transacciones
- **Feedback visual** en formularios (estados `focus`, `hover`)

### Accesibilidad
- Formularios con atributos `required`
- Etiquetas semánticas (`label` asociados con `for`)
- Contrastes de color adecuados
- Navegación por teclado habilitada

---

*Este README proporciona una documentación completa de la estructura, estilos y funcionalidades del Expense Tracker. Puedes copiarlo y pegarlo directamente en un archivo `README.md` en tu proyecto.*