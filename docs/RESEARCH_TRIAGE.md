# Research Triage

## Status

The latest external research report is useful but contaminated.

It correctly reinforces several product decisions, but it also includes claims that must be quarantined until independently verified.

## Keep As Working Signal

The following recommendations are consistent with current project evidence:

- keep the product local-first and free
- do not build SaaS, accounts, payments, API logging, custom LLM runners, or multi-agent orchestration yet
- keep the three-weight correction rule: Full / Mini / Direct
- build the Clipboard Parser & Token Scrubber next
- use “AI chat circuit breaker” as the plain-English framing
- focus on reducing user friction before expanding platform scope

## Quarantine Until Verified

Do not copy these claims into public materials unless they are source-backed:

- named competitor feature claims
- “extremely hostile” SEO claims
- final recommendation to rebrand as Context Repair Card
- academic claims without title, venue, DOI, or URL
- mathematical/control-theory framing that does not change product decisions
- claims that the tool “programmatically anchors the model’s attention mechanism”

## Naming Decision Boundary

Do not rebrand yet.

Current safe public phrasing:

> Harness Card V3 — AI chat circuit breaker

Alternative names remain candidates, not decisions.

## Competitive Intelligence Checklist

Before public release, verify:

1. Does the alleged competitor exist?
2. Is the description accurate?
3. Is it a direct competitor, adjacent product, or unrelated collision?
4. Does it repair an active conversation, or merely store/search/manage prompts?
5. Does it require a backend, account, API, extension, CLI, or local server?
6. Does it support human-side copy/paste repair across multiple AI platforms?

## Academic Citation Rule

Any academic claim must include at least:

- title
- authors
- year
- venue or preprint host
- DOI/arXiv/link if available
- one sentence explaining why it matters to this product

If that information is missing, cut the citation.

## Strongest Honest Product Claim For Now

Harness Card V3 is a local-first AI chat circuit breaker. It helps users recover drifting, looping, overexplaining, or ungrounded AI conversations by generating the right-size correction prompt: Full Harness, Mini Harness, or Direct Correction.

Early internal batch testing suggests Full Harness helps most on layered context failures, while Mini Harness or Direct Correction is usually better for simple output-format failures.

This is not proof. It is a useful early signal.
