// Gemeinsame Typen: Token und AST-Knoten.

export type Kind = "number" | "operator" | "lparen" | "rparen";

export interface Token {
    kind: Kind,
    value: string
}