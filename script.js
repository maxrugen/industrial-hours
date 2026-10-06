import { parseDuration, parseDecimalHours, toIndustrialHours, formatHours, formatDuration } from "./calc.js";

const form = document.getElementById("converterForm");
const input = document.getElementById("timeInput");
const resultElement = document.getElementById("result");
const errorElement = document.getElementById("error");
// Intl's default locale follows the browser's UI language, not the user's
// preferred content languages, so pass those explicitly.
const locales = navigator.languages;

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
    const minutes = parseDuration(input.value);
    if (minutes !== null) {
        showResult(`Industrial Hours: ${formatHours(toIndustrialHours(minutes), locales)} hours`);
        return;
    }
    const decimalMinutes = parseDecimalHours(input.value);
    if (decimalMinutes !== null) {
        showResult(`Duration: ${formatDuration(decimalMinutes)} (hh:mm)`);
        return;
    }
    showError("Invalid entry. Please enter hh:mm (minutes 00–59), minutes, or decimal hours like 1,5.");
}

// Three side-by-side column pairs keep 60 rows short enough to scan.
function generateConversionTable() {
    const rowsPerColumn = 20;
    const columnPairs = 3;
    const table = document.getElementById("conversionTable");

    const headerRow = table.createTHead().insertRow();
    for (let pair = 0; pair < columnPairs; pair++) {
        for (const headerText of ["Minutes", "Industrial Hours"]) {
            const th = document.createElement("th");
            th.scope = "col";
            th.textContent = headerText;
            headerRow.appendChild(th);
        }
    }

    const body = table.createTBody();
    for (let row = 0; row < rowsPerColumn; row++) {
        const tableRow = body.insertRow();
        for (let pair = 0; pair < columnPairs; pair++) {
            const minutes = pair * rowsPerColumn + row;
            tableRow.insertCell().textContent = minutes;
            tableRow.insertCell().textContent = formatHours(toIndustrialHours(minutes), locales);
        }
    }
}

form.addEventListener("submit", event => {
    event.preventDefault();
    convertTime();
});

generateConversionTable();
