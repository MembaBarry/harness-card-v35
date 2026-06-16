# Dataset B — Real Conversation Recovery Protocol

Dataset B measures naturally occurring conversation failures and whether Direct, Mini, or Full repair produces durable recovery.

## Research question

Which repair weight works best for which failure class, and does the repair persist across later turns and handoffs?

## Inclusion criteria

A record may enter Dataset B only when:

- the failure occurred naturally rather than being forced for the test;
- the relevant context was frozen before intervention;
- private content was removed or transformed into a faithful sanitized record;
- the intervention and outcome were recorded without rewriting history;
- a human reviewer approved the record for its stated evidence status.

## Required fields

- record ID and exact date;
- platform and model/version when known;
- runner and evaluator identities or roles;
- failure class;
- frozen sanitized context;
- original signal and constraints;
- repair type: Direct, Mini, or Full;
- exact repair text;
- stronger comparison baseline;
- immediate outcome;
- persistence after 1, 3, and 5 later turns when available;
- handoff outcome when moved to another model or session;
- human scores and written judgment;
- privacy review and sanitization status;
- public-evidence status;
- contradictions, negative results, and limitations.

## Comparison design

Where practical, randomize or blind the evaluator to repair type. Compare against a credible baseline tailored to the failure, not only “try again.” Keep model, context window, and source material as stable as possible.

## Scoring dimensions

Score each from 1 to 5 with a short justification:

- alignment with the human’s actual model;
- constraint recovery;
- output-contract compliance;
- trust calibration;
- next-step usefulness;
- unnecessary overhead;
- persistence across later turns;
- handoff integrity.

A numerical average never replaces written human judgment.

## Evidence states

Use explicit states:

- REAL_WORLD_UNREVIEWED
- SANITIZED
- HUMAN_REVIEWED
- PUBLIC_SAFE
- REJECTED

Promotion is append-only in the research record. Rejected and negative results remain visible.

## Privacy rule

Prefer a sanitized outcome record over a raw conversation. Do not collect passwords, API keys, confidential legal or medical information, or identifying material that is unnecessary to evaluate recovery.

## What Dataset B can support

With enough reviewed records, Dataset B may support bounded claims about which repair weights tend to help specific failure classes under documented conditions.

It does not prove universal effectiveness, model independence, causation outside the test conditions, or that Harness Card is uniquely novel.
