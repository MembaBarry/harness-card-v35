# Parser and Auto-Log Notes

## Purpose

The parser exists to reduce workflow friction. Manual one-record-at-a-time entry is too slow for real testing.

The V4 direction is:

> Paste raw batch result → parse test records → preview → import into dashboard.

## Current Implementation

The static app now includes a **Clipboard Parser & Token Scrubber** section.

It can:

- accept pasted raw AI output or transcript fragments
- strip obvious UI noise and timestamp-like clutter
- estimate token weight locally
- recommend Full Harness, Mini Harness, or Direct Correction
- generate a recommended repair card
- fill the manual generator fields
- preview rough test records from labeled batch outputs
- import preview records into localStorage

## Trust Boundary

The parser is intentionally conservative. Parsed records are marked:

> Parsed from raw paste. Human review required before treating as evidence.

Do not treat parser output as verified evidence without review.

## Known Limits

The parser is regex-based and client-side only. It is not an LLM, not an evaluator, and not a source-of-truth system.

It works best when pasted results include labels such as:

- Scenario name
- Failure type
- Original user prompt
- Harness tested
- Baseline score
- Harness score

## Next Improvements

- better transcript scrubber patterns for ChatGPT, Claude, Gemini, Perplexity, Copilot, and z.ai exports
- clearer preview table before import
- editable parsed records before committing
- duplicate detection
- blind-judge fields
- real-user drift-log import format
