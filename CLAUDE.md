# Kraken

Internal management system for **Krak Coffee Roastery**. Kraken is the app name.

## Purpose
Track the roastery's operations: green coffee inventory, roasting log (manual entry and import from the
Aillio Bullet R2 PRO), invoice requests, contractor price lists and the cost calculation
that sets retail prices.

**Full requirements: `docs/REQUIREMENTS.md`.** Read it before building any feature. When the owners add or
change a requirement, update that file in the same PR. Items marked [P] are proposals and [Q] are open questions:
do not treat them as decided until the owner confirms.

## Language
- The app (UI, code, data column names, docs) is in **English**.
- When the owners write or paste Polish, translate it to English. Keep Polish proper names
  (such as coffee names on the labels) as they are.

## Users
Internal only. Exactly two users: the owner and their business partner, both on Gmail accounts.
No public access. Sign-in is with Google. Access is enforced by Google: the spreadsheet is shared only with the two Gmail accounts.

## Architecture (decided so far)
- Front-end: a static site hosted on **GitHub Pages**
- Database: **Google Sheets**
- Authentication: **Google Identity Services (OAuth 2.0) in the browser**. The page calls the Google Sheets API
  directly with the signed-in user's access token. No backend and no Apps Script.
  Reason: Google enforces access through sheet sharing, there are no secrets to store, and there is nothing to host.
- The repo is **public**, because GitHub Pages on the Free plan requires it. The code is public; the data is not.
- Front-end stack (decided 2026-11-06): **TypeScript + Vite, no UI framework** (no React).
  Reason: TypeScript is readable and catches bugs; Vite is mainstream and outputs static files. A framework can be added later if screens get complex.
  Strict `tsconfig.json`; keep dependencies minimal (only `vite` and `typescript`, exact versions).
- OAuth scope (decided 2026-11-06): **`drive.file`**. Reason: least access, Kraken sees only its own sheet.
  Each user opens the shared sheet once through the Google Picker (needs a Picker API key restricted to the Picker API
  and the site's origins; such a key is public by design and may be committed).
- Published at `https://gwiazda.github.io/kraken/` (Vite `base: '/kraken/'`). The CSP is a `<meta>` tag in `index.html`.

## Commands
- `npm install`: once after cloning, and after `package.json` changes.
- `npm run dev`: local test server at **http://localhost:5173/kraken/** (fixed port; it is an OAuth origin). The Live Server extension is not used.
- `npm run build`: type check (`tsc`) and build to `dist/`. `npm run typecheck`: type check only.

## Working process
Branch `claude/<topic>` → PR → CI (`.github/workflows/ci.yml`: type check + build) must pass →
Claude reviews its own diff (code-review) before asking the owner → owner tests locally if the PR says so, then merges →
`.github/workflows/deploy.yml` publishes `main` to GitHub Pages.

## Security rules
- Never commit secrets, API keys with write power, or OAuth client secrets. The OAuth Client ID is public by design and is fine.
- Never commit real business data, Gmail addresses or the spreadsheet ID. Test and sample data must be made up.
  The spreadsheet ID is entered in the app and stored in the browser (localStorage).
- Keep access tokens in memory only, never in localStorage.
- Keep third-party scripts to a minimum and use a strict Content Security Policy (XSS is the main risk).

## Branding
Brand assets are in **`assets/brand/`**. Read `assets/brand/README.md` before any UI work: it lists the logos,
colours (lime `#CAD401`, yellow `#F3E838`, black) and fonts. Use the provided logos as they are; never redraw them.
The label font (Erbaum) is commercial: never commit its font files without a web licence.

## Working with the owner
- The owner is not a developer. Give step-by-step instructions with exact clicks and commands, and explain
  what each PR changes in plain language.
- The owner prefers accuracy over speed: check things rather than guess, and say clearly when something is unverified.
- The owner reviews and merges PRs in VS Code (GitHub Pull Requests extension) or GitHub Mobile.
- Setup: MacBook, Chrome, VS Code with the official Claude Code extension, repo cloned at `~/IdeaProjects/Kraken/kraken`.
  Homebrew, Node.js and the GitHub CLI (`gh`, signed in) are installed.
  The business partner also uses Chrome and does the roasting (RoasTime on his computer).
- Cloud sessions (from the Claude iPhone app) can't use `gh pr create` (GitHub GraphQL is blocked there);
  open PRs with the REST API instead: `gh api -X POST repos/gwiazda/kraken/pulls -f title=... -f head=... -f base=main -f body=...`.

## Open decisions
- Sheet structure and schema-change approach: proposal in `docs/REQUIREMENTS.md` section 7, awaiting confirmation

## Rules for Claude
- **Keep this file up to date yourself, without being asked.** After any change that affects
  architecture, data model, commands, conventions, decisions or project status, update the
  relevant section of this file in the same commit. The user should never have to remind you.
- Record decisions in this file when they are made, with a one-line reason.
- Keep this file concise. Replace outdated information instead of appending to it.
- Ask before changing how data is read from or written to Google Sheets, or how authentication works.
- Commit and push work regularly. Sessions are temporary and unpushed work is lost.
- `main` is protected: never push to it. Every change goes on a branch and through a pull request
  that the user reviews and merges.

## Session status: `STATUS.md`
This file holds only lasting project knowledge. The current state of work (what was done last,
what is in progress, next steps, open questions) lives in **`STATUS.md`**.
- At the start of every session, read `STATUS.md` to pick up where the last session stopped.
- When the user ends a session ("Let's call it a day", "that's all for today", "koniec na dziś"
  or similar), rewrite `STATUS.md` with the current situation, commit it and open (or update) a PR.
  Tell the user it was saved and give the PR link.
- `STATUS.md` is a snapshot: rewrite it each time instead of appending a log. Git history keeps old versions.
- Lasting decisions still go in this file, not in `STATUS.md`.
