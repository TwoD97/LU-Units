// Zerlegt einen Term in einem Durchlauf in Token: Zahlen, Operatoren,
// Klammern und (ab Teilaufgabe 5) Variablen.

import type { Token } from "./types.js";

export class Tokenizer {
  tokenize(input: string): Token[] {
    const varpatt: RegExp = /[A-Za-z][A-Za-z0-9]*/;
    const tokens: Token[] = [];
    const variables: Record< Token, 
    let i = 0;

    while (i < input.length) {
      const char = input[i];

      if (char === " ") {
        i++;
        continue;
      } else if (varpatt.test(input[i])){

      }else if (char === "+" || char === "-" || char === "*" || char === "/") {
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
