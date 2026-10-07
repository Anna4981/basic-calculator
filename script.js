// ---------- State ----------
let currentValue = "0";   // what is shown on the display (as a string)
let previousValue = null; // first operand (number)
let operator = null;      // "+", "-", "*", "/"
let waitingForNext = false; // true when the next digit should start a new number
let hasError = false;

const resultEl = document.getElementById("result");
const expressionEl = document.getElementById("expression");

const symbols = { "+": "+", "-": "−", "*": "×", "/": "÷" };

// ---------- Display ----------
function updateDisplay() {
  resultEl.textContent = currentValue;
  resultEl.classList.toggle("small", hasError);

  if (operator !== null && previousValue !== null) {
    expressionEl.textContent = `${formatNumber(previousValue)} ${symbols[operator]}`;
  } else {
    expressionEl.textContent = "";
  }
}

function formatNumber(num) {
  // toPrecision avoids float noise such as 0.1 + 0.2 = 0.30000000000000004
  return String(parseFloat(num.toPrecision(12)));
}

// ---------- Core arithmetic (no eval) ----------
function calculate(a, b, op) {
  switch (op) {
    case "+": return a + b;
    case "-": return a - b;
    case "*": return a * b;
    case "/": return b === 0 ? null : a / b; // null = divide by zero
    default:  return b;
  }
}

function showDivideByZero() {
  currentValue = "Cannot divide by zero";
  previousValue = null;
  operator = null;
  waitingForNext = true;
  hasError = true;
  updateDisplay();
}

// ---------- Handlers ----------
function inputDigit(digit) {
  if (hasError) clearAll();

  if (waitingForNext) {
    currentValue = digit;
    waitingForNext = false;
  } else {
    currentValue = currentValue === "0" ? digit : currentValue + digit;
  }
  updateDisplay();
}

function inputDecimal() {
  if (hasError) clearAll();

  if (waitingForNext) {
    currentValue = "0.";
    waitingForNext = false;
  } else if (!currentValue.includes(".")) {
    currentValue += ".";
  }
  updateDisplay();
}

function chooseOperator(nextOperator) {
  if (hasError) return;

  // Changed their mind about the operator: just swap it
  if (operator !== null && waitingForNext) {
    operator = nextOperator;
    updateDisplay();
    return;
  }

  const inputNumber = parseFloat(currentValue);

  if (previousValue === null) {
    previousValue = inputNumber;
  } else if (operator !== null) {
    // Chained calculation: 5 + 3 + ... evaluates 5 + 3 first
    const answer = calculate(previousValue, inputNumber, operator);
    if (answer === null) return showDivideByZero();
    previousValue = parseFloat(formatNumber(answer));
    currentValue = formatNumber(answer);
  }

  operator = nextOperator;
  waitingForNext = true;
  updateDisplay();
}

function equals() {
  if (hasError || operator === null || waitingForNext) return;

  const answer = calculate(previousValue, parseFloat(currentValue), operator);
  if (answer === null) return showDivideByZero();

  currentValue = formatNumber(answer);
  previousValue = null;
  operator = null;
  waitingForNext = true; // next digit starts a fresh calculation
  updateDisplay();
}

function clearAll() {
  currentValue = "0";
  previousValue = null;
  operator = null;
  waitingForNext = false;
  hasError = false;
  updateDisplay();
}

function backspace() {
  if (hasError) return clearAll();
  if (waitingForNext) return;

  currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
  if (currentValue === "-") currentValue = "0";
  updateDisplay();
}

// ---------- Event handling (button clicks via delegation) ----------
document.querySelector(".keys").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;

  const { action, value } = button.dataset;

  switch (action) {
    case "digit":     inputDigit(value); break;
    case "decimal":   inputDecimal(); break;
    case "operator":  chooseOperator(value); break;
    case "equals":    equals(); break;
    case "clear":     clearAll(); break;
    case "backspace": backspace(); break;
  }
});

// ---------- Keyboard support ----------
document.addEventListener("keydown", (event) => {
  const key = event.key;

  if (key >= "0" && key <= "9") inputDigit(key);
  else if (key === ".") inputDecimal();
  else if (["+", "-", "*", "/"].includes(key)) {
    event.preventDefault(); // stops "/" opening quick-find in some browsers
    chooseOperator(key);
  }
  else if (key === "Enter" || key === "=") {
    event.preventDefault();
    equals();
  }
  else if (key === "Backspace") backspace();
  else if (key === "Escape" || key.toLowerCase() === "c") clearAll();
});

updateDisplay();