import { describeConversion, toIndustrialHours, formatHours } from "./calc.js";

const form = document.getElementById("converterForm");
const input = document.getElementById("timeInput");
const resultElement = document.getElementById("result");
const errorElement = document.getElementById("error");
// Intl's default locale follows the browser's UI language, not the user's
// preferred content languages, so pass those explicitly.
const locales = navigator.languages;
const decimalExample = (1.5).toLocaleString(locales);

function showResult(message) {
    resultElement.textContent = message;
    errorElement.textContent = "";
    input.removeAttribute("aria-invalid");
}

function showError(message) {
    errorElement.textContent = message;
    resultElement.textContent = "";
    input.setAttribute("aria-invalid", "true");
}

function convertTime() {
    const description = describeConversion(input.value, locales);
    if (description === null) {
        showError(`Invalid entry. Please enter hh:mm (minutes 00–59), minutes, or decimal hours like ${decimalExample}.`);
        return;
    }
    showResult(description);
}

// One small table per 20-minute block, so the blocks can wrap on narrow screens.
function generateConversionTables() {
    const rowsPerTable = 20;
    const tableCount = 3;
    const container = document.getElementById("conversionTables");

    for (let tableIndex = 0; tableIndex < tableCount; tableIndex++) {
        const table = document.createElement("table");
        table.className = "conversionTable";

        const headerRow = table.createTHead().insertRow();
        for (const headerText of ["Minutes", "Industrial Hours"]) {
            const th = document.createElement("th");
            th.scope = "col";
            th.textContent = headerText;
            headerRow.appendChild(th);
        }

        const body = table.createTBody();
        for (let row = 0; row < rowsPerTable; row++) {
            const minutes = tableIndex * rowsPerTable + row;
            const tableRow = body.insertRow();
            tableRow.insertCell().textContent = minutes;
            tableRow.insertCell().textContent = formatHours(toIndustrialHours(minutes), locales);
        }

        container.appendChild(table);
    }
}

input.placeholder = `e.g. 1:30, 90 or ${decimalExample}`;

form.addEventListener("submit", event => {
    event.preventDefault();
    convertTime();
});

generateConversionTables();
