// Baut aus einer RPN-Liste den Termbaum (AST) auf – mithilfe des Stacks.
import { Stack } from "./Stack.js";
import type { Token, ASTNode } from "./types.js";


export class AstBuilder {
    astBuild(input: Token[]): ASTNode {
        const nodes = new Stack<ASTNode>();

        let i = 0;
        while (i < input.length) {
            if (input[i].kind === "number") {
                nodes.push({ value: input[i].value });
            } else if (input[i].kind === "operator") {
                const right = nodes.pop();
                const left = nodes.pop()
                nodes.push({ value: input[i].value, leftChild: left, rightChild: right })
            }
            i++;
        }
        return nodes.pop();
    }
}
