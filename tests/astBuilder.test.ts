// AstBuilder: korrekte Baumstruktur (Wurzel/Kinder/Blätter), ungültige RPN
// (fehlende Operanden), am Ende bleibt genau ein Knoten (die Wurzel).

import { describe, it, expect } from "bun:test";
import { AstBuilder } from "../src/AstBuilder.js";
import { ASTNode } from "../src/types.js";
import { Tokenizer } from "../src/Tokenizer.js";
import { ShuntingYard } from "../src/ShuntingYard.js";

function execute(term: string): ASTNode {
  const tokens = new Tokenizer().tokenize(term);
  const rpn = new ShuntingYard().rpnsort(tokens);
  const tree = new AstBuilder().astBuild(rpn);
  return tree;

}

describe("AstBuilder", () => {
  it("erzeugt aus ' 3 + 4' den korrekten Termbaum", () => {
    expect(execute("3 + 4")).toEqual({
      value: "+",
      leftChild: { value: "3" },
      rightChild: { value: "4" }
    })
  });
  it("erzeugt aus '3 + 4 * ( 3 + 4 )' den korrekten Termbaum", () => {
    expect(execute("3 + 4 * ( 3 + 4 )")).toEqual({
      value: "+",
      leftChild: { value: "3" },
      rightChild: {
        value: "*",
        leftChild: {value: "4"},
        rightChild: {
          value: "+",
          leftChild: {value: "3"},
          rightChild: {value: "4"}
        }
      }

    })
  });
});
