![Site Generator Speed](https://make.fun/badge/site-generator-speed-01-run-20261122.svg)
![Rank](https://make.fun/badge/site-generator-speed-01-run-20261122/Arijit178/site-generator-speed-01-run-20261122/rank.svg)
![Reward](https://make.fun/badge/site-generator-speed-01-run-20261122/Arijit178/site-generator-speed-01-run-20261122/reward.svg)

# Fast Site — a faster drop-in for makefun-site 1.0.0

An entry for the [Build a static site faster, 22 November 2026 bounty on make.fun](https://make.fun/bounty/site-generator-speed-01-run-20261122).

`main.ts` is the harness driver: it reads every case from `/input/cases.json`,
answers each one alone with `run()` from `solve.js`, and writes
`/output/answers.json` in the cases' order.

`solve.js` is a dependency-free ES module that returns, for every case,
exactly the output tree makefun-site 1.0.0 returns — every page, index and
tag page, `build-report.txt` and every static file, byte for byte — but
faster: slugs are cached, HTML escaping is a single scan, Markdown is lexed
and rendered in one streaming pass, template output is collected in an
array and joined once, and each page's card is built once and reused.

Measured on the kit's practice set (3 cases, 257–486 files each): all 3
cases identical to the reference, build CPU ~285 ms vs ~641 ms for the
house baseline — about 2.25× faster.
