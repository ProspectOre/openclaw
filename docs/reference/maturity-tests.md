---
summary: "Why OpenClaw uses a maturity taxonomy and scorecard for release stability and LTS decisions."
read_when:
  - Understanding maturity scores and LTS readiness
  - Reading release stability or scorecard docs
  - Explaining how QA evidence supports maturity decisions
title: "Taxonomy and Maturity"
---

OpenClaw uses the maturity taxonomy to make release readiness visible. It groups product areas into consistent capability categories so maintainers can see which surfaces are ready for long-term support, which need more release validation, and which are still experimental.

The scorecard is not meant to be a leaderboard. It is a release planning tool for answering a practical question: can users rely on this surface over time?

## Why It Exists

OpenClaw spans gateway behavior, channels, providers, plugins, apps, installers, QA lanes, and maintainer workflows. Without a shared taxonomy, stability discussions can become anecdotal or tied to whichever area was tested most recently.

The maturity system gives each area the same shape:

- The taxonomy defines the expected capability areas.
- The scorecard summarizes current readiness.
- Release QA evidence shows which areas were exercised recently.
- LTS status marks the surfaces that meet the bar for durable support.

## How It Supports LTS

LTS should mean more than "it worked once." A surface is a stronger LTS candidate when it has a complete user workflow, reliable behavior across release checks, clear docs, and a maintained owner path when something breaks.

The maturity scorecard helps maintainers separate those signals:

- **Coverage** shows whether release validation exercised the area.
- **Quality** captures reliability, maintainability, and operational confidence.
- **Completeness** asks whether the intended workflow is actually available to users.
- **LTS** combines those signals with any explicit maintainer override.

This keeps LTS decisions tied to repeatable evidence instead of memory, urgency, or one-off manual confidence.

## How To Read It

Start with the [Maturity scorecard](/maturity/scorecard) when you want the current release-readiness snapshot. Use the [Maturity taxonomy](/maturity/taxonomy) when you want to understand the capability groups behind a score.

Low coverage usually means the release lane needs more proof. Lower quality or completeness means the product surface itself may need hardening, docs, recovery paths, or workflow work before it should be treated as stable.

## Related docs

- [Maturity scorecard](/maturity/scorecard)
- [Maturity taxonomy](/maturity/taxonomy)
- [QA overview](/concepts/qa-e2e-automation)
- [Testing](/help/testing)
