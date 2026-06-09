#!/usr/bin/env node
// CLI-Einstiegspunkt. Beispiel: termbaum "3 + 4 * 2 / (1 - 5)"
// Wird per `bun build --compile` zur eigenständigen Binary (siehe package.json).

function main(argv: string[]): void {
  const expression = argv.slice(2).join(" ").trim();

  if (!expression) {
    console.error('Usage: termbaum "<ausdruck>"');
    process.exit(1);
  }

  // Ablauf: Tokenizer -> ShuntingYard -> RpnEvaluator -> AstBuilder/AstPlotter
  console.log(`Ausdruck: ${expression}`);
}

main(process.argv);
