# 01 — Pre-Public Checklist

Use this before making the repository public.

## 1. Use the correct ZIP/folder

Use the latest repo version only.

Current expected folder:

```text
harness-card-v3-circuit-breaker-repo-v35/
```

Do not upload older versions unless you intentionally roll back.

## 2. Confirm required files exist

Required root files:

```text
index.html
README.md
DISCLAIMER.md
PRIVACY.md
SECURITY.md
LICENSE
package.json
.gitignore
REPO_MANIFEST.txt
```

Required folders:

```text
data/
docs/
.github/ISSUE_TEMPLATE/
roadmap/
```

Required feedback file:

```text
GITHUB_ISSUE_TEMPLATE_test-report.yml (visible reference file; optional later GitHub path is .github/ISSUE_TEMPLATE/test-report.yml)
```

## 3. Human eyeball review

Open and skim these files before public release:

```text
README.md
DISCLAIMER.md
PRIVACY.md
SECURITY.md
data/seed-data.json
data/seed-data.csv
docs/POSITIONING_AND_NAMING.md
docs/FEEDBACK_AND_EVIDENCE_COLLECTION.md
```

Look for:

- personal names you do not want public
- email addresses
- phone numbers
- addresses
- local computer paths
- private chat transcripts
- screenshots or image references
- API keys
- tokens
- legal, medical, financial, or sensitive personal details
- overclaims like “proven,” “guaranteed,” or “no competitor exists”

## 4. Public claim boundary

Allowed claim:

```text
Harness Card V3 is an early local-first AI chat circuit breaker prototype for recovering drifting, looping, overexplaining, or ungrounded AI conversations.
```

Avoid claims like:

```text
This is proven.
This is universal.
No competitor exists.
This solves AI alignment.
This guarantees correct answers.
```

## 5. Privacy boundary

The project should clearly say:

```text
Harness Card V3 does not collect usage data automatically.
Users may voluntarily submit sanitized repair-outcome reports.
The project measures whether repair cards work; it does not need or want personal conversations.
```

## 6. Final local test

Open `index.html` locally and test:

- Full Harness generation
- Mini Harness generation
- Direct Correction generation
- clipboard parser
- copy buttons
- seed data dashboard
- JSON export
- CSV export
- JSON import

Only continue after the app opens and basic controls work.
