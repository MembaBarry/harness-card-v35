# Changelog

All notable changes to Harness Card V3 are documented here.

## [Unreleased]

No committed release scope yet. Future work should be driven by Dataset B evidence and verified user failures rather than speculative expansion.

## [3.5.2] - 2026-06-16

### Added
- Accessible, responsive static application shell with separated CSS and JavaScript.
- Local conversation-repair analyzer with reasons, detected signals, token estimate, confidence, and heuristic disclaimer.
- Testable, dependency-free parser heuristic with Direct evaluated before Mini.
- Manual Direct, Mini, and Full repair-card generator.
- Visible local-storage state and distinct save, clear, and reset controls.
- Versioned JSON and CSV exports.
- Validated JSON imports with file-size and record-count limits.
- Explicit merge-versus-replace import choices.
- Local-record add, edit, duplicate, review-state, and delete controls.
- Separate Dataset A, working-record, and combined metric scopes.
- Regression tests, repository validation, and GitHub Actions workflow.
- Dataset B protocol for real conversation-recovery evidence.
- Export schema, evidence-origin, and review-state contract.
- Public credibility, privacy, security, and contribution documentation.

### Changed
- Package version advanced to 3.5.2.
- Replaced the 1,000-line monolithic page with a maintainable static shell, stylesheet, and application module.
- Dataset A is explicitly classified as exploratory forced-failure simulation evidence, not proof.
- Seeded metrics remain separate from local and imported evidence.
- Parser recommendations are explicitly advisory heuristics, not AI diagnosis.
- README no longer presents stale upload-package or naming-review language.

### Security and privacy
- Imported records are treated as untrusted input and rendered as escaped text.
- Import files are bounded to 2 MB and 2,000 records.
- No backend, account, API key, external AI call, analytics, telemetry, or automatic upload was introduced.
- The interface warns against pasting secrets and sensitive personal material.

### Preserved
- Static HTML/CSS/JavaScript architecture.
- GitHub Pages compatibility.
- Thirty seeded Dataset A records as an immutable reference boundary.
- Human review and approval as the final authority.
