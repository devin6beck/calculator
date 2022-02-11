const screen = document.getElementById("screen");
const digitButtons = document.querySelectorAll(".digit")
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let num1;
let num2;
let sum;
let helper = false;
let operator = undefined;

clearButton.addEventListener("click", clear);
equalsButton.addEventListener("click", equals);

digitButtons.forEach((button) => 
  button.addEventListener("click", () => appendNumber(button.value))
)

operatorButtons.forEach((button) => 
  button.addEventListener("click", () => evaluate(button.id))
)

// this runs when a digit Button is hit
function appendNumber(num) {
  console.log(`appendNumber start`)
  console.log(`you clicked ${num}`);

  if (!helper) {
    screen.textContent = "";
    helper = true;
  }

  screen.textContent += num;

 
  console.log(`num1: ${num1}`);
  console.log(`num2: ${num2}`);
  console.log(`sum: ${sum}`);
  console.log(`appendNumber end`)
}

// this runs when an operator Button is hit
function evaluate(buttonId) {
  console.log(`evaluate start`)
  if (!num1) {
    num1 = screen.textContent;
    setOperator(buttonId);
  } else if (!num2 && helper) {
    num2 = screen.textContent;
    sum = operate(operator, num1, num2);
    screen.textContent = sum;
    setOperator(buttonId);
    num1 = sum;
    num2 = undefined;
  } else {
    setOperator(buttonId);
  }

  helper = false;
  
  console.log(`num1: ${num1}`);
  console.log(`num2: ${num2}`);
  console.log(`sum: ${sum}`);
  console.log(`evaluate end`);
  
}

function equals() {
  num2 = screen.textContent;
  sum = operate(operator, num1, num2);
  screen.textContent = sum;
  num1 = sum;
  num2 = undefined;
  helper = false;
}

function clear() {
  num1 = undefined;
  num2 = undefined;
  sum = undefined;
  helper = false;
  operator = undefined;
  screen.textContent = "This is the screen";
}

function setOperator(buttonId) {
  switch (buttonId) {
    case "add": operator = "+";
      break;
    case "subtract": operator = "-";
      break;
    case "multiply": operator = "*";
      break;
    case "divide": operator = "/";
  }
}

function operate(operator, n1, n2) {
  switch(operator) {
    case "+" : return add(parseInt(n1), parseInt(n2));
    case "-" : return subtract(parseInt(n1), parseInt(n2));
    case "/" : return divide(parseInt(n1), parseInt(n2));
    case "*" : return multiply(parseInt(n1), parseInt(n2));
  }
}

function add(n1, n2) {
  return n1 + n2;
}

function subtract(n1, n2) {
  return n1 - n2;
}

function multiply(n1, n2) {
  return n1 * n2;
}

function divide(n1, n2) {
  if (n2 === 0) {
    return "Cannot divide by 0..."
  }
  return n1 / n2;
}

function isNumeric(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}