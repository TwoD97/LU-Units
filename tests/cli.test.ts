import { describe, it, expect } from "bun:test";
import { collectVariables } from "../src/cli.js";
import { Tokenizer } from "../src/Tokenizer.js";

function vars(term: string): string[] {
  return collectVariables(new Tokenizer().tokenize(term));
}

describe("collectVariables", () => {
  it("liefert für reine Zahlenterme keine Variablen", () => {
    expect(vars("3 + 4 * 2")).toEqual([]);
  });

  it("sammelt Variablen in Auftrittsreihenfolge", () => {
    expect(vars("a * (x + 2)")).toEqual(["a", "x"]);
  });

  it("nennt jede Variable nur einmal", () => {
    expect(vars("a * (b + 2) - 3 / b")).toEqual(["a", "b"]);
  });
});
