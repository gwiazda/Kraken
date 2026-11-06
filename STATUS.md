# Status

_Last updated: 2026-11-06 (end of the cloud setup session)_

Snapshot of where work stopped. Rewritten at the end of each session; see `CLAUDE.md` for lasting decisions.

## Done
- Repo public, `main` protected by a ruleset (PR required, 0 approvals, no force push). PRs #1–#5 merged.
- Brand assets in `assets/brand/`. Requirements complete for a first version in `docs/REQUIREMENTS.md`:
  English UI; web-shop and register sales out of scope; Fakturownia for invoices (To issue / Issued / Paid);
  discounts off retail price, no rounding, manual override; bag cost = all per-bag costs, no energy; VAT 23%;
  RoasTime roast file format confirmed from real files; "Sync roasts" per user in Chrome; no bag stock for now.
- Made-up RoasTime sample files for building the importer: `docs/samples/`.
- Owner's Mac: VS Code installed, repo cloned at `~/Projects/kraken`, git autofetch on.

## In progress
- Owner is moving development to **VS Code with the Claude Code extension on the Mac**. Cloud sessions stay for iPhone use.
  The first cloud session ("Kraken – project setup" in the Claude app) holds the full setup discussion if anything is unclear.

## Next steps
1. Check the owner's VS Code setup: Claude Code signed in, git `user.name`/`user.email` set, VS Code signed in to GitHub
   (can push a branch), GitHub Pull Requests and Live Server extensions installed.
2. Confirm the working process: branch -> PR -> CI checks -> reviewer agents (code review) -> owner merges. Record it in `CLAUDE.md`.
3. Decide the remaining open items (propose, owner confirms):
   - Front-end stack (plain HTML/JS or a framework built to static files)
   - OAuth scope (`drive.file` preferred)
   - Sheet design in REQUIREMENTS section 7
4. Google Cloud setup with the owner, step by step: project, Sheets (and Drive) API, OAuth consent screen,
   OAuth Client ID with JavaScript origins `http://localhost:<port>` and the GitHub Pages URL.
5. Start building: sign-in and sheet connection first, then green coffee lots, then the roasting log and import.

## Open questions for the owners
- A RoasTime roast file that contains a note (to learn the notes field name). Not urgent.

## Reminders
- Both owners must have 2-Step Verification on their Gmail accounts before real data goes in.
- Never commit real roast files or business data (public repo). Use made-up test data.
