// Vorzeichen-Minus (Negation) ist NUR am Anfang des Terms oder direkt nach '('
// erlaubt. Eine Negation nach einem anderen Operator muss geklammert werden,
// z.B. '3 - (-3)' statt '3--3'. Ein gültiges Vorzeichen wird im RPN zum
// Sonderoperator 'neg' (nimmt EINEN Operanden); ein Vorzeichen an verbotener
// Stelle lässt einen Operator ohne Operanden zurück und ist damit ungültig.

import { describe, it, expect } from "bun:test";
import { Tokenizer } from "../src/Tokenizer.js";
import { ShuntingYard } from "../src/ShuntingYard.js";
import { RpnEvaluator } from "../src/RpnEvaluator.js";
import { AstBuilder } from "../src/AstBuilder.js";
import type { ASTNode } from "../src/types.js";

function toRpn(term: string): string[] {
  const tokens = new Tokenizer().tokenize(term);
  return new ShuntingYard().rpnsort(tokens).map((t) => t.value);
}

function evaluate(term: string): number {
  const tokens = new Tokenizer().tokenize(term);
  const rpn = new ShuntingYard().rpnsort(tokens);
  return new RpnEvaluator().rpneval(rpn);
}

function tree(term: string): ASTNode {
  const tokens = new Tokenizer().tokenize(term);
  const rpn = new ShuntingYard().rpnsort(tokens);
  return new AstBuilder().astBuild(rpn);
}

describe("Vorzeichen-Minus – erlaubt am Anfang oder nach '('", () => {
  it("'-3' -> '3 neg'", () => {
    expect(toRpn("-3")).toEqual(["3", "neg"]);
  });

  it("'-3' = -3", () => {
    expect(evaluate("-3")).toEqual(-3);
  });

  it("'(-3)' = -3", () => {
    expect(evaluate("(-3)")).toEqual(-3);
  });

  it("'-(3 + 4)' = -7", () => {
    expect(evaluate("-(3 + 4)")).toEqual(-7);
  });

  it("'2 * (-3)' = -6", () => {
    expect(evaluate("2 * (-3)")).toEqual(-6);
  });

  it("'3 - (-3)' = 6", () => {
    expect(evaluate("2 - (-2)")).toEqual(4);
  });

  it("'-(-3)' = 3", () => {
    expect(evaluate("-(-3)")).toEqual(3);
  });

  it("unäres Plus am Anfang wird ignoriert: '+3' -> '3'", () => {
    expect(toRpn("+3")).toEqual(["3"]);
  });
});

describe("Vorzeichen-Minus – NICHT nach einem Operator (muss geklammert werden)", () => {
  it("'3--3' ist ungültig", () => {
    expect(() => evaluate("3--3")).toThrow("Operator '-' ohne Operanden");
  });

  it("'2 -- 2' ist ungültig", () => {
    expect(() => evaluate("2 -- 2")).toThrow("Operator '-' ohne Operanden");
  });

  it("'2 - -2' ist ungültig (statt: 2 - (-2))", () => {
    expect(() => evaluate("2 - -2")).toThrow("Operator '-' ohne Operanden");
  });

  it("'2 * -3' ist ungültig (statt: 2 * (-3))", () => {
    expect(() => evaluate("2 * -3")).toThrow("Operator '*' ohne Operanden");
  });

  it("'--3' ist ungültig (statt: -(-3))", () => {
    expect(() => evaluate("--3")).toThrow("Operator '-' ohne Operanden");
  });
});

describe("Vorzeichen-Minus – AstBuilder", () => {
  it("'-3' -> Knoten '-' mit einem (rechten) Kind", () => {
    expect(tree("-3")).toEqual({
      value: "-",
      rightChild: { value: "3" },
    });
  });

  it("'2 * (-3)' -> '*' mit unärem '-' als rechtem Teilbaum", () => {
    expect(tree("2 * (-3)")).toEqual({
      value: "*",
      leftChild: { value: "2" },
      rightChild: {
        value: "-",
        rightChild: { value: "3" },
      },
    });
  });
});
