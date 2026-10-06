import { test } from "node:test";
import assert from "node:assert/strict";
import { parseDuration, toIndustrialHours, formatHours } from "./calc.js";

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
    assert.equal(formatHours(toIndustrialHours(90)), "1.50");
    assert.equal(formatHours(toIndustrialHours(42)), "0.70");
    assert.equal(formatHours(toIndustrialHours(0)), "0.00");
    assert.equal(formatHours(toIndustrialHours(1)), "0.02");
});
