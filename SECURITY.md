# Security Policy

Harness Card V3 is a static local-first app.

## No backend

This project does not require:

- server
- database
- API key
- login
- cloud storage
- analytics

Everything runs in the browser.

## What not to commit

Do not commit private or sensitive data, including:

- API keys
- `.env` files
- private AI transcripts
- personal legal, medical, financial, or family information
- emails
- phone numbers
- addresses
- usernames/handles unless intentionally public
- screenshots with private UI
- browser exports containing personal conversations
- raw logs from ChatGPT, Claude, Gemini, Copilot, Perplexity, z.ai, or local models

## Safe data practice

Before publishing data:

1. Remove names, emails, handles, and local file paths.
2. Replace private transcripts with summaries.
3. Keep model/source labels separate from user identity.
4. Do not publish anything you would not want indexed by search engines.

## Reporting security issues

If this becomes a public repo, add your preferred contact method here.

Until then, do not include private contact info in this file.


## Raw Parser Warning

The parser is meant to reduce manual entry. Do not paste private transcripts into a public demo machine. Do not commit raw parsed exports unless they have been reviewed and sanitized.


## Public Feedback Safety

When submitting issues, discussions, screenshots, exported records, or test reports, do not include secrets or private information.

Do not submit:

- API keys
- passwords
- tokens
- private prompts
- raw sensitive transcripts
- legal, medical, financial, or personal details
- private screenshots

Use sanitized summaries whenever possible.
