# Status

_Last updated: 2026-11-06_

Snapshot of where work stopped. Rewritten at the end of each session; see `CLAUDE.md` for lasting decisions.

## Done
- Repo created (public) and `main` protected by a ruleset (PRs required, no force pushes).
- Auth approach decided (see `CLAUDE.md`).
- User set up VS Code with the repo cloned and auto-fetch on.
- PR #1 merged: the first test of the PR flow worked.
- `CLAUDE.md` split: lasting rules stay there, session status moved to this file.

## In progress
- Nothing.

## Next steps
1. User confirms the full working process: branch -> PR -> CI checks -> reviewer agents (code review)
   -> user reviews and merges. Then record it in `CLAUDE.md`.
2. Design the Google Sheets structure. Questions asked, awaiting answers:
   - Data per green-bean lot (origin, producer, variety, process, supplier, date, price/kg, kg bought, own lot code?)
   - Roasting: record green kg in and roasted kg out? Blends of several lots in one roast?
   - Products and sales: sold by bag size, product or blend? Customer types?
   - Invoices: issued in other software, or only tracked in Kraken (to issue / issued / paid)?
   - Currency (PLN only?) and UI language (Polish, English or both)

## Reminders
- Optional: GitHub Pull Requests extension in VS Code; background auto-pull (crontab).
- Before real data goes in: both users must have 2-Step Verification on their Gmail accounts.
