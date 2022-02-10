const screen = document.getElementById("screen");
const buttons = document.getElementById("buttons");
const digitButtons = document.getElementById("digitButtons");
const operateButtons = document.getElementById("operateButtons");
const clearButton = document.getElementById("clear");
const equalsButton = document.getElementById("equals");

let num1 = "";
let num2 = "";
let operator = "";
let sum = "";


start();

function start() {
  digitButtons.addEventListener("click", (e) => {
    if (screen.textContent === "This is the screen" || screen.textContent === "") {
      screen.textContent = "";
    }
    screen.textContent += e.target.value;

    if (operator === "") {
      num1 += e.target.value;
    } else {
      num2 += e.target.value;
    }

  })

  operateButtons.addEventListener("click", (e) => {
    switch (e.target.id) {
      case "add": operator = "+";
        break;
      case "subtract": operator = "-";
        break;
      case "multiply": operator = "*";
        break;
      case "divide": operator = "/";
    }
    screen.textContent = "";
  })

  equalsButton.addEventListener("click", (e) => {
    screen.textContent = operate(operator, num1, num2);
    console.log(`num1: ${num1}`);
    console.log(`num2: ${num2}`);
  })

  clearButton.addEventListener("click", (e) => {
    screen.textContent = ""
    num1 = "";
    num2 = "";
    operator = "";
    sum = "";
  })
}



// function start() {
//   let num1 = "";
//   let num2 = "";
//   let sum = "";

//   digitButtons.addEventListener("click", (e) => {
//     console.log(`e.target.id: ${e.target.id}`)
//     console.log(`e.target.nodeName: ${e.target.nodeName}`)
//     screen.textContent = e.target.id;
    
//     if (num1 === "") {
//       num1 = e.target.id
//     } else {
//       num2 = e.target.id
//       screen.textContent = add(parseInt(num1), parseInt(num2));
//       num1 = num2;
//     }
//     console.log(`num1: ${parseInt(num1)}`)
//     console.log(`num2: ${num2}`)

//   })


// }

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

function operate(operator, n1, n2) {
  switch(operator) {
    case "+" : return add(parseInt(n1), parseInt(n2));
    case "-" : return subtract(parseInt(n1), parseInt(n2));
    case "/" : return divide(parseInt(n1), parseInt(n2));
    case "*" : return multiply(parseInt(n1), parseInt(n2));
  }
}

// console.log(operate("/", 2, 4))

// const screen = document.getElementById("screen");
// screen.textContent = "Hi"