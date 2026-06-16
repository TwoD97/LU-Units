import { describe, it, expect } from "bun:test";
import { Tokenizer } from "../src/Tokenizer.js";
import { ShuntingYard } from "../src/ShuntingYard.js";
import { RpnEvaluator } from "../src/RpnEvaluator.js";

function toRpn(term: string): string[] {
  const tokens = new Tokenizer().tokenize(term);
  return new ShuntingYard().rpnsort(tokens).map((t) => t.value);
}

function execute(term: string, vars: Record<string, number>): number {
  const tokens = new Tokenizer().tokenize(term);
  const rpn = new ShuntingYard().rpnsort(tokens);
  return new RpnEvaluator().rpneval(rpn, vars);
}

describe("Variablen", () => {
  it("erkennt Variablen beim Tokenisieren", () => {
    expect(new Tokenizer().tokenize("a + b1")).toEqual([
      { kind: "variables", value: "a" },
      { kind: "operator", value: "+" },
      { kind: "variables", value: "b1" },
    ]);
  });

  it("wandelt 'a * (b + 2)' korrekt in RPN um", () => {
    expect(toRpn("a * (b + 2)")).toEqual(["a", "b", "2", "+", "*"]);
  });

  it("berechnet 'a * (b + 2) - 3 / b' mit a=4, b=2 zu 14.5", () => {
    expect(execute("a * (b + 2) - 3 / b", { a: 4, b: 2 })).toEqual(14.5);
  });

  it("berechnet gemischte Terme aus Zahlen und Variablen", () => {
    expect(execute("2 * x + 3", { x: 5 })).toEqual(13);
  });

  it("wirft bei fehlendem Variablenwert", () => {
    expect(() => execute("a + 1", {})).toThrow();
  });
});
