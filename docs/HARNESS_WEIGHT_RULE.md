# Harness Weight Rule

Harness Card V3 uses three correction weights.

## Full Harness

Use for layered context failures:

- Lost constraints
- Topic drift
- Restart loops
- Fake certainty
- Handoff failure
- Source vs assumption blur
- Multi-step project continuity failure

Full Harness forces the model to diagnose before continuing:

```text
POINT A:
POINT B:
DRIFT:
LOST CONSTRAINTS:
UNDERLYING SIGNAL:
TRUST ISSUE:
HANDOFF RISK:
NEXT STRAIGHT STEP:
```

## Mini Harness

Use for output-discipline failures:

- Code only
- No explanation
- Shorter
- Just answer
- Wrong format
- Too much filler

## Direct Correction

Use when the fix is obvious and can be stated in one sentence.

Example:

```text
You added explanation. Give only the code.
```

## Current finding

The seeded tests suggest Full Harness wins most strongly on layered context failures.
Mini/Direct correction is often better for simple output-format failures unless the model keeps failing after correction.
