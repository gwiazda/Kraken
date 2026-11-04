# Kraken

Internal management system for **Krak Coffee Roastery**. Kraken is the app name.

## Purpose
Track the roastery's operations:
- Green (unroasted) coffee bean inventory: what is in stock and how much
- Roasting: how much has been roasted, from which beans
- Sales: what has been sold
- Invoices: invoices still to be issued, and their status

## Users
Internal only. Exactly two users: the owner and their business partner, both on Gmail accounts.
No public access. Sign-in is with Google, and only an explicit allowlist of the two Gmail addresses gets in.

## Architecture (decided so far)
- Front-end: a static site hosted on **GitHub Pages**
- Database: **Google Sheets**
- Authentication: Google sign-in. Details are not decided yet (see Open decisions).
- A static site cannot hold secrets. Never commit API keys, client secrets or private sheet data to this repo.
  An OAuth client ID is public by design and is fine to commit.

## Branding
Graphics and branding assets will be provided later. Until then, use neutral placeholder styling.

## Open decisions
- Auth and data-access approach: Google OAuth in the browser with direct Sheets API access, or Google Apps Script as the API layer
- Sheet structure (tabs and columns) for beans, roasts, sales and invoices
- Front-end stack (plain HTML/JS or a framework built to static files)

## Rules for Claude
- **Keep this file up to date yourself, without being asked.** After any change that affects
  architecture, data model, commands, conventions, decisions or project status, update the
  relevant section of this file in the same commit. The user should never have to remind you.
- Record decisions in this file when they are made, with a one-line reason.
- Keep this file concise. Replace outdated information instead of appending to it.
- Ask before changing how data is read from or written to Google Sheets, or how authentication works.
- Commit and push work regularly. Sessions are temporary and unpushed work is lost.

## Status
- Repository created with CLAUDE.md and README. No code yet. Next: decide the auth approach.
