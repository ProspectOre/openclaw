# AGENTS.md

Telegraph style. This file is the root router, not the full repo manual. Read scoped `AGENTS.md` before subtree work.
Skills own workflows; this file owns hard policy and routing. Skill frontmatter descriptions are short routing metadata; keep procedures and examples in skill bodies or referenced docs.

## Start

- Repo: `https://github.com/openclaw/openclaw`
- Replies: repo-root refs only, for example `extensions/telegram/src/index.ts:80`. No absolute paths or `~/`.
- Docs/user-visible work: `pnpm docs:list`, then read relevant docs only.
- Before proposing a custom system, feature, workflow, tool, integration, or automation, do a brief existing-solutions preflight; prefer an adequate maintained open-source project, library, plugin, or free platform.
- Fix, triage, and review answers need current source, tests/CI, shipped behavior, and dependency-contract proof at the depth required by the claim.
- Dependency-touching work requires direct dependency inspection when feasible. Codex-related work has the hard sibling-`../codex` evidence gate detailed in `AGENTS.policy.md`.
- External API work requires a live test when feasible; use official docs/source/types and never rely on memory-only API claims.
- Live-verify when feasible. Never print secrets.
- Missing dependencies: `pnpm install`, retry once, then report the first actionable error.
- CODEOWNERS: maint/refactor/tests are routine; larger behavior, product, security, or ownership changes need owner ask/review.
- Product/docs/UI/changelog wording uses “plugin/plugins”; `extensions/` is internal.
- New channel/plugin/app/doc surfaces update `.github/labeler.yml` and GitHub labels.
- New `AGENTS.md` files get a sibling `CLAUDE.md` symlink; edit `AGENTS.md` only.

## Scoped routing

Read only the section of `AGENTS.policy.md` that matches the task:

- Review, triage, or maintainer operations → `ClawSweeper Review Policy` and `GitHub / PRs`
- Ownership, config, storage, protocol, provider, or runtime changes → `Architecture`
- Test/build/check selection → `Commands` and `Validation`
- Implementation or regression work → `Code` and `Tests`
- Documentation or releases → `Docs / Changelog` and `Security / Release`
- Branching, commits, or landing → `Git` and `GitHub / PRs`
- Device, gateway, or operational work → `Platform / Ops`

Read the nearest scoped `AGENTS.md`/ `CLAUDE.md` and matching skill only for the touched surface. A narrow task does not require a full project map.

## Non-negotiable boundaries

- Keep core plugin-agnostic and preserve owner boundaries; do not add compatibility, fallback, config, or dependency surface without the policy section and contract evidence.
- Do not publish, release, land, or mutate external systems without an explicit user request and the current exact-head/receipt gates.
- Keep secrets, private host details, customer data, credentials, and live config out of source, commits, and public output.
- Do not modify `node_modules`, dependency patches/overrides, or release/version surfaces without the approvals described in `AGENTS.policy.md`.

## Map

- Core TS: `src/`, `ui/`, `packages/`; plugins: `extensions/`; SDK: `src/plugin-sdk/*`; channels: `src/channels/*`; loader: `src/plugins/*`; protocol: `packages/gateway-protocol/*`; docs/apps: `docs/`, `apps/`.
- Installers: sibling `../openclaw.ai`.
- Scoped guides: `extensions/`, `src/{plugin-sdk,channels,plugins,gateway,agents}/`, `packages/`, `test/helpers*/`, `docs/`, `ui/`, `scripts/`.

## Docs

- Source docs: `docs/**`; publish repo: `openclaw/docs`; host: `https://docs.openclaw.ai`.
- Flow: source → `docs-sync-publish.yml` → mirror build → R2 → Worker router.
- Docs AI: `openclaw/ask-molty`; read its scoped `AGENTS.md`.
