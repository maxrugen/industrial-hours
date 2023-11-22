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
    if (!isNaN(hours) && !isNaN(minutes)) {
        return (hours >= 0 && minutes >= 0 && minutes <= 59);
    } else if (isNaN(hours) && isNaN(minutes) && /^\d{1,2}:\d{2}$/.test(`${hours}:${minutes}`)) {
        const [enteredHours, enteredMinutes] = `${hours}:${minutes}`.split(":").map(part => parseInt(part));
        return validateInput(enteredHours, enteredMinutes);
    }
    return false;
}
// Function to toggle the visibility of the conversion table and update link text
function toggleTableVisibility() {
    const tableContainer = document.getElementById("calculationTableContainer");
    const link = document.getElementById("showTableLink");
    if (tableContainer.style.display === "none" || tableContainer.style.display === "") {
        tableContainer.style.display = "block";
        link.textContent = "Hide conversion table";
    } else {
        tableContainer.style.display = "none";
        link.textContent = "Show conversion table";
    }
}
// Function to generate and display the calculation table
function generateCalculationTable() {
    const tableContainer = document.getElementById("calculationTableContainer");
    const table = document.createElement("table");
    table.classList.add("conversionTable");
    const headers = ["Minutes", "Industrial Hours", "Minutes", "Industrial Hours", "Minutes", "Industrial Hours"];
    // Create table header
    const headerRow = table.insertRow();
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    // Create table rows
    const rows = [
        [0, 0.00, 21, 0.35, 42, 0.70],
        [1, 0.02, 22, 0.37, 43, 0.72],
        [2, 0.03, 23, 0.38, 44, 0.73],
        [3, 0.05, 24, 0.40, 45, 0.75],
        [4, 0.07, 25, 0.42, 46, 0.77],
        [5, 0.08, 26, 0.43, 47, 0.78],
        [6, 0.10, 27, 0.45, 48, 0.80],
        [7, 0.12, 28, 0.47, 49, 0.82],
        [8, 0.13, 29, 0.48, 50, 0.83],
        [9, 0.15, 30, 0.50, 51, 0.85],
        [10, 0.17, 31, 0.52, 52, 0.87],
        [11, 0.18, 32, 0.53, 53, 0.88],
        [12, 0.20, 33, 0.55, 54, 0.90],
        [13, 0.22, 34, 0.57, 55, 0.92],
        [14, 0.23, 35, 0.58, 56, 0.93],
        [15, 0.25, 36, 0.60, 57, 0.95],
        [16, 0.27, 37, 0.62, 58, 0.97],
        [17, 0.28, 38, 0.63, 59, 0.98],
        [18, 0.30, 39, 0.65, 60, 1.00],
        [19, 0.32, 40, 0.67],
        [20, 0.33, 41, 0.68],
    ];
    rows.forEach(rowData => {
        const row = table.insertRow();
        rowData.forEach(cellData => {
            const cell = row.insertCell();
            cell.textContent = cellData;
        });
    });
    tableContainer.innerHTML = ""; // Clear existing content
    tableContainer.appendChild(table);
}
// Main conversion function
function convertTime() {
    const timeInput = readTimeInput();
    const resultElement = document.getElementById("result");
    const errorElement = document.getElementById("error");
    // Check for non-numeric characters
    if (!/^\d+$|^\d{1,2}:\d{2}$/.test(timeInput)) {
        displayError("Invalid entry. Please enter a valid duration in the format hh:mm or in minutes.", resultElement, errorElement);
        return;
    }
    errorElement.textContent = "";
    if (timeInput.includes(":")) {
        const [hours, minutes] = timeInput.split(":").map(part => parseInt(part));
        if (validateInput(hours, minutes)) {
            const decimalHours = calculateIndustrialHours(hours, minutes);
            displayResult(`Industrial Hours: ${formatToTwoDecimalPlaces(decimalHours)} hours`, resultElement, errorElement);
        } else {
            displayError("Invalid entry. Minutes must be between 0 and 59.", resultElement, errorElement);
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
// Add event listener for the Enter key on the input field
document.getElementById("timeInput").addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        convertTime();
    }
});
// Initial call to generate and display the calculation table
generateCalculationTable();