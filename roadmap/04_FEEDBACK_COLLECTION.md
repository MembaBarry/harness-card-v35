# 04 — Feedback Collection

## Core rule

Collect repair outcomes, not personal conversations.

## What to collect

Useful tester data:

```text
tool version
AI platform used
failure type
card used
parser recommendation
whether the tester followed the recommendation
outcome
optional rating
optional sanitized note
suggested fix
```

## What not to collect

Do not ask for:

```text
names
emails
IP addresses
private transcripts
clipboard history
API keys
account IDs
locations
legal/medical/financial details
confidential work data
browser fingerprints
```

## GitHub issue form

The repo includes:

```text
GITHUB_ISSUE_TEMPLATE_test-report.yml (visible reference file; optional later GitHub path is .github/ISSUE_TEMPLATE/test-report.yml)
```

Use it for sanitized public test reports.

## Good tester report

```text
AI platform: Claude
Failure type: Lost constraints
Card used: Full Harness
Parser recommendation: Full Harness
Outcome: Helped
Rating: 4/5
Sanitized note: The model stopped giving generic advice and returned to the original material constraints.
```

## Bad tester report

```text
Here is my whole private chat including names, addresses, legal details, and account information...
```

Do not ask for that. Discourage it clearly.

## Optional later feature

Future app feature:

```text
Export Sanitized Test Report
```

Requirements:

- preview before export
- no raw transcript by default
- no automatic sending
- no telemetry
- user chooses whether to submit
