// Fehlende Operanden: ein Binär-Operator ohne genug Operanden (z.B. '2 ** 3',
// '*3', '3 +') soll eine klare Meldung liefern – nicht das interne
// 'pop() auf leerem Stack'. Gültige Vorzeichen (unäres Minus) bleiben erlaubt.

import { describe, it, expect } from "bun:test";
import { Tokenizer } from "../src/Tokenizer.js";
import { ShuntingYard } from "../src/ShuntingYard.js";
import { RpnEvaluator } from "../src/RpnEvaluator.js";
import { AstBuilder } from "../src/AstBuilder.js";

function evaluate(term: string): number {
  const tokens = new Tokenizer().tokenize(term);
  const rpn = new ShuntingYard().rpnsort(tokens);
  return new RpnEvaluator().rpneval(rpn);
}

function build(term: string) {
  const tokens = new Tokenizer().tokenize(term);
  const rpn = new ShuntingYard().rpnsort(tokens);
  return new AstBuilder().astBuild(rpn);
}

describe("Fehlende Operanden – RpnEvaluator", () => {
  it("'2 ** 3' meldet \"Operator '*' ohne Operanden\"", () => {
    expect(() => evaluate("2 ** 3")).toThrow("Operator '*' ohne Operanden");
  });

  it("'*3' meldet \"Operator '*' ohne Operanden\"", () => {
    expect(() => evaluate("*3")).toThrow("Operator '*' ohne Operanden");
  });

  it("'3 +' meldet \"Operator '+' ohne Operanden\"", () => {
    expect(() => evaluate("3 +")).toThrow("Operator '+' ohne Operanden");
  });

  it("leakt nicht mehr das interne 'pop() auf leerem Stack'", () => {
    expect(() => evaluate("2 ** 3")).not.toThrow("pop() auf leerem Stack");
  });
});

describe("Fehlende Operanden – AstBuilder", () => {
  it("'2 ** 3' meldet \"Operator '*' ohne Operanden\"", () => {
    expect(() => build("2 ** 3")).toThrow("Operator '*' ohne Operanden");
  });
});
