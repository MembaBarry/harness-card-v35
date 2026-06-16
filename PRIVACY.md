# Privacy

Harness Card V3 is local-first by design.

## What the app processes

The app may process text you paste into the card generator or clipboard parser and records you create or import. The current app performs that work in your browser.

## What the app stores

When records are saved, they may remain in browser `localStorage` on that device and browser profile. Local storage can persist after the tab closes and may be accessible to other people using the same browser profile.

The interface should distinguish:

- **Save locally** — write the current records to this browser;
- **Export** — create a file or clipboard copy chosen by the user;
- **Clear saved browser data** — remove locally saved records;
- **Reset to seed records** — restore the public Dataset A records.

Clear and reset are different actions.

## What the app sends

The project includes no intentional backend upload, account system, analytics, telemetry, external AI request, or cloud transcript storage. The app does not automatically submit usage or conversation data to the project owner.

Hosting platforms, browsers, extensions, operating systems, modified forks, and networks may have their own data practices outside this repository’s control.

## Clipboard parser

The parser is a local deterministic heuristic, not AI diagnosis. Pasted text remains in the page unless the user saves, exports, copies, reloads, or otherwise shares it.

Before pasting, remove:

- passwords and API keys;
- private legal or medical information;
- confidential business or employment information;
- account identifiers and personal contact details;
- anything the user does not want stored on the device.

Prefer a sanitized failure window and outcome over a complete raw conversation.

## Imports and exports

Imported JSON is stored locally only after the user chooses to import it. Exported JSON and CSV files are ordinary files: once downloaded, copied, emailed, committed, or uploaded, they are outside the app’s control.

Exports should include app and schema versions and preserve evidence origin so seeded, manual, imported, and reviewed-public records cannot be silently conflated.

## Public evidence

Harness Card measures repair outcomes, not people. Public test reports should contain the least information necessary to evaluate the repair.

Raw transcripts are not required. Public evidence should use sanitized summaries, explicit review status, and a clear statement of limitations. A record marked public-safe means it was reviewed for publication; it does not mean every claim inside it is verified truth.

## Your responsibility

Review the device, browser profile, imported file, and export destination before using the app with sensitive material. Do not use a shared or public computer for private recovery work unless you understand and clear its storage afterward.
