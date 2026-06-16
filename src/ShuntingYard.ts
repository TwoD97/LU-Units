// Shunting-Yard: wandelt Token unter Beachtung von Operator-Priorität und
// Assoziativität in umgekehrte polnische Notation (RPN) um.
import { Stack } from "./Stack";
import { Token } from "./types";

export class ShuntingYard {
    rpnsort(input: Token[]): Token[] {
        const output: Token[] = [];
        const operators = new Stack<Token>();

        let i = 0;
        while (i < input.length) {
            if (input[i].kind === "number") {
                output.push(input[i]);
            } else if (input[i].kind === "variables"){
                output.push(input[i]);
            } else if (input[i].kind === "operator") {
                // Ein '-' oder '+' ist nur Vorzeichen, wenn davor nichts oder ein
                // '(' steht. Nach einem anderen Operator ist das verboten – dort
                // muss geklammert werden ('3 - (-3)' statt '3--3'). Unäres '+' ist
                // wirkungslos und wird übersprungen, unäres '-' wird zu 'neg'.  -3 + 3
                const prev = i > 0 ? input[i - 1] : undefined;
                const unary =
                    (input[i].value === "-" || input[i].value === "+") &&
                    (prev === undefined || prev.kind === "lparen");

                if (unary && input[i].value === "+") {
                    i++;
                    continue;
                }

                const op: Token = unary ? { kind: "operator", value: "neg" } : input[i];
                // 'neg' ist rechtsassoziativ (z.B. '--3'), bindet also nur bei
                // echt höherer Priorität – sonst wie links: >=.
                const rightAssoc = op.value === "neg";
                while (
                    !operators.isEmpty() &&
                    operators.peek().kind === "operator" &&
                    (this.priority(operators.peek().value) > this.priority(op.value) ||
                        (this.priority(operators.peek().value) === this.priority(op.value) && !rightAssoc))) {
                    output.push(operators.pop());
                }
                operators.push(op);
            } else if (input[i].kind === "lparen") {
                operators.push(input[i]);
            } else if (input[i].kind === "rparen") {
                while (!operators.isEmpty() && operators.peek().kind !== "lparen") {
                    output.push(operators.pop());
                }
                if (operators.isEmpty()) throw new Error("Invalide Term");
                operators.pop();
            }
            i++;

        }
        while (!operators.isEmpty()) {
            const top = operators.pop();
            if (top.value === "(") throw new Error("Invalide Term");
            output.push(top);
        }
        return output;


    }

    private priority(op: string): number {
        if (op === "neg") return 3;
        if (op === "+" || op === "-") return 1;
        if (op === "*" || op === "/") return 2;
        return 0;
    }
}
