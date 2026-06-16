# Contributing

Harness Card V3 is a small public conversation-repair tool and research instrument. Contributions should strengthen that role without turning the repository into a cloud service or a second core system.

## Before changing code

1. Verify the behavior in the live repository.
2. State whether the change is a bug fix, accessibility improvement, privacy improvement, evidence change, or product expansion.
3. Preserve the static, local-first architecture unless a separately reviewed decision changes it.
4. Use the lightest change that solves the verified problem.

## Evidence boundaries

Do not present exploratory simulations as proof. Keep these categories distinct:

- Dataset A: seeded exploratory forced-failure simulations.
- Local manual records: records created in one browser.
- Imported records: records brought in by a user.
- Dataset B: reviewed real-world recovery tests following the public protocol.

A pattern is not a finding. A finding is not core truth. AI judgment is not evidence authority.

## Privacy

Never submit secrets, raw private transcripts, passwords, API keys, private legal or medical material, or identifying screenshots. Use sanitized summaries and outcomes whenever possible.

## Pull requests

Use a branch and include:

- verified starting behavior;
- changed behavior;
- tests performed;
- privacy and accessibility effects;
- evidence claims added or removed;
- known limitations;
- screenshots only when they contain no private material.

Run:

```bash
npm test
npm run validate
```

Do not merge release work without project-owner approval.

## Out of scope for the current architecture

Accounts, cloud storage, payments, external AI calls, transcript collection, analytics, telemetry, tracking, framework rewrites, browser extensions, and multi-agent orchestration are not accepted without a new architectural decision supported by evidence.
