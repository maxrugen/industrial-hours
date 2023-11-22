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
// Function to toggle the visibility of the conversion table
function toggleTableVisibility() {
    const tableContainer = document.getElementById("calculationTableContainer");
    if (tableContainer.style.display === "none" || tableContainer.style.display === "") {
        tableContainer.style.display = "block";
    } else {
        tableContainer.style.display = "none";
    }
}
// Function to generate and display the calculation table
function generateCalculationTable() {
    const tableContainer = document.getElementById("calculationTableContainer");
    const table = document.createElement("table");
    table.classList.add("conversionTable");
    // Create header row
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Minutes</th><th>Industrial Hours</th><th>Minutes</th><th>Industrial Hours</th><th>Minutes</th><th>Industrial Hours</th>";
    table.appendChild(headerRow);
    // Populate table with data (30 rows)
    for (let minute = 0; minute <= 20; minute += 2) {
        const row = document.createElement("tr");
        const industrialHours1 = formatToTwoDecimalPlaces(calculateIndustrialHours(0, minute));
        const industrialHours2 = formatToTwoDecimalPlaces(calculateIndustrialHours(0, minute + 1));
        row.innerHTML = `<td>${minute}</td><td>${industrialHours1}</td><td>${minute + 20}</td><td>${industrialHours2}</td><td>${minute + 40}</td><td>${formatToTwoDecimalPlaces(calculateIndustrialHours(0, minute + 40))}</td>`;
        table.appendChild(row);
        // Additional row for odd minutes
        if (minute < 20) {
            const oddRow = document.createElement("tr");
            const oddIndustrialHours = formatToTwoDecimalPlaces(calculateIndustrialHours(0, minute + 1));
            oddRow.innerHTML = `<td>${minute + 1}</td><td>${oddIndustrialHours}</td><td>${minute + 21}</td><td>${formatToTwoDecimalPlaces(calculateIndustrialHours(0, minute + 21))}</td><td>${minute + 41}</td><td>${formatToTwoDecimalPlaces(calculateIndustrialHours(0, minute + 41))}</td>`;
            table.appendChild(oddRow);
        }
    }
    tableContainer.appendChild(table);
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
// Initial call to generate and display the calculation table
generateCalculationTable();