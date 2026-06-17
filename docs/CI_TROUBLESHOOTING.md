# GitHub Actions troubleshooting

As of June 17, 2026, pull-request validation jobs may fail before any workflow step starts.

Observed behavior:

- the workflow run is created;
- the job ends in failure;
- GitHub reports no executed steps;
- no job log or diagnostic artifact is produced;
- local parser tests pass;
- the repository validator is the previously working validator.

This points to GitHub Actions runner assignment, repository Actions settings, or account-level Actions availability rather than an application test failure.

Check, in order:

1. Repository **Settings → Actions → General** and confirm actions are allowed.
2. Confirm GitHub-hosted runners are available for the account.
3. Check billing, spending limits, or Actions usage restrictions.
4. Re-run the workflow manually after settings are corrected.
5. Do not weaken or bypass the test commands to make the status green.

Local verification remains:

```bash
npm test
npm run validate
```
