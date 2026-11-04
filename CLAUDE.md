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
No public access. Sign-in is with Google. Access is enforced by Google: the spreadsheet is shared only with the two Gmail accounts.

## Architecture (decided so far)
- Front-end: a static site hosted on **GitHub Pages**
- Database: **Google Sheets**
- Authentication: **Google Identity Services (OAuth 2.0) in the browser**. The page calls the Google Sheets API
  directly with the signed-in user's access token. No backend and no Apps Script.
  Reason: Google enforces access through sheet sharing, there are no secrets to store, and there is nothing to host.
- The repo is **public**, because GitHub Pages on the Free plan requires it. The code is public; the data is not.

## Security rules
- Never commit secrets, API keys with write power, or OAuth client secrets. The OAuth Client ID is public by design and is fine.
- Never commit real business data, Gmail addresses or the spreadsheet ID. Test and sample data must be made up.
  The spreadsheet ID is entered in the app and stored in the browser (localStorage).
- Keep access tokens in memory only, never in localStorage.
- Keep third-party scripts to a minimum and use a strict Content Security Policy (XSS is the main risk).

## Branding
Graphics and branding assets will be provided later. Until then, use neutral placeholder styling.

## Open decisions
- OAuth scope: `drive.file` (only the app's sheet, no unverified-app warning; preferred) or `spreadsheets` (simpler, all sheets)
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
- Auth approach decided. No code yet. Next: design the sheet structure.
- Before real data goes in: both users must have 2-Step Verification on their Gmail accounts.
