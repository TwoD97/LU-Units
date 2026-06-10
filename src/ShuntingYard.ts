// Shunting-Yard: wandelt Token unter Beachtung von Operator-Priorität und
// Assoziativität in umgekehrte polnische Notation (RPN) um.
import { Stack } from "./Stack";
import { Token } from "./types";

export class ShuntingYard<T> {
    rpnsort(input: Token[]): Token[] {
        const output: Token[] = [];
        const operators = new Stack<Token>();

        let i = 0;
        while (i < input.length) {
            if (input[i].kind === "number") {
                output.push(input[i]);
            } else if (input[i].kind === "operator") {
                while (
                    !operators.isEmpty() &&
                    operators.peek().kind === "operator" &&
                    this.priority(operators.peek().value) >= this.priority(input[i].value)) {
                    output.push(operators.pop());
                }
                operators.push(input[i]);
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
        if (op === "+" || op === "-") return 1;
        if (op === "*" || op === "/") return 2;
        return 0;
    }
}
