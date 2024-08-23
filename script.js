document.addEventListener("DOMContentLoaded", function () {
    const container = document.getElementById('calculator-container');

    // Create calculator UI dynamically
    const calculator = document.createElement('div');
    calculator.className = 'calculator';

    const display = document.createElement('input');
    display.className = 'form-control mb-2';
    display.setAttribute('id', 'display');
    display.setAttribute('readonly', true);

    calculator.appendChild(display);

    const buttons = [
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
        ['C', 'M+', 'M-', 'MC']
    ];

    buttons.forEach(row => {
        const rowDiv = document.createElement('div');
        rowDiv.className = 'row';

        row.forEach(text => {
            const button = document.createElement('button');
            button.className = 'btn btn-secondary col m-1';
            button.textContent = text;
            rowDiv.appendChild(button);

            // Button click event handling
            button.addEventListener('click', handleButtonClick);
        });

        calculator.appendChild(rowDiv);
    });

    container.appendChild(calculator);

    let currentInput = '';
    let memory = 0;

    function handleButtonClick(event) {
        const value = event.target.textContent;

        if (!isNaN(value) || value === '.') {
            currentInput += value;
            display.value = currentInput;
        } else if (value === 'C') {
            currentInput = '';
            display.value = '';
        } else if (value === '=') {
            try {
                currentInput = eval(currentInput);
                display.value = currentInput;
            } catch (error) {
                display.value = 'Error';
            }
        } else if (value === 'M+') {
            memory += parseFloat(currentInput) || 0;
        } else if (value === 'M-') {
            memory -= parseFloat(currentInput) || 0;
        } else if (value === 'MC') {
            memory = 0;
        } else {
            currentInput += value;
        }
    }

    // Keyboard event handling
    document.addEventListener('keydown', function(event) {
        if (!/[0-9]/.test(event.key)) {
            alert("Only numbers are allowed");
            event.preventDefault();
        }
    });
});
