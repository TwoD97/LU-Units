// Zeichnet den Termbaum und speichert ihn als PNG (z.B. baum.png).
// graphology baut den Graphen, ts-graphviz rendert ihn über DOT.

import { Digraph, Node, toDot } from "ts-graphviz";
import { Graphviz } from "@hpcc-js/wasm-graphviz";
import type { ASTNode } from "./types.js";



export class AstPlotter {
    private counter = 0;

    async plot(root: ASTNode, outFile = "baum.svg"): Promise<void> {
        const graph = new Digraph();
        this.addNode(graph, root);
        const dot = toDot(graph);

        const graphviz = await Graphviz.load();
        const svg = graphviz.dot(dot);
        await Bun.write(outFile, svg);
    }

    private addNode(graph: Digraph, astNode: ASTNode): string {
        const id = "n" + this.counter++;
        graph.addNode(new Node(id, { label: astNode.value }));
        if (astNode.leftChild) {
            const leftId = this.addNode(graph, astNode.leftChild);
            graph.edge([id, leftId]);
        }
        if (astNode.rightChild) {
            const rightId = this.addNode(graph, astNode.rightChild);
            graph.edge([id, rightId]);
        }
        return id;
    }
}
