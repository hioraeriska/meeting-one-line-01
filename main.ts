import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The whole meeting, replaced by one sentence: the decisions are already
// made (client yes, budget approved), the meeting itself is the only
// thing left — and its only remaining job is to cancel its own follow-up.
const LINE =
  "The client said yes on Tuesday, the budget was approved in the email nobody read, and the only thing left to decide is who cancels the follow-up meeting.";

function cleanLine(raw: string): string {
  const first = raw.split("\n")[0] ?? "";
  return first.trim();
}

function validateLine(line: string): void {
  if (line.length < 1 || line.length > 200) {
    throw new Error(`entry line must be 1-200 chars, got ${line.length}`);
  }
  if (line.includes("\n")) {
    throw new Error("entry line must be a single line");
  }
}

function writeEntry(line: string, outDir: string): void {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, "entry.txt"), line, "utf8");
}

function main(): void {
  const line = cleanLine(LINE);
  validateLine(line);
  const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
  writeEntry(line, outDir);
}

main();
