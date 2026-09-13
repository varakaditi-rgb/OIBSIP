const currentDisplay = document.getElementById("current-display");
const previousDisplay = document.getElementById("previous-display");
const errorMessage = document.getElementById("error-message");

const numberButtons = document.querySelectorAll(".number");
const operatorButtons = document.querySelectorAll(".operator");

const equalsButton = document.getElementById("equals");
const clearButton = document.getElementById("clear");
const backspaceButton = document.getElementById("backspace");

let currentNumber = "";
let previousNumber = "";
let operator = null;
let shouldResetDisplay = false;




numberButtons.forEach(button => {

    button.addEventListener("click", () => {

        const number = button.dataset.number;

        inputNumber(number);

    });

});




operatorButtons.forEach(button => {

    button.addEventListener("click", () => {

        const selectedOperator = button.dataset.operator;

        chooseOperator(selectedOperator);

    });

});



function inputNumber(number) {

    clearError();

    if (shouldResetDisplay) {

        currentNumber = "";
        shouldResetDisplay = false;

    }

    
    if (number === "." && currentNumber.includes(".")) {
        return;
    }

   
    if (currentNumber === "0" && number !== ".") {
        currentNumber = number;
    } else {
        currentNumber += number;
    }

    updateDisplay();
}




function chooseOperator(selectedOperator) {

    clearError();

    if (currentNumber === "" && previousNumber === "") {
        return;
    }

    if (previousNumber !== "" && currentNumber !== "") {

        calculate();

    }

    previousNumber = currentNumber;
    currentNumber = "";

    operator = selectedOperator;

    previousDisplay.textContent =
        `${previousNumber} ${getOperatorSymbol(operator)}`;

    updateDisplay();
}



function calculate() {

    if (previousNumber === "" || currentNumber === "" || !operator) {
        return;
    }

    const firstNumber = parseFloat(previousNumber);
    const secondNumber = parseFloat(currentNumber);

    let result;

    switch (operator) {

        case "+":
            result = firstNumber + secondNumber;
            break;

        case "-":
            result = firstNumber - secondNumber;
            break;

        case "*":
            result = firstNumber * secondNumber;
            break;

        case "/":

            if (secondNumber === 0) {

                showError("Cannot divide by zero!");

                return;

            }

            result = firstNumber / secondNumber;
            break;

        default:
            return;
    }


    result = Number(result.toFixed(10));

    currentNumber = result.toString();

    previousNumber = "";

    operator = null;

    previousDisplay.textContent = "";

    shouldResetDisplay = true;

    updateDisplay();
}



equalsButton.addEventListener("click", () => {

    calculate();

});


clearButton.addEventListener("click", () => {

    currentNumber = "";
    previousNumber = "";
    operator = null;

    previousDisplay.textContent = "";

    clearError();

    updateDisplay();

});


backspaceButton.addEventListener("click", () => {

    clearError();

    if (shouldResetDisplay) {

        currentNumber = "";
        shouldResetDisplay = false;

    }

    currentNumber = currentNumber.slice(0, -1);

    updateDisplay();

});


function updateDisplay() {

    currentDisplay.textContent =
        currentNumber || "0";

}


function getOperatorSymbol(operator) {

    const symbols = {

        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷"

    };

    return symbols[operator];

}


function showError(message) {

    errorMessage.textContent = message;

}


function clearError() {

    errorMessage.textContent = "";

}


document.addEventListener("keydown", event => {

    if (
        (event.key >= "0" && event.key <= "9") ||
        event.key === "."
    ) {

        inputNumber(event.key);

    }

    if (
        event.key === "+" ||
        event.key === "-" ||
        event.key === "*" ||
        event.key === "/"
    ) {

        chooseOperator(event.key);

    }

    if (event.key === "Enter" || event.key === "=") {

        calculate();

    }

    if (event.key === "Backspace") {

        backspaceButton.click();

    }

    if (event.key === "Escape") {

        clearButton.click();

    }

});
