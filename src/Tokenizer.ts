// Zerlegt einen Term in einem Durchlauf in Token: Zahlen, Operatoren,
// Klammern und (ab Teilaufgabe 5) Variablen.

import type { Token } from "./types";

export class Tokenizer {
    tokenize(input: string): Token[] {
        let i = 0;
        const tokens: Token[] = []
        while (i < input.length) {
            const char = input[i];
            if (char === " ") {
                i++;
                continue;
            } else if (char === "+" || char === "-" || char === "*" || char === "/") {
                tokens.push({ kind: "operator", value: char });
                i++;
            } else if (char >= "0" && char <= "9") {
                tokens.push({ kind: "number", value: char });
                i++;
            } else if (char === "(" || char === ")") {
                if (char === "(") {
                    tokens.push({ kind: "lparen", value: char });
                }
                tokens.push({ kind: "rparen", value: char });
                i++
            }
            else {
                throw new Error("Not a valid Token");

            }
        }
    return tokens;

    }
}
