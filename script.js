document.addEventListener('DOMContentLoaded', function () {
    const displayHistory = document.getElementById('display-history');
    const displayAnswer = document.getElementById('display-answer');
    const buttons = document.querySelectorAll('#button-placement .button');
    const historyContainer = document.getElementById('history');
    let isResultDisplayed = false; 

    const MAX_LENGTH = 15; // limit characters in the display 
    const operators = ['+', '-', '*', '/', '%','.']; // operators list 


    if (!displayHistory || !displayAnswer) {
        console.error('Display elements are missing in the DOM');
        return;
    }

    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const value = this.value;

            if (value === 'C') {
                clearDisplay();
            } else if (value === '=') {
                calculateResult();
            } else {
                appendToDisplay(value);
            }
        });
    });

    function clearDisplay() {
        displayHistory.value = '';
        displayAnswer.value = '';
        isResultDisplayed = false; //Clear the display after a calcul 
    }

    function appendToDisplay(value) {
        if (isResultDisplayed) {
            displayAnswer.value = '';
            isResultDisplayed = false;
        }

        // Check the length and cut to the last character 
        if (displayAnswer.value.length < MAX_LENGTH) {
            const lastChar = displayAnswer.value.slice(-1);

            // Prevent for multiple operators 
            if (operators.includes(value) && operators.includes(lastChar)) {
                return; // Ignore the operator 
            }

            displayAnswer.value += value;
        }
    }

    function calculateResult() {
        try {
            const expression = displayAnswer.value;
            const result = eval(expression);

            // Convert the result into a string and limit the length 
            let resultString = result.toString();
            if (resultString.length > MAX_LENGTH)
                 {
                resultString = resultString.substring(0, MAX_LENGTH);
            }

            // Update the display 
            displayAnswer.value = resultString;
            isResultDisplayed = true;

            // Create a new history entry 
            const historyEntry = document.createElement('div');
            historyEntry.innerText = `${expression} = ${resultString}`;
            historyContainer.prepend(historyEntry);

            // Limite the history entries at 4 
            while (historyContainer.children.length > 4) {
                historyContainer.removeChild(historyContainer.lastChild);
            }
        } catch (error) {
            displayAnswer.value = 'Error';
        }
    }
});

