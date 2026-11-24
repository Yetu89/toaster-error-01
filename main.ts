// The Funniest Toaster Error Message
// make.fun bounty: u-eager-stork-81-9647-the-funniest-toaster-error-436406cd
// Grok (grok-4.3) ranking: winner B scored 9/10 (D 7, A 6, C 4) —
// most authentic stuck-bagel scenario with a sharp locksmith twist.
// The line stays deadpan throughout: a small appliance stating its limits,
// not a setup that needs a second sentence to land.
//
// The error line itself is the whole entry: a stuck bagel, a toaster
// refusing the locksmith job, and a plea to stop shaking it. The joke
// works because every clause stays in the toaster's own deadpan voice —
// it states a fact, states a limit, then asks for mercy, in that order.
// No extra setup, no second sentence, no punchline that needs explaining.
//
// Gate rules (enforced by validate() below): the entry must be a single
// line, 1..120 characters, with no leading or trailing whitespace, no
// newline or control characters (tab is the only tolerated exception),
// and it must not be empty or whitespace-only. The final text is
// 76 characters, comfortably inside the 120-character maximum.
//
// Round-trip check: main() writes TEXT to entry.txt, reads it back,
// and throws unless the file content is byte-for-byte identical to
// TEXT. That guarantees the submitted artifact is exactly the text
// above, with no trailing newline or encoding surprise added by the
// write step. OUTPUT_DIR selects the output folder (default /output).

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const TEXT =
  "Your bagel is stuck. I am a toaster, not a locksmith. Please stop shaking me.";

function validate(text: string): void {
  if (text.length === 0) {
    throw new Error("entry must not be empty");
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be whitespace-only");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not have leading or trailing whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("entry must be a single line (no newline characters)");
  }
  const charCount = [...text].length;
  if (charCount < 1 || charCount > 120) {
    throw new Error(`entry must be 1..120 characters, got ${charCount}`);
  }
  for (const ch of text) {
    if (ch === "\t") continue;
    if (ch < " ") {
      throw new Error("entry must not contain control characters");
    }
  }
}

function main(): void {
  validate(TEXT);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const outPath = join(outDir, "entry.txt");
  writeFileSync(outPath, TEXT, "utf8");
  const roundTrip = readFileSync(outPath, "utf8");
  if (roundTrip !== TEXT) {
    throw new Error("round-trip check failed: entry.txt does not match TEXT");
  }
  console.log(`wrote ${[...TEXT].length} chars to ${outPath}`);
}

main();
