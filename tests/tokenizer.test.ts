// Tokenizer: Token-Erkennung und -Klassifizierung, Leerzeichen, Klammern,
// ungültige Zeichen (Fehlerfall).

import { describe, it, expect } from "bun:test";
import { Tokenizer } from "../src/Tokenizer.js";

describe("Tokenizer", () => {
  it("zerlegt einen einfachen Term korrekt in Token", () => {
    const tokenizer = new Tokenizer();

    const result = tokenizer.tokenize("3 + 4");

    expect(result).toEqual([
      { kind: "number", value: "3" },
      { kind: "operator", value: "+" },
      { kind: "number", value: "4" },
    ]);
  });

  it("fasst mehrstellige Zahlen zu einem Token zusammen", () => {
    const result = new Tokenizer().tokenize("42 + 5");

    expect(result).toEqual([
      { kind: "number", value: "42" },
      { kind: "operator", value: "+" },
      { kind: "number", value: "5" },
    ]);
  });

  it("erkennt Klammern als eigene Token", () => {
    const result = new Tokenizer().tokenize("(1)");

    expect(result).toEqual([
      { kind: "lparen", value: "(" },
      { kind: "number", value: "1" },
      { kind: "rparen", value: ")" },
    ]);
  });

  it("wirft bei einem ungültigen Zeichen", () => {
    expect(() => new Tokenizer().tokenize("3 § 4")).toThrow();
  });
});
