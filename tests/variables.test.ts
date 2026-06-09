// Variablen (Teilaufgabe 5): Erkennung beim Tokenisieren, RPN mit Variablen,
// Fehler bei fehlenden Werten, gemischte Terme aus Zahlen und Variablen.

import { describe, it, expect } from "bun:test";
import { Tokenizer } from "../src/Tokenizer.js";
import { ShuntingYard } from "../src/ShuntingYard.js";
import { RpnEvaluator } from "../src/RpnEvaluator.js";

describe("Variablen", () => {
  it.todo("berechnet 'a * (b + 2) - 3 / b' mit a=4, b=2 zu 14.5");
});
