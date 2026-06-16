# Harness Card V3

**AI chat circuit breaker for drifting, looping, overexplaining, or ungrounded conversations.**

> **Easy upload package note:** This GitHub upload package avoids hidden dot-files and dot-folders. The app, docs, disclaimer, privacy policy, security policy, data, and roadmap are included. Optional GitHub issue-template and gitignore reference files are provided as visible files for later setup.

Harness Card V3 is a local-first AI conversation repair prototype. It generates structured reset cards that help users recover failing AI chats across any system that accepts text prompts.

The public name is still under review. Current public-language candidates include **Harness Card V3**, **Context Harness Card**, **Context Repair Card**, and **AI Chat Circuit Breaker**. Do not treat any public rename as final until naming collisions and search results have been reviewed with real sources.

Prompt engineering helps you ask better at the beginning.

Harness Card V3 helps you recover when the conversation starts losing the plot in the middle.

No account. No API key. No backend. No analytics. No cloud storage required.

## Open the app

Open:

```text
index.html
```

in a browser.

## Current Status

This is an early local-first prototype with seeded test evidence.

Early cross-model batch testing suggests Full Harness Cards outperform weak baseline corrections on layered context failures such as lost constraints, drift, restart loops, fake certainty, and trust/handoff problems.

For simple output-format failures such as “code only” or “no explanation,” Mini Harness or Direct Correction may be better unless the model keeps failing after correction.

This project does not claim proof, universal effectiveness, novelty, naming clearance, trademark clearance, or that no adjacent products exist. Competitive intelligence, academic claims, SEO claims, and naming claims must be sourced before they appear in public materials. Use `docs/AI_REPORT_AUDIT_CHECKLIST.md` before accepting AI-generated research as project direction. See `DISCLAIMER.md` for the full early-prototype, non-affiliation, trademark, privacy, and no-warranty disclaimer.

## Product Modes

### Full Harness

For layered context failures: drift, lost constraints, restart loops, fake certainty, source/trust confusion, and handoff failures.

### Mini Harness

For output-discipline failures: code-only, no explanation, shorter, just answer, wrong format, no intro/no outro.

### Direct Correction

For obvious one-sentence fixes.

Use the lightest correction that can fix the failure.

## Parser / Auto-Log Feature

The app includes a **Clipboard Parser & Token Scrubber**.

It can:

- accept pasted raw AI output or transcript fragments
- estimate token weight locally
- recommend Full/Mini/Direct
- generate a repair card
- fill the card generator
- preview rough test records from labeled batch output
- import preview records into the local dashboard

Parser output requires human review before it should be treated as evidence.

## Seeded Evidence

This repo includes sanitized seed data from early cross-model batch testing.

Current public seed summary:

- Total records: **30**
- Harness preferred: **25**
- Mixed / close: **2**
- Baseline preferred: **3**

## Files

```text
index.html                         Main app
data/seed-data.json                 Sanitized seed data
data/seed-data.csv                  Sanitized seed data CSV
docs/HARNESS_WEIGHT_RULE.md         Correction weight rule
docs/PROMPT_KIT.md                  Copy/paste prompt templates
docs/TEST_PROTOCOL.md               Testing protocol
docs/POSITIONING_AND_NAMING.md      Name/status boundary
docs/PARSER_AND_AUTO_LOG.md         Parser feature notes
docs/RESEARCH_TRIAGE.md             Quarantined/verified research claims
docs/AI_REPORT_AUDIT_CHECKLIST.md     Checklist for filtering AI-generated research
SECURITY.md                         Safety notes
PRIVACY.md                          Privacy notes
DISCLAIMER.md                       Early prototype, non-affiliation, trademark, privacy, and no-warranty disclaimer
```


## Feedback and Test Reports

Harness Card V3 does not collect usage data automatically.

The project measures repair outcomes, not personal conversations. Users may voluntarily submit sanitized test reports through GitHub Issues or by exporting local records. Raw transcripts are not required and should not be submitted unless private information has been removed and the user knowingly chooses to share them.

Useful test reports include:

- AI platform used
- failure type
- card used
- parser recommendation
- outcome
- optional rating
- optional sanitized note

See `docs/FEEDBACK_AND_EVIDENCE_COLLECTION.md` and `GITHUB_ISSUE_TEMPLATE_test-report.yml (visible reference file; optional later GitHub path is .github/ISSUE_TEMPLATE/test-report.yml)`.

## Disclaimer

Harness Card V3 is an early-stage experimental prototype and working project/build name. Public naming and branding are still under review and may change in a future version.

This project is not affiliated with, endorsed by, sponsored by, or officially connected to any AI platform, model provider, software vendor, hardware manufacturer, or third-party product mentioned in this repository. Any third-party names or trademarks belong to their respective owners and are used only for identification, comparison, research, compatibility discussion, or descriptive purposes.

See [DISCLAIMER.md](DISCLAIMER.md) for the full disclaimer.

## Strong Public Framing For Now

Use this until the naming review is finished:

> Harness Card V3 is a local-first AI chat circuit breaker for recovering drifting, looping, overexplaining, or ungrounded conversations.

## What Not To Build Yet

Do not build SaaS, accounts, payments, cloud sync, custom LLM runners, automated API logging, multi-agent orchestration, or user tracking yet.

The next valuable work is improving the clipboard parser, auditing future AI research reports, and collecting better real-world failure evidence.
