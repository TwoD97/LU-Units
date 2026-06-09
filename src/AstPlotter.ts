// Zeichnet den Termbaum und speichert ihn als PNG (z.B. baum.png).
// graphology baut den Graphen, ts-graphviz rendert ihn über DOT.
// Voraussetzung: eine installierte Graphviz-"dot"-Binary.

import Graph from "graphology";
import { toDot } from "ts-graphviz";
import { toFile } from "@ts-graphviz/adapter";

export class AstPlotter {}
