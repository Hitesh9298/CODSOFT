const previousDisplay = document.getElementById('previousDisplay');
const currentDisplay = document.getElementById('currentDisplay');
const buttons = document.querySelectorAll('.btn');

let currentInput = '';
let previousInput = '';
let operator = '';

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;

        if (button.classList.contains('number') || value === '.') {
            handleNumber(value);
        } else if (value === 'AC') {
            clearDisplay();
        } else if (value === '=') {
            calculate();
        } else if (value === '⌫') {
            backspace();
        } else {
            handleOperator(value);
        }
    });
});

function handleNumber(value) {
    if (currentInput.includes('.') && value === '.') return;
    currentInput += value;
    updateDisplay();
}

function handleOperator(value) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculate();
    }
    operator = value;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    let result = 0;
    const prev = parseFloat(previousInput);
    const curr = parseFloat(currentInput);

    if (isNaN(prev) || isNaN(curr)) return;

    switch (operator) {
        case '+':
            result = prev + curr;
            break;
        case '−':
            result = prev - curr;
            break;
        case '×':
            result = prev * curr;
            break;
        case '÷':
            result = prev / curr;
            break;
        default:
            return;
    }

    // Round the result to 3 decimal places if division operation
    if (operator === '÷') {
        result = Math.round(result * 1000) / 1000;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operator = '';
    currentDisplay.textContent = '0';
    previousDisplay.textContent = '';
}

function backspace() {
    currentInput = currentInput.slice(0, -1);
    if (currentInput === '') {
        currentInput = '0';
    }
    updateDisplay();
}

function updateDisplay() {
    currentDisplay.textContent = currentInput;
    previousDisplay.textContent = `${previousInput} ${operator}`;
}
