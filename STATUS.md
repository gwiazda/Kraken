# Status

_Last updated: 2026-11-06_

Snapshot of where work stopped. Rewritten at the end of each session; see `CLAUDE.md` for lasting decisions.

## Done
- Repo public, `main` protected (PRs required). PRs #1–#3 merged: status file, brand assets in `assets/brand/`.
- Requirements written in `docs/REQUIREMENTS.md` (PR #4), including the owners' answers so far:
  English UI; web-shop and register sales out of scope; Fakturownia for invoices (statuses To issue / Issued / Paid);
  discounts off retail price, no rounding, manual override; bag cost = all per-bag costs, no energy; VAT 23%;
  RoasTime roast file format confirmed from real files; "Sync roasts" per user in Chrome;
  no bag stock in the first version.

## In progress
- Owner is moving development to **VS Code with the Claude Code extension on the Mac**; cloud sessions stay for iPhone use.

## Next steps
1. Owner merges PR #4 (requirements).
2. Help the owner set up VS Code + Claude Code (in the new local session).
3. Confirm the working process: branch -> PR -> CI checks -> reviewer agents -> owner merges. Record it in `CLAUDE.md`.
4. Decide the remaining open items, then start building:
   - Front-end stack (plain HTML/JS or a framework built to static files)
   - OAuth scope (`drive.file` preferred)
   - Confirm the sheet design in REQUIREMENTS section 7

## Open questions for the owners
- A RoasTime roast file that contains a note (to learn the notes field name). Not urgent.

## Reminders
- Both owners must have 2-Step Verification on their Gmail accounts before real data goes in.
- Never commit real roast files or business data (public repo). Use made-up test data.
