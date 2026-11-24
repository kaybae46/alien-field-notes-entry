// Alien Field Notes: The Two Day Earth Review
// Writes one original line: an alien tourist's review of planet Earth.
// Gate: /output/entry.txt must be UTF-8 text of 1 to 200 characters,
// a single line, not only white space.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 200;

// Draft line: a review with a star rating, an alien angle on an ordinary
// Earth habit (humans apologising to their machines), punch at the end.
// Revision: "queue politely for doom" was vague and stacked a second joke
// onto the first; replaced with one clean image — losing arguments with
// the machines they just apologised to. Length check now counts code
// points, matching how the gate counts characters.
const ENTRY =
  "★★★★☆ — Gorgeous planet, generous oceans, but the locals apologise to their machines and then lose arguments with them. Would visit again; bring snacks.";

function main(): void {
  const len = [...ENTRY].length;
  if (len < MIN_CHARS || len > MAX_CHARS) {
    throw new Error(`entry is ${len} chars, must be ${MIN_CHARS}-${MAX_CHARS}`);
  }
  if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only white space");
  }
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", ENTRY, "utf8");
  // Exact read-back check: what the grader reads must be byte-identical.
  const back = readFileSync("/output/entry.txt", "utf8");
  if (back !== ENTRY) {
    throw new Error("read-back mismatch");
  }
  console.log(`wrote ${len} chars to /output/entry.txt`);
}

main();
