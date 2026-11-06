# Status

_Last updated: 2026-11-06 (first local VS Code session)_

Snapshot of where work stopped. Rewritten at the end of each session; see `CLAUDE.md` for lasting decisions.

## Done
- Repo public, `main` protected by a ruleset (PR required, 0 approvals, no force push).
- Brand assets, requirements (`docs/REQUIREMENTS.md`) and made-up RoasTime samples (`docs/samples/`) in place.
- Owner's Mac set up for local work: VS Code + Claude Code, git identity, Homebrew, Node.js, GitHub CLI signed in
  (push works). Repo is at `~/IdeaProjects/Kraken/kraken`.
- Decided: TypeScript + Vite (no framework); OAuth scope `drive.file`; working process recorded in `CLAUDE.md`.
- PR "Set up TypeScript + Vite": placeholder branded page, CI workflow, GitHub Pages deploy workflow.

## In progress
- Owner to merge the Vite setup PR, then turn on GitHub Pages: repo **Settings → Pages → Source: GitHub Actions**.
  Then check that `https://gwiazda.github.io/Kraken/` shows the placeholder page.

## Next steps
1. Google Cloud setup with the owner, step by step: project, Sheets API, Drive API, Picker API, OAuth consent screen
   (Testing mode, both Gmail accounts as test users), OAuth Client ID (web) with JavaScript origins
   `http://localhost:5173` and `https://gwiazda.github.io`, Picker API key restricted to those origins.
2. Owner confirms the sheet design in REQUIREMENTS section 7.
3. Build: sign-in and sheet connection (create sheet / pick with Picker), then green coffee lots,
   then the roasting log and RoasTime import.

## Open questions for the owners
- Sheet design in REQUIREMENTS section 7 (awaiting confirmation).
- A RoasTime roast file that contains a note (to learn the notes field name). Not urgent.

## Reminders
- Both owners must have 2-Step Verification on their Gmail accounts before real data goes in.
- Never commit real roast files or business data (public repo). Use made-up test data.
