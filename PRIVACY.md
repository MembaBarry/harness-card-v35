# Privacy

Harness Card V3 is local-first.

## What the app stores

The app may store test records in browser `localStorage` if you click save.

That data stays in your browser unless you export it or upload the repo somewhere.

## What the app sends

The app does not intentionally send data anywhere.

There is no backend, no analytics, no external API call, and no account system.

## Public repo warning

If you publish this repo publicly, anything inside the repo can become public.

Before publishing, inspect:

- `data/seed-data.json`
- `data/seed-data.csv`
- screenshots
- docs
- exported JSON files
- copied transcripts

## Recommended public data style

Use summaries instead of raw personal transcripts.


## Clipboard Parser

The Clipboard Parser & Token Scrubber runs entirely in the browser. Pasted text is not sent to any server by this app. If you save or import parsed records, they are stored in localStorage until you export or clear them.

## Voluntary Test Reports

Harness Card V3 does not collect usage data automatically.

Users may voluntarily submit sanitized test reports to help improve the product. Test reports should focus on repair outcomes, not personal conversations.

Good test reports may include:

- tool version
- AI platform used
- failure type
- card used
- parser recommendation
- outcome
- optional rating
- optional sanitized note

Do not submit private, sensitive, legal, medical, financial, personal, proprietary, or confidential information. Raw transcripts are not required and should not be submitted unless they have been sanitized and the user knowingly chooses to share them.
