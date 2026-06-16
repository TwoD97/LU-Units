// Baut aus einer RPN-Liste den Termbaum (AST) auf – mithilfe des Stacks.
import { Stack } from "./Stack.js";
import type { Token, ASTNode } from "./types.js";


export class AstBuilder {
    astBuild(input: Token[]): ASTNode {
        const nodes = new Stack<ASTNode>();

        let i = 0;
        while (i < input.length) {
            if (input[i].kind === "number" || input[i].kind === "variables") {
                nodes.push({ value: input[i].value });
            } else if (input[i].kind === "operator") {
                if (input[i].value === "neg") {
                    // Unäres Minus: nur ein (rechtes) Kind.
                    if (nodes.size() < 1) throw new Error("Operator '-' ohne Operanden");
                    const child = nodes.pop();
                    nodes.push({ value: "-", rightChild: child });
                } else {
                    if (nodes.size() < 2) throw new Error(`Operator '${input[i].value}' ohne Operanden`);
                    const right = nodes.pop();
                    const left = nodes.pop()
                    nodes.push({ value: input[i].value, leftChild: left, rightChild: right })
                }
            }
            i++;
        }
        return nodes.pop();
    }
}
