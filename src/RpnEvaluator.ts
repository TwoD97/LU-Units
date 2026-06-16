// Wertet eine RPN-Tokenliste über den Stack aus. Fängt Division durch 0 ab;
// ab Teilaufgabe 5 werden Variablenwerte aus einem Dictionary gelesen.

import { Stack } from "./Stack.js";
import { Token } from "./types.js";

export class RpnEvaluator {
    rpneval(input: Token[], variables: Record<string, number> = {}): number {
        const numbers = new Stack<number>();
        let i = 0;
        while (i < input.length) {
            if (input[i].kind === "number") {
                numbers.push(Number(input[i].value));
            } else if (input[i].kind === "variables") {
                const value = variables[input[i].value];
                if (value === undefined) throw new Error(`Kein Wert für Variable '${input[i].value}'`);
                numbers.push(value);
            } else if (input[i].kind === "operator") {
                if (input[i].value === "neg") {
                    if (numbers.size() < 1) throw new Error("Operator '-' ohne Operanden");
                    numbers.push(-numbers.pop());
                    i++;
                    continue;
                }
                if (numbers.size() < 2) throw new Error(`Operator '${input[i].value}' ohne Operanden`);
                const right = numbers.pop();
                const left = numbers.pop();
                if (input[i].value === "+") numbers.push(left + right);
                else if (input[i].value === "-") numbers.push(left - right);
                else if (input[i].value === "*") numbers.push(left * right);
                else if (input[i].value === "/") {
                    if (right === 0) throw new Error("Division durch 0");
                    numbers.push(left / right);
                }
            }
            i++;
        }
        return numbers.pop();
    }
}
