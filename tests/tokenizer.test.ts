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
});
