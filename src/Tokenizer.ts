// Zerlegt einen Term in einem Durchlauf in Token: Zahlen, Operatoren,
// Klammern und (ab Teilaufgabe 5) Variablen.

import type { Token } from "./types.js";

export class Tokenizer {
  tokenize(input: string): Token[] {
    const tokens: Token[] = [];
    let i = 0;

    while (i < input.length) {
      const char = input[i];

      if (char === " ") {
        // Leerzeichen sind nur Trenner -> überspringen.
        i++;
        continue;
      } else if (char === "+" || char === "-" || char === "*" || char === "/") {
        tokens.push({ kind: "operator", value: char });
        i++;
      } else if (char >= "0" && char <= "9") {
        // Zahl: alle direkt folgenden Ziffern zu einem Token zusammenfassen.
        let number = "";
        while (i < input.length && input[i] >= "0" && input[i] <= "9") {
          number += input[i];
          i++;
        }
        tokens.push({ kind: "number", value: number });
        // kein i++ -> die innere Schleife hat i schon weitergeschoben.
      } else if (char === "(") {
        tokens.push({ kind: "lparen", value: char });
        i++;
      } else if (char === ")") {
        tokens.push({ kind: "rparen", value: char });
        i++;
      } else {
        throw new Error(`Ungültiges Zeichen: '${char}'`);
      }
    }

    return tokens;
  }
}
