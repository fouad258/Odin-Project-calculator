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

// Function to add an operator to the display
function addOperator(operator) {
  access.value += operator;
} 
function isOperator(char) {
  return char === '+' || char === '-' || char === '*' || char === '/';
} 

function factorial(a) {
	if (a == 0) return 1;
	let product = 1;
	for (let i = a; i > 0; i--) {
	  product *= i;
	}
	return product;
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
  let currentNumber = null;
  
  function isDigit(char) {
    return /[0-9]/.test(char);
  }

  for (let i = 0; i < expression.length; i++) {
    const char = expression[i];
    if (isOperator(char)) {
      if (result === null) {
        result = parseFloat(expression.substring(0, i));
      }
      operator = char;
      currentNumber = null;
    } else if (currentNumber === null && isDigit(char)) {
      currentNumber = char;
    } else if (currentNumber !== null && isDigit(char)) {
      currentNumber += char;
    } else {
      // Invalid character
      access.value = 'Invalid expression';
      return;
    }
  }
  // Evaluate the last operation
  if (operator && currentNumber) {
    const secondNumber = parseFloat(currentNumber);

    switch (operator) {
      case '+':
        result += secondNumber;
        break;
      case '-':
        result -= secondNumber;
        break;
      case '*':
        result *= secondNumber;
        break;
      case '/':
        if (secondNumber === 0) {
          access.value = 'Division by zero';
          return;
        }
        result /= secondNumber;
        break;
      default:
        access.value = 'Invalid operator';
        return;
    }
  }

  access.value = result !== null ? result.toString() : 'Error';
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
window.addEventListener('keydown', function(e) {
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
