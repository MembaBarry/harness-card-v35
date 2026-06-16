# 06 — Next Build Backlog

Do not overbuild. The next work should make the local tool easier to test and more useful.

## Priority 1 — Improve clipboard parser

Goal:

```text
Paste messy AI thread → scrub noise → estimate failure type → recommend Full/Mini/Direct → generate repair card.
```

Needed:

- better UI-noise stripping
- better detection of overexplaining vs drift vs lost constraints
- clearer parser recommendation explanation
- safer sanitized preview
- export sanitized test report

## Priority 2 — Export Sanitized Test Report

Add a button that exports only outcome data:

```json
{
  "toolVersion": "3.5.0",
  "aiPlatform": "Claude",
  "failureType": "Lost constraints",
  "cardUsed": "Full Harness",
  "parserRecommendation": "Full Harness",
  "followedRecommendation": true,
  "outcome": "Helped",
  "rating": 4,
  "sanitizedNote": "The model returned to the original constraints.",
  "rawTranscriptIncluded": false
}
```

Do not include raw transcripts by default.

## Priority 3 — Improve onboarding

Add a short “How to use this” panel:

1. Pick a failure type.
2. Generate a card.
3. Paste it back into the AI chat.
4. Report whether it helped.

## Priority 4 — Add sample broken-chat demos

Use synthetic examples only. Do not include private user transcripts.

## Parking lot

Do not build yet:

- SaaS backend
- accounts
- Stripe
- cloud sync
- browser extension
- AI API integration
- local LLM runner
- vector database
- telemetry
- analytics
