# Termbaum – ILA Unit Tests (TypeScript)

Laborübung *Unit Tests* (4. Klasse IT-KPT). Ein Taschenrechner für mathematische
Terme, schrittweise aufgebaut: vom Tokenizer über die Shunting-Yard-Umwandlung
und die RPN-Auswertung bis zum Termbaum (AST) samt SVG-Ausgabe – jede Stufe mit
eigenen Unit Tests.

Als Laufzeit, Paketmanager, Test-Runner und Compiler kommt [Bun](https://bun.sh)
zum Einsatz.

## Aufbau

```
src/
  types.ts          gemeinsame Typen (Token, AST-Knoten)
  Stack.ts          Stack (LIFO)
  Tokenizer.ts      Scanner / Tokenisierung
  ShuntingYard.ts   Umwandlung in RPN
  RpnEvaluator.ts   Auswertung der RPN
  AstBuilder.ts     Aufbau des Termbaums (AST)
  AstPlotter.ts     Visualisierung als SVG
  cli.ts            CLI-Einstiegspunkt
  index.ts          Gesamtablauf
tests/              Unit Tests (bun test)
```

## Setup

```bash
bun install
```

## Befehle

| Befehl                      | Beschreibung                                  |
| --------------------------- | --------------------------------------------- |
| `bun test`                  | Unit Tests ausführen                          |
| `bun test --watch`          | Tests im Watch-Modus                          |
| `bun run test:coverage`     | Tests mit Coverage-Report                     |
| `bun run dev "<term>"`      | CLI im Dev-Modus (`src/cli.ts`)               |
| `bun run start`             | Programm starten (`src/index.ts`)             |
| `bun run plot`              | Termbaum als SVG erzeugen                      |
| `bun run typecheck`         | Typprüfung mit `tsc --noEmit`                  |
| `bun run compile:linux-x64` | eigenständige Linux-Binary erzeugen (`dist/`) |

## Standalone-Binary

`bun build --compile` packt die CLI in eine einzelne Datei – auf dem Zielsystem
ist keine Bun-Installation nötig (Bun braucht nur der Build-Rechner). Cross-Compile
von Windows nach Linux funktioniert.

```bash
bun run compile:linux-x64     
bun run compile:linux-arm64   
bun run compile                
```

Auf dem Zielsystem:

```bash
chmod +x termbaum-linux-x64
./termbaum-linux-x64 "3 + 4 * 2 / (1 - 5)"
```

## Bibliotheken

- **graphology** – Graphstruktur für den Termbaum
- **ts-graphviz** – Erzeugung der DOT-Beschreibung des Termbaums
- **@hpcc-js/wasm-graphviz** – Rendering der DOT-Beschreibung als SVG. [Graphviz](https://graphviz.org/)
  läuft hier als WebAssembly, also **ohne installierte `dot`-Binary** und
  plattformunabhängig (wird von `bun build --compile` mit eingebettet)
- **typescript** – Typprüfung


# Arbeitsbericht 

First Task projekt structure project files and the needed libraries nailed.