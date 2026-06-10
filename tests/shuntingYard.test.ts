// ShuntingYard: Umwandlung in RPN, Operator-Priorität, Assoziativität, Klammern.

import { describe, it, expect } from "bun:test";
import { Tokenizer } from "../src/Tokenizer.js";
import { ShuntingYard } from "../src/ShuntingYard.js";

// kleine Hilfe: Term -> RPN als reine Werte-Liste (leichter zu lesen im Test)
function toRpn(term: string): string[] {
  const tokens = new Tokenizer().tokenize(term);
  return new ShuntingYard().rpnsort(tokens).map((t) => t.value);
}

describe("ShuntingYard", () => {
  it("wandelt '3 + 4 * 2 / (1 - 5)' korrekt in RPN um", () => {
    expect(toRpn("3 + 4 * 2 / (1 - 5)")).toEqual([
      "3", "4", "2", "*", "1", "5", "-", "/", "+",
    ]);
  });

  it("Punkt vor Strich: '3 + 4 * 2' -> '3 4 2 * +'", () => {
    expect(toRpn("3 + 4 * 2")).toEqual(["3", "4", "2", "*", "+"]);
  });

  it("Klammer ändert die Reihenfolge: '(3 + 4) * 2' -> '3 4 + 2 *'", () => {
    expect(toRpn("(3 + 4) * 2")).toEqual(["3", "4", "+", "2", "*"]);
  });
});
