// Zerlegt einen Term in einem Durchlauf in Token: Zahlen, Operatoren,
// Klammern und (ab Teilaufgabe 5) Variablen.

import type { Token } from "./types.js";

export class Tokenizer {
  tokenize(input: string): Token[] {
    const varpatt: RegExp = /[A-Za-z]/;
    const varpatt2: RegExp = /[A-Za-z0-9]/;
    const tokens: Token[] = [];
    let i = 0;

    while (i < input.length) {
      const char = input[i];

      if (char === " ") {
        i++;
        continue;
      } else if (varpatt.test(char)) {
        let name = "";
        while (i < input.length && varpatt2.test(input[i])) {
          name += input[i];
          i++;
        }
        tokens.push({ kind: "variables", value: name });
      } else if (char === "+" || char === "-" || char === "*" || char === "/") {
        tokens.push({ kind: "operator", value: char });
        i++;
      } else if (char >= "0" && char <= "9") {
        let number = "";
        while (i < input.length && input[i] >= "0" && input[i] <= "9") {
          number += input[i];
          i++;
        }
        tokens.push({ kind: "number", value: number });
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
