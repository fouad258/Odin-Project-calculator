let accessValue = '0';
const access = document.getElementById('result');

// Function to add a digit to the display
function addToDisplay(digit) {
  if (access.value === '') {
    access.value = digit;
  } else if (digit === '.' && access.value.includes('.')) {
    access.value += digit;
  } else {
    access.value += digit;
  }
}

function accessDisplay() {
  access.innerText = accessValue;
  if (accessValue.length > 9) {
    access.innerText = accessValue.substring(0, 9);
  }
}

accessDisplay();

function inputDecimal(dot) {
  if (accessValue === '0') {
    accessValue = '0' + dot;
  } else if (!accessValue.includes(dot)) {
    accessValue += dot;
  }
}

function addOperator(operator) {
  access.value += operator;
}

function isOperator(char) {
  return char === '+' || char === '-' || char === '*' || char === '/';
}

function factorial(a) {
  if (a === 0) return 1;
  let product = 1;
  for (let i = a; i > 0; i--) {
    product *= i;
  }
  return product;
}

function isDigit(char) {
  return /[0-9]/.test(char);
}

// Function to evaluate the expression and display the result
function calculate() {
  const expression = access.value;

  // Validate the expression
  if (!validateExpression(expression)) {
    access.value = 'Invalid expression';
    return;
  }

  let result = null;
  let operator = null;
  let currentNumber = '';

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];

    if (isOperator(char)) {
      if (currentNumber !== '') {
        const number = parseFloat(currentNumber);
        if (result === null) {
          result = number;
        } else {
          result = performOperation(result, operator, number);
        }
        currentNumber = '';
      }
      operator = char;
    } else {
      currentNumber += char;
    }
  }

  if (currentNumber !== '') {
    const number = parseFloat(currentNumber);
    if (result === null) {
      result = number;
    } else {
      result = performOperation(result, operator, number);
    }
  }

  access.value = result !== null ? result.toString() : 'Error';
  access.value = roundedResult !== null ? roundedResult.toString() : 'Error';
}






function performOperation(a, operator, b) {
  switch (operator) {
    case '+':
      return a + b;
    case '-':
      return a - b;
    case '*':
      return a * b;
    case '/':
      if (b === 0) {
        access.value = 'Division by zero';
        throw new Error('Division by zero');
      }
      return a / b;
    default:
      throw new Error('Invalid operator');
  }
}

function roundToTwoDecimals(number) {
  return Math.round((number + Number.EPSILON) * 100) / 100;
}

// Function to validate the expression
function validateExpression(expression) {
  const pattern = /^(-?\d*\.?\d+)\s*([-+*/])\s*(-?\d*\.?\d+)$/;
  return pattern.test(expression);
}

// Function to clear the display
function clearDisplay() {
  access.value = '';
}

//Add Event handler for keyboard keys
window.addEventListener('keydown', function (e) {
  const key = e.key;

  // Check the key plus its value on the keyboard
  switch (key) {
    case '0':
    case '1':
    case '2':
    case '3':
    case '4':
    case '5':
    case '6':
    case '7':
    case '8':
    case '9':
    case '/':
    case '*':
    case '-':
    case '+':
    case '.':
      addToDisplay(key);
      break;
    case '=':
      calculate();
      break;
    case 'Backspace':
      clearDisplay();
      break;
    default:
      break;
  }
});
