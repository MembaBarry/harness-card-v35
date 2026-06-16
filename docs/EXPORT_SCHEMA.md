# Export Schema Contract

## Current versions

- App version: `3.5.2`
- Export schema version: `1.0.0`

Future exports should include both values at the top level.

```json
{
  "project": "Harness Card V3",
  "appVersion": "3.5.2",
  "schemaVersion": "1.0.0",
  "exportedAt": "2026-06-16T00:00:00.000Z",
  "exportMode": "all",
  "records": []
}
```

## Record origin

Every record should carry one origin value:

- `seeded-exploratory`
- `local-manual`
- `imported`
- `real-world-test`

Origin is provenance, not quality.

## Review state

Every non-seed record should use one review state:

- `unreviewed`
- `reviewed`
- `sanitized`
- `public-safe`
- `rejected`

Review state must not be inferred from origin.

## Minimum record fields

```json
{
  "id": "local-unique-id",
  "createdAt": "ISO-8601 timestamp",
  "updatedAt": "ISO-8601 timestamp",
  "origin": "local-manual",
  "reviewState": "unreviewed",
  "runnerModel": "Unknown",
  "modelLabelInPayload": "",
  "scenarioName": "",
  "failureType": "",
  "repairType": "full",
  "outcomePreference": "Mixed",
  "dashboardNotes": ""
}
```

Additional fields are allowed. Imported unknown fields should be preserved when safe rather than silently discarded.

## Validation rules

An importer should reject:

- non-object top-level data unless it is a legacy record array;
- a missing `records` array in versioned exports;
- unsupported future major schema versions;
- non-object records;
- missing or duplicate record IDs;
- invalid evidence origins or review states;
- unreasonable file size or record count;
- executable markup or code treated as trusted HTML.

Legacy arrays may be accepted only through an explicit compatibility path and should be normalized to `origin: imported` and `reviewState: unreviewed`.

## Merge versus replace

Import must present two distinct choices:

- **Merge** keeps existing records and adds normalized incoming records, resolving ID collisions visibly.
- **Replace local records** replaces the current non-seed working set only after confirmation.

Dataset A seed records and their published metrics remain a separate immutable reference dataset. Imported records must never silently become Dataset A.
