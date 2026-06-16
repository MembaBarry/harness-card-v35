# Test Protocol

Use this protocol to test Harness Cards across AI systems.

## Controlled loop

1. Choose one model.
2. Choose one scenario.
3. Produce a forced bad response matching the failure type.
4. Apply weak baseline correction.
5. Apply Harness Card correction.
6. Score both.
7. Log outcome preference.

## Baseline correction

```text
You missed the point. Try again. Remember my constraints and give me a better answer.
```

## Scoring categories

Score 0–5:

- Alignment
- Constraint recovery
- Trust / calibration
- Next-step usefulness
- Brevity

## Outcome preference

Record one of:

- Harness
- Baseline
- Mixed

Do not rely on score alone. Sometimes both responses score well but one is cleaner or lighter.

## Evidence hygiene

Keep these separate:

- Runner/source model: the AI that produced the batch
- Model label in payload: whatever the output itself claims was tested

Do not treat a simulated result as a live result from another model.
