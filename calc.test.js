import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDuration, parseDecimalHours, toIndustrialHours, formatHours, formatDuration, describeConversion } from "./calc.js";

test("parses plain minutes", () => {
    assert.equal(parseDuration("90"), 90);
    assert.equal(parseDuration("0"), 0);
});

test("parses h:mm, including hours above 99", () => {
    assert.equal(parseDuration("1:30"), 90);
    assert.equal(parseDuration("0:05"), 5);
    assert.equal(parseDuration("100:00"), 6000);
});

test("ignores surrounding whitespace", () => {
    assert.equal(parseDuration(" 1:30 "), 90);
    assert.equal(parseDuration("\t90\n"), 90);
});

test("rejects invalid input", () => {
    for (const input of ["", " ", "abc", "0:60", "1:5", "1:", ":30", "-5", "1.5", "1:30:00"]) {
        assert.equal(parseDuration(input), null, `expected ${JSON.stringify(input)} to be rejected`);
    }
});

test("converts minutes to industrial hours with two decimals", () => {
    assert.equal(formatHours(toIndustrialHours(90), "en-US"), "1.50");
    assert.equal(formatHours(toIndustrialHours(42), "en-US"), "0.70");
    assert.equal(formatHours(toIndustrialHours(0), "en-US"), "0.00");
    assert.equal(formatHours(toIndustrialHours(1), "en-US"), "0.02");
});

test("formats industrial hours for the given locale without grouping", () => {
    assert.equal(formatHours(1.5, "de-DE"), "1,50");
    assert.equal(formatHours(1234.5, "de-DE"), "1234,50");
    assert.equal(formatHours(1234.5, "en-US"), "1234.50");
});

test("parses decimal hours with a dot or a comma", () => {
    assert.equal(parseDecimalHours("1.5"), 90);
    assert.equal(parseDecimalHours("1,5"), 90);
    assert.equal(parseDecimalHours(" 0,25 "), 15);
    assert.equal(parseDecimalHours(",5"), 30);
    assert.equal(parseDecimalHours("100.75"), 6045);
});

test("rounds decimal hours to the nearest minute", () => {
    assert.equal(parseDecimalHours("1.33"), 80);
    assert.equal(parseDecimalHours("0.999"), 60);
    assert.equal(parseDecimalHours("0.01"), 1);
});

test("rejects input that is not decimal hours", () => {
    for (const input of ["", "1", "90", "1:30", "1.", "1,5,0", "1.5.0", "abc", "-1,5", "1 ,5"]) {
        assert.equal(parseDecimalHours(input), null, `expected ${JSON.stringify(input)} to be rejected`);
    }
});

test("formats minutes as h:mm", () => {
    assert.equal(formatDuration(90), "1:30");
    assert.equal(formatDuration(5), "0:05");
    assert.equal(formatDuration(60), "1:00");
    assert.equal(formatDuration(6045), "100:45");
});

test("describes how the input was read", () => {
    assert.equal(describeConversion("90", "en-US"), "90 min = 1.50 h");
    assert.equal(describeConversion("8", "de-DE"), "8 min = 0,13 h");
    assert.equal(describeConversion(" 01:30 ", "de-DE"), "1:30 = 1,50 h");
    assert.equal(describeConversion("1,5", "de-DE"), "1,5 h = 1:30");
    assert.equal(describeConversion(" 1.5 ", "en-US"), "1.5 h = 1:30");
});

test("describeConversion returns null for invalid input", () => {
    assert.equal(describeConversion("abc", "en-US"), null);
    assert.equal(describeConversion("0:60", "en-US"), null);
});
