// AstBuilder: korrekte Baumstruktur (Wurzel/Kinder/Blätter), ungültige RPN
// (fehlende Operanden), am Ende bleibt genau ein Knoten (die Wurzel).

import { describe, it, expect } from "bun:test";
import { AstBuilder } from "../src/AstBuilder.js";

describe("AstBuilder", () => {
  it.todo("erzeugt aus '3 4 2 * 1 5 - / +' den korrekten Termbaum");
});
