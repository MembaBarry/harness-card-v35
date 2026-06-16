# Feedback and Evidence Collection

Harness Card V3 should collect repair-outcome evidence, not personal conversations.

The project does not need names, emails, IP addresses, locations, account IDs, browser fingerprints, raw clipboard contents, or private transcripts to learn whether the tool works.

## Core Rule

Collect the minimum useful information needed to improve the product:

- tool version
- AI platform used
- failure type
- card used
- parser recommendation
- whether the user followed the recommendation
- outcome
- optional rating
- optional sanitized note

Do not collect raw transcript text by default.

## What Good Evidence Looks Like

A useful sanitized report looks like this:

```json
{
  "toolVersion": "3.4.0",
  "aiPlatform": "Claude",
  "failureType": "Lost constraints",
  "cardUsed": "Full Harness",
  "parserRecommendation": "Full Harness",
  "followedRecommendation": true,
  "outcome": "Helped",
  "rating": 4,
  "sanitizedNote": "The model stopped giving a generic roadmap and returned to the user's original materials and constraints.",
  "rawTranscriptIncluded": false
}
```

This is enough to improve the tool without collecting private user data.

## Do Not Collect

Do not collect or request:

- names
- emails
- addresses
- phone numbers
- IP addresses
- precise location
- account IDs
- API keys
- passwords
- private prompts
- private raw transcripts by default
- legal, medical, financial, or personal details
- browser fingerprinting
- hidden analytics events

## Local-First Collection Model

The preferred workflow is:

1. User runs Harness Card V3 locally.
2. User tests a repair card in their own AI chat.
3. User optionally exports or submits a sanitized test report.
4. User previews exactly what is being shared.
5. User submits through GitHub Issues, GitHub Discussions, Google Forms, email, or manual copy/paste.

Nothing should be sent automatically.

## GitHub Test Reports

Use the included GitHub issue form:

```text
GITHUB_ISSUE_TEMPLATE_test-report.yml (visible reference file; optional later GitHub path is .github/ISSUE_TEMPLATE/test-report.yml)
```

This form asks for structured outcome data and includes privacy confirmations.

## Raw Transcript Rule

Raw transcripts are not required.

A user may choose to share a raw transcript only if all of the following are true:

- the user has removed private or sensitive details
- the user understands the report may become public
- the transcript is necessary to understand the failure
- the user knowingly chooses to share it

The default request should always be a sanitized summary, not a raw transcript.

## Evidence Boundary

Test reports are evidence, not proof.

A single report can show that a repair card helped one user in one situation. It does not prove universal effectiveness.

Use reports to improve:

- failure-type detection
- Full/Mini/Direct routing
- clipboard parser behavior
- wording clarity
- user friction
- outcome scoring

Do not use reports to claim guaranteed performance.

## Public Policy Statement

Harness Card V3 does not collect usage data automatically.

The tool is local-first. Records remain in the user’s browser unless the user chooses to export or submit them.

The project collects only voluntary, sanitized repair-outcome reports.

Raw transcripts are not required and should not be submitted unless the user has removed private or sensitive information and knowingly chooses to share them.

The project measures whether repair cards work. It does not need or want users’ personal information.
