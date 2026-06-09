// RpnEvaluator: korrekte Auswertung aller Operatoren, Division durch 0,
// zu wenige/zu viele Operanden, am Ende bleibt genau ein Wert.

import { describe, it, expect } from "bun:test";
import { RpnEvaluator } from "../src/RpnEvaluator.js";

describe("RpnEvaluator", () => {
  it.todo("wertet '3 4 2 * 1 5 - / +' zu 1 aus");
});
