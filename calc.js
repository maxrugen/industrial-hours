// Accepts "h:mm" (any number of hours, minutes 00-59) or plain minutes.
const DURATION_PATTERN = /^(?:(\d+):([0-5]\d)|(\d+))$/;

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

export function toIndustrialHours(minutes) {
    return minutes / 60;
}

export function formatHours(hours) {
    return hours.toFixed(2);
}
