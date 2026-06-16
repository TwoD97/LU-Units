// Gesamtablauf: Eingabe lesen, Variablen abfragen, berechnen und plotten.
// Verbindet Tokenizer -> ShuntingYard -> RpnEvaluator -> AstBuilder/AstPlotter.
// Startpunkt fuer `bun run start`; die eigentliche Logik liegt in cli.ts.

import { main } from "./cli";

main(process.argv);
