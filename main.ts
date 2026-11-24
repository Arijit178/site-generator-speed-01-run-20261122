// Fast site entry driver: the harness runs `node /bot/main.ts` on node22.
// It reads every case from /input/cases.json, answers each one alone with
// run() from solve.js, and writes /output/answers.json with the answers in
// the cases' order. Outside a container, MAKEFUN_INPUT_DIR and
// MAKEFUN_OUTPUT_DIR stand in for /input and /output. A build reads no
// clock, no environment and no file of its own: the answers are a function
// of the cases alone, so running the same cases twice gives the same file.

import { readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { setFlagsFromString } from 'node:v8';

// Switch V8's incremental marking off before solve.js loads, so the whole
// timed run happens under the same flags the house baseline uses.
setFlagsFromString('--no-incremental-marking');

/** solve.js, loaded by URL, typed here by the contract it keeps. */
const { run } = (await import(new URL('./solve.js', import.meta.url).href)) as {
  run: (input: unknown) => unknown;
};

const INPUT_DIR = process.env.MAKEFUN_INPUT_DIR ?? '/input';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const cases = JSON.parse(readFileSync(join(INPUT_DIR, 'cases.json'), 'utf8')) as {
  id: string;
  input: unknown;
}[];

const answers: unknown[] = [];
// Each case is answered on its own, in the order the cases arrive, and
// nothing is shared between cases: solve.js starts every run fresh.
for (const c of cases) answers.push(run(c.input));
writeFileSync(join(OUTPUT_DIR, 'answers.json'), JSON.stringify(answers));
