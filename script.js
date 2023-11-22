// Function to read time input from the DOM
function readTimeInput() {
    return document.getElementById("timeInput").value;
}
// Function to display an error message on the DOM
function displayError(message, resultElement, errorElement) {
    errorElement.textContent = message;
    resultElement.textContent = ""; // Clear any previous result
    errorElement.classList.add("error"); // Apply error styling
}
// Function to display the result on the DOM
function displayResult(result, resultElement, errorElement) {
    resultElement.textContent = result;
    errorElement.textContent = ""; // Clear any previous error
    errorElement.classList.remove("error"); // Remove error styling
}
// Function to calculate industrial hours from hours and minutes
function calculateIndustrialHours(hours, minutes) {
    return hours + minutes / 60;
}
// Function to format a number to two decimal places
function formatToTwoDecimalPlaces(number) {
    return number.toFixed(2);
}
// Function to validate input values
function validateInput(hours, minutes) {
    return !isNaN(hours) && !isNaN(minutes) && hours >= 0 && hours <= 23 && minutes >= 0 && minutes <= 59;
}
// Main conversion function
function convertTime() {
    const timeInput = readTimeInput();
    const resultElement = document.getElementById("result");
    const errorElement = document.getElementById("error");
    if (timeInput.trim() === "") {
        displayError("Please enter a duration in the format hh:mm or in minutes.", resultElement, errorElement);
    } else {
        errorElement.textContent = "";
        if (timeInput.includes(":")) {
            const [hours, minutes] = timeInput.split(":").map(part => parseInt(part));
            if (validateInput(hours, minutes)) {
                const decimalHours = calculateIndustrialHours(hours, minutes);
                displayResult(`Industrial Hours: ${formatToTwoDecimalPlaces(decimalHours)} hours`, resultElement, errorElement);
            } else {
                displayError("Invalid entry. Hours must be between 0 and 23, and minutes must be between 0 and 59.", resultElement, errorElement);
            }
        } else {
            const minutes = parseInt(timeInput);
            if (!isNaN(minutes) && minutes >= 0) {
                const decimalHours = calculateIndustrialHours(0, minutes);
                displayResult(`Industrial Hours: ${formatToTwoDecimalPlaces(decimalHours)} hours`, resultElement, errorElement);
            } else {
                displayError("Invalid entry. Please enter a valid duration in the format hh:mm or in minutes.", resultElement, errorElement);
            }
        }
    }
}
// Add event listener for the Enter key on the input field
document.getElementById("timeInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        convertTime();
    }
});