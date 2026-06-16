#!/usr/bin/env node
// CLI-Einstiegspunkt. Beispiel: termbaum "3 + 4 * 2 / (1 - 5)"
// Wird per `bun build --compile` zur eigenständigen Binary (siehe package.json).
// Ablauf: Tokenizer -> ShuntingYard -> RpnEvaluator -> AstBuilder/AstPlotter.

import { AstBuilder } from "./AstBuilder";
import { AstPlotter } from "./AstPlotter";
import { RpnEvaluator } from "./RpnEvaluator";
import { ShuntingYard } from "./ShuntingYard";
import { Tokenizer } from "./Tokenizer";
import type { Token } from "./types";

const OUT_FILE = "baum.svg";

export async function main(argv: string[]): Promise<void> {
  // Ohne Argument (z.B. Doppelklick auf die .exe unter Windows) interaktiv nach
  // dem Term fragen, statt sofort zu beenden und das Fenster zu schliessen.
  const arg = argv.slice(2).join(" ").trim();
  const interactive = arg === "";
  const expression = interactive ? (prompt("Ausdruck: ") ?? "").trim() : arg;

  if (!expression) {
    console.error('Usage: termbaum "<ausdruck>"');
    pauseIfInteractive(interactive);
    process.exit(1);
  }

  try {
    const tokens = new Tokenizer().tokenize(expression);
    const variables = promptVariables(collectVariables(tokens));

    const rpn = new ShuntingYard().rpnsort(tokens);
    const result = new RpnEvaluator().rpneval(rpn, variables);
    const ast = new AstBuilder().astBuild(rpn);
    await new AstPlotter().plot(ast, OUT_FILE);

    console.log(`Ausdruck: ${expression}`);
    console.log(`Ergebnis: ${result}`);
    console.log(`Termbaum: ${OUT_FILE} geschrieben`);
  } catch (err) {
    console.error(`Fehler: ${err instanceof Error ? err.message : String(err)}`);
    pauseIfInteractive(interactive);
    process.exit(1);
  }

  pauseIfInteractive(interactive);
}

function pauseIfInteractive(interactive: boolean): void {
  if (interactive) prompt("\nEnter drücken zum Beenden ...");
}

// Sammelt die Variablennamen eines Terms in Auftrittsreihenfolge – jede nur einmal.
export function collectVariables(tokens: Token[]): string[] {
  const names: string[] = [];
  for (const token of tokens) {
    if (token.kind === "variables" && !names.includes(token.value)) {
      names.push(token.value);
    }
  }
  return names;
}

// Fragt für jede Variable interaktiv (stdin) einen Zahlenwert ab.
function promptVariables(names: string[]): Record<string, number> {
  const variables: Record<string, number> = {};
  for (const name of names) {
    const raw = prompt(`${name} = `);
    const value = Number(raw);
    if (raw === null || raw.trim() === "" || Number.isNaN(value)) {
      throw new Error(`Ungültiger Wert für Variable '${name}'`);
    }
    variables[name] = value;
  }
  return variables;
}

if (import.meta.main) {
  main(process.argv);
}
