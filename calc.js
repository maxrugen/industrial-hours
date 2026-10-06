// Accepts "h:mm" (any number of hours, minutes 00-59) or plain minutes.
const DURATION_PATTERN = /^(?:(\d+):([0-5]\d)|(\d+))$/;
// Both separators are accepted because industrial hours are mostly used in
// comma-decimal locales, while many keyboards default to a dot.
const DECIMAL_HOURS_PATTERN = /^(\d*)[.,](\d+)$/;

export function parseDuration(input) {
    const match = DURATION_PATTERN.exec(input.trim());
    if (!match) {
        return null;
    }
    const [, hours, minutes, totalMinutes] = match;
    if (totalMinutes !== undefined) {
        return Number(totalMinutes);
    }
    return Number(hours) * 60 + Number(minutes);
}

// Returns the duration in whole minutes, rounded to the nearest minute.
export function parseDecimalHours(input) {
    const match = DECIMAL_HOURS_PATTERN.exec(input.trim());
    if (!match) {
        return null;
    }
    const [, whole, fraction] = match;
    return Math.round(Number(`${whole || 0}.${fraction}`) * 60);
}

export function toIndustrialHours(minutes) {
    return minutes / 60;
}

// Grouping is off so results can be pasted into timesheets as plain numbers.
export function formatHours(hours, locale) {
    return new Intl.NumberFormat(locale, {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
        useGrouping: false,
    }).format(hours);
}

export function formatDuration(minutes) {
    const hours = Math.floor(minutes / 60);
    const remainder = String(minutes % 60).padStart(2, "0");
    return `${hours}:${remainder}`;
}
