# Security Policy

Harness Card V3 is a static, local-first browser application. Its security model depends on keeping the architecture small, making storage visible, and refusing unnecessary data collection.

## Supported version

Security fixes are applied to the current `3.5.x` release line. Reports should identify the exact app version, browser, operating system, and reproduction steps.

## Architecture boundary

The project requires no backend, database, account, API key, analytics service, external AI call, or automatic telemetry. Application code and seeded evidence are inspectable in the public repository.

This reduces attack surface; it does not make the app risk-free. Browser extensions, shared devices, malicious imported files, copied exports, and modified forks can still expose data.

## Local storage

Records saved by the user may remain in browser `localStorage`. Users should be able to see that storage is active, export records before clearing, clear saved browser data, and reset separately to the public seed dataset.

Clearing browser storage is destructive. Resetting to seed records is a different action and must not be presented as equivalent.

## Import boundary

JSON imports are untrusted input. Import handling should:

- reject malformed JSON;
- require an array of record objects;
- validate required fields and supported schema versions;
- bound file size and record count;
- avoid executing imported text as HTML or JavaScript;
- offer merge and replace as explicit separate choices;
- preserve the original Dataset A metrics rather than silently reclassifying imports as seed evidence.

## Sensitive data

Do not paste, import, commit, attach, or publish:

- passwords, API keys, tokens, cookies, or `.env` files;
- private AI transcripts;
- confidential legal, medical, financial, employment, or family information;
- private email addresses, phone numbers, street addresses, usernames, or handles;
- screenshots containing private browser or account UI;
- exports that have not been reviewed and sanitized.

Prefer a sanitized outcome record over a raw conversation.

## Content rendering

User-controlled and imported text must be rendered as text, not trusted markup. Continue escaping record fields before inserting them into the document. New code must not use `eval`, dynamic script creation from imported values, or unsafe HTML assignment with unsanitized content.

## Dependencies and automation

The core app should remain dependency-light. GitHub Actions run dependency-free Node validation. Any new third-party dependency requires a specific reason, maintenance assessment, license review, and security review.

## Reporting a vulnerability

Open a private GitHub security advisory when available. Do not include real secrets or private transcripts in the report. Provide a minimal sanitized reproduction, affected version, impact, and suggested mitigation when known.

Public issues may be used for non-sensitive hardening requests only.

## Public evidence safety

Test reports should measure repair outcomes, not expose personal conversations. Anything committed to this repository or submitted through a public issue may be indexed and copied permanently.
