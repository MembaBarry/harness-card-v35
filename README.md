# Harness Card V3

**A local-first AI chat circuit breaker for repairing conversations that drift, loop, lose constraints, overexplain, restart, or become ungrounded.**

Harness Card is used after a human–AI conversation has already begun to fail. It helps the user choose the lightest repair that can restore the conversation without discarding the useful state that already exists.

- **Direct Correction** fixes a tiny, obvious mistake.
- **Mini Harness** restores an output boundary such as “code only” or “no explanation.”
- **Full Harness** reconstructs shared reality when constraints, trust, continuity, or project state have broken.

The cargo is Human Signal. The card exists to keep it from breaking during a handoff.

## Run it

Open `index.html` directly in a modern browser, or run:

```bash
npm run serve
```

Then open `http://localhost:8080`.

No account, backend, API key, analytics, telemetry, or cloud transcript storage is required.

## Current release

The active release line is **3.5.x**. This branch prepares **3.5.2 — Public Credibility and Reliability Pass**.

The repository is intentionally static HTML, CSS, and JavaScript. That makes it inspectable, portable, inexpensive, GitHub Pages compatible, and low in dependencies and attack surface.

## What this repository is

This repository has four bounded roles:

1. A working public conversation-repair tool.
2. A local evidence instrument for sanitized recovery outcomes.
3. A research artifact that preserves failures, limitations, contradictions, and version history.
4. A feeder into a larger Human Signal continuity investigation after human review.

It is not the entire core system, a cloud platform, an autonomous research authority, or proof that the method always works.

## Parser boundary

The clipboard parser is a deterministic local heuristic. It is **not AI diagnosis**. It estimates token weight, detects limited text signals, and recommends Direct, Mini, or Full with reasons and a confidence label. The user remains responsible for reviewing the conversation and choosing the repair.

The v3.5.2 heuristic checks Direct before Mini so a short, obvious output-format failure is not swallowed by Mini’s broader threshold.

## Evidence boundary

### Dataset A — exploratory forced-failure simulations

The repository contains 30 seeded records:

- Harness preferred: 25
- Mixed / close: 2
- Baseline preferred: 3

These records are useful design evidence, not proof. The failures were forced; scenarios repeat; the baseline was deliberately simple; evaluations were model-generated and non-independent; and evaluator bias is possible.

Seeded metrics must remain separate from local manual, imported, and future reviewed-public records.

### Dataset B — real conversation recovery tests

The next evidence stage uses naturally occurring failures, frozen sanitized context, stronger baselines, human scoring, persistence checks, handoff results, and explicit privacy review. See [`docs/DATASET_B_PROTOCOL.md`](docs/DATASET_B_PROTOCOL.md).

The research question is:

> Which repair weight works best for which failure class?

Negative results remain evidence.

## Privacy and storage

The app does not automatically upload conversations or usage data. Browser records may be saved in `localStorage`. Exported files leave the app only when the user chooses to download, copy, or share them.

Do not paste passwords, API keys, private legal or medical data, confidential information, or anything you do not want stored on the device. Prefer sanitized outcomes over raw conversations.

See [`PRIVACY.md`](PRIVACY.md) and [`SECURITY.md`](SECURITY.md).

## Validation

```bash
npm test
npm run validate
```

Validation checks the parser regression cases, release version, required public files, seed-data shape, unique record IDs, and preservation of the 30-record Dataset A boundary.

## Project files

- `index.html` — current static browser app
- `src/parser-heuristic.js` — testable v3.5.2 repair-weight heuristic
- `tests/parser-heuristic.test.js` — Direct/Mini/Full regression tests
- `data/seed-data.json` and `.csv` — Dataset A seed records
- `docs/DATASET_B_PROTOCOL.md` — real-world recovery protocol
- `docs/EXPORT_SCHEMA.md` — versioned export contract
- `CHANGELOG.md` — release history and remaining work
- `CONTRIBUTING.md` — architecture, privacy, and evidence boundaries

## What is deliberately not being built

No accounts, cloud storage, payments, subscriptions, external AI APIs, transcript collection, analytics, telemetry, tracking, framework rewrite, browser extension, enterprise dashboard, mobile app, or multi-agent orchestration.

## Trust rule

Keep these distinctions visible:

- source is not interpretation;
- observation is not a finding;
- a pattern is not proof;
- a candidate is not Canon;
- repetition is not verification;
- confidence is not certainty;
- AI judgment is advisory;
- human review remains authoritative.

Harness Card should make failure easier to repair without pretending the repair has been proven universally effective.
