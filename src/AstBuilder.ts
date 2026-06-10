// Baut aus einer RPN-Liste den Termbaum (AST) auf – mithilfe des Stacks.

import { ASTNode } from "ts-graphviz/ast";
import { Stack } from "./Stack.js";

export class AstBuilder {
    astBuild(term:string): ASTNode {
        const node = new Stack<ASTNode>();

        let i = 0;
        while ( i < term.length){
            if ( term)
        }
    }
}
