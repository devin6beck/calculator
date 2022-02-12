const screen = document.getElementById("screen");
const digitButtons = document.querySelectorAll(".digit")
const operatorButtons = document.querySelectorAll(".operator");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");
const decimal = document.getElementById("decimal");
const backspace = document.getElementById("backspace");

let num1;
let num2;
let sum;
// let helper is true after a digit is clicked the first time upon loading ||
// the first time a digit is clicked after clicking clear, an operator, or equals. 
// clear, operator, and equals turn let helper false.
let helper = false;
let operator = undefined;


equalsButton.addEventListener("click", equals);
decimal.addEventListener("click", appendDecimal);
backspace.addEventListener("click", removeLastDigitOnScreen);

clearButton.addEventListener("click", () => {
  clear("0");
});


digitButtons.forEach((button) => 
  button.addEventListener("click", () => appendNumber(button.textContent))
)

operatorButtons.forEach((button) => 
  button.addEventListener("click", () => evaluate(button.id))
)

// this runs when a digit Button is hit
function appendNumber(num) {

  if (!helper) {
    console.log(`!isNaN(screen.textContent) = ${!isNaN(screen.textContent)}`)

    // if 
    if(screen.textContent.includes("divide")) {
      num1 = undefined;
    }
    screen.textContent = "";
    
    helper = true;
  }

  screen.textContent += num;
}

// this runs when an operator Button is hit
function evaluate(buttonId) {

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

}

function equals() {
  num2 = screen.textContent;
  sum = operate(operator, num1, num2);
  screen.textContent = sum;
  num1 = sum;
  num2 = undefined;
  helper = false;
}

function clear(text) {
  num1 = undefined;
  num2 = undefined;
  sum = undefined;
  helper = false;
  operator = undefined;
  screen.textContent = text;
  decimal.disabled = false;
}

function appendDecimal() {

  if (!helper) {
    screen.textContent = "";
    helper = true;
  }

  screen.textContent += ".";
  decimal.disabled = true;
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
    case "+" : return roundToSix(add(Number(n1), Number(n2)));
    case "-" : return roundToSix(subtract(Number(n1), Number(n2)));
    case "/" : return divide(Number(n1), Number(n2));
    case "*" : return roundToSix(multiply(Number(n1), Number(n2)));
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
    helper = false;
    num1 = 0;
    return "Cannot divide by 0..."
  }

  return roundToSix(n1 / n2);
}

function isNumeric(num) {
  return !isNaN(parseFloat(num)) && isFinite(num);
}

// this function rounds the numer to the 6th decimal point. 
function roundToSix(num) {
  return +(Math.round(num + "e+6")  + "e-6");
}

function removeLastDigitOnScreen() {
  screen.textContent = screen.textContent.slice(0, -1);
}