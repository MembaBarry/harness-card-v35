# Changelog

All notable changes to Harness Card V3 are documented here.

## [Unreleased]

### Planned
- Wire the extracted parser heuristic into the browser interface.
- Add visible parser reasons, detected signals, confidence, and heuristic disclaimer.
- Add per-record edit, duplicate, delete, and review-state controls.
- Add explicit merge-versus-replace import controls.

## [3.5.2] - 2026-06-16

### Added
- Testable, dependency-free parser heuristic module.
- Regression tests proving Direct is evaluated before Mini.
- Repository validation script and GitHub Actions workflow.
- Dataset B protocol for real conversation-recovery evidence.
- Public credibility, privacy, security, and contribution documentation.
- Schema/version contract for exported records.

### Changed
- Package version advanced to 3.5.2.
- Dataset A is explicitly classified as exploratory forced-failure simulation evidence, not proof.
- Parser recommendations are explicitly advisory heuristics, not AI diagnosis.

### Preserved
- Static HTML/CSS/JavaScript architecture.
- No backend, account, API key, analytics, telemetry, or automatic uploads.
- Thirty seeded Dataset A records remain separate from local and imported evidence.
