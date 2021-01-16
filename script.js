// Initial setup for populate() function
let currentNumber = "0", storedNumber = "", operator = "", digit = "";
let displayDiv = document.querySelector("#display");
let keys = document.querySelectorAll("button");
keys.forEach(key => {
    key.addEventListener("click", populate);
});

function operate(operator, stored, current) {
    // If there isn't a stored number yet, return current number so it will become stored number
    if (stored === "") return current;

    // Conversion happens after checking that a === ""; if a was converted first, it would be 
    // indistinguishable from 0, which could be a stored number
    stored = +stored, current = +current;

    switch(operator) {
        case "+":
            return stored + current;
        case "−":
            return stored - current;
        case "×":
            return stored * current;
        case "÷":
            return (current === 0) ? "ERROR" : stored / current;
        case "=":
            return current;
    }
}

function populate(e) {
    let classList = e.target.classList;
    if (classList.contains("digit-key")) {
        digit = e.target.textContent;
        if (currentNumber === "0") currentNumber = "";
        else if (currentNumber === "-0") currentNumber = "-";
        currentNumber += digit;
        display(currentNumber);
    } else if (classList.contains("operator-key")) {
        // The only time there is no current number is after hitting an operator key
        // This condition allows the user to hit multiple operator keys in a row without changing the storedValue
        if (currentNumber) {
            storedNumber = operate(operator, storedNumber, currentNumber);
            display(clip(storedNumber));
            currentNumber = "";
        }
        operator = e.target.textContent;
        // If user tried to divide by zero, reset to defaults
        if (storedNumber === "ERROR") clear();
    } else if (classList.contains("clear-key")) {
        clear();
        display(currentNumber);
    } else if (classList.contains("decimal-key")) {
        if (currentNumber === "") currentNumber = "0";
        currentNumber += (currentNumber.includes(".")) ? "" : ".";
        display(currentNumber);
    } else if (classList.contains("sign-key")) {
        if (currentNumber === "0" || currentNumber === "") currentNumber = "-0";
        else if (currentNumber === "-0") currentNumber = "0";
        else currentNumber = (currentNumber *= -1).toString();
        display(currentNumber);
    }
}

function clear() {
    currentNumber = "0";
    storedNumber = "";
    operator = "";
}

// Ensure that numbers do not overflow screen
const MAX = 12;
function clip(displayStuff) {
    displayStuff = displayStuff.toString();
    return (displayStuff.length <= MAX) ? displayStuff : displayStuff.substr(0, MAX) + "...";
}

function display(text) {
    displayDiv.textContent = text;
}