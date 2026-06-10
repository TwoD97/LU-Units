// RpnEvaluator: korrekte Auswertung aller Operatoren, Division durch 0,
// zu wenige/zu viele Operanden, am Ende bleibt genau ein Wert.

import { describe, it, expect } from "bun:test";
import { RpnEvaluator } from "../src/RpnEvaluator.js";
import { Tokenizer } from "../src/Tokenizer.js";
import { ShuntingYard } from "../src/ShuntingYard.js";

function execute(term: string): number {
  const tokens = new Tokenizer().tokenize(term);
  const shunting = new ShuntingYard().rpnsort(tokens);
  return new RpnEvaluator().rpneval(shunting);

}

describe("RpnEvaluator", () => {
  it("wertet '4 * 3 * ( 3 + 3 )' zu 72 aus", () => {
    expect(execute("4 * 3 * ( 3 + 3 )")).toEqual(72);
  });
  it("wertet '(4+4)+4+(4+(4*4))' zu 32", () => {
    expect(execute("(4+4)+4+(4+(4*4))")).toEqual(32);
  })
  it("division bei 0", () => {
    expect(() => execute("7 / 0")).toThrow();
  })
  it("Invalide Term '5 * (4 + 4 ('", () => {
    expect(() => execute("5 * (4 + 4 (")).toThrow;
  })
  it("Invalide Term '5 * 4 + 4 )'", () => {
    expect(()=> execute("5 * 4 + 4 )")).toThrow();
  })
});
