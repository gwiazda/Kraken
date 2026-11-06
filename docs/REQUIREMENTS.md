# Kraken – Requirements

Functional requirements for Kraken, the internal inventory system of Krak Coffee Roastery.
Source: the owner's brief of 2026-11-06 (originally partly in Polish, translated here).
Polish column names from the brief are kept in brackets so they can be matched to the
spreadsheets the owners use today.

Status legend: **[R]** stated requirement · **[P]** Claude's proposal, awaiting confirmation · **[Q]** open question.

---

## 0. General

- **[R] Language:** the whole app is in **English**. When the owners paste Polish text
  (column names, notes, product names), translate it to English for the UI and code.
  Polish proper names stay as they are (for example coffee names on the labels, such as "Gwatemala Espresso").
- **[R] Users:** two owners, signing in with Google (see `CLAUDE.md`).
- **[R] Storage:** all data lives in one Google Sheet (see section 7).

---

## 1. Green coffee inventory

Record every delivery of green (unroasted) coffee and know how much is left.

**[R] Data per green-coffee lot**
- Coffee / lot name (for example "Kenia Kirinyaga")
- Origin: country, region (from the labels: country, region, altitude, process, variety)
- Altitude (m a.s.l.), process (washed / natural / ...), variety
- Supplier: where the coffee was bought from
- Delivery date
- Quantity delivered (kg)
- Price: price per sack and delivery cost (also feeds section 6)

**[P] Computed by the app**
- Green stock left (kg) = delivered − green weight of all roasts of that lot.
- Warn when a lot runs low (threshold set per lot, optional).
- **[P]** Each lot gets a short internal code (for example `KEN-2611`) so roasts and bags can refer to it unambiguously.

---

## 2. Roasted coffee and bag inventory

**[R]** Track how many packed bags we have. Sizes: **250 g** and **1 kg** for now, but other sizes must be possible.

**[P]** Bag sizes are a configurable list (a "Bag sizes" tab), not hard-coded.
**[P]** Packing is recorded as an event: "on <date>, from roast(s) X, packed N bags of size S of coffee C".
**[P]** Bag stock per coffee and size = packed − bags sold or invoiced − other stock-outs (samples, own use, damaged).

- **[Q]** Is every sale covered by an invoice request (section 4), or are there also sales without one
  (for example web shop orders on krakshop.pl, or market sales)? This decides how bag stock goes down.
- **[Q]** Is it enough to track roasted coffee only as packed bags, or do you also want "roasted but not yet packed" stock (kg)?

---

## 3. Roasting log

**[R] Fields** (from the brief):
| English | Polish (original) |
|---|---|
| Coffee (green lot used) | Ziarna |
| Roast date | Data |
| Weight before roasting (g) | Masa przed wypałem (gramy) |
| Weight after roasting (g) | Masa po wypale (gramy) |
| Notes | Uwagi |

**[P] Computed:** roast loss % = (before − after) / before. The average loss per lot feeds the cost calculation (section 6).

**[R] Input:** manual entry **and** import from a file.

### Import from the Aillio Bullet R2 PRO (research, 2026-11-06)
The Bullet is used with Aillio's **RoasTime** software, which stores one **JSON file per roast**.
Locally they are in `~/Library/Application Support/roast-time/roasts/` (macOS) or
`%APPDATA%\roast-time\roasts\` (Windows). Roasts can also be exported as JSON from Roast World.

Known JSON fields (from the community tool `jglogan/roastime-data`) that map to our fields:
| Kraken field | RoasTime JSON field | Notes |
|---|---|---|
| Roast date | `dateTime` | Unix time in **milliseconds** |
| Coffee | `roastName`, `beanId` | `beanId` points to RoasTime's own bean library; the name may need mapping to our lot |
| Weight before (g) | `weightGreen` | grams |
| Weight after (g) | `weightRoasted` | grams; may be empty if not entered in RoasTime |
| Notes | comments field | **name not yet confirmed**, needs a real file |
| (extra, optional) | `roastNumber`, `uid`, `totalRoastTime`, `beanChargeTemperature`, `beanDropTemperature`, `indexFirstCrackStart`, `sampleRate` | `uid` lets us skip duplicates on re-import |

Roast World also offers a **CSV** export (it has a header block with the bean name and green
weight, then a per-second temperature log). It does not appear to contain the roasted weight,
so JSON is the better source.

**[P] Import design**
- Accept one or many RoasTime `.json` files at once (drag and drop).
- Also accept a simple CSV with our five columns, for the existing history.
- Show a preview before saving: for each roast, match it to a green lot (remember the mapping
  RoasTime name → lot for next time), flag missing roasted weight, skip roasts already imported (by `uid`).
- **[Q] Needed:** please send 1–2 real roast files from your RoasTime (and the CSV if you use it),
  so the importer is built against real data, not guesses.

---

## 4. Invoice requests

**[R]** A place where the partner records which invoices the owner needs to issue.

**[R] Fields:** number of bags, sizes, coffees, discount (if relevant), date, and a status showing whether the invoice has been issued.

**[P] Structure**
- One invoice request = header + one or more line items (an order often has several coffees and sizes).
  - Header: date, customer (from the contractor list, section 5), discount, status, notes, created by.
  - Line: coffee, bag size, number of bags, unit price (pre-filled from the price list, editable).
- Status: `To issue` → `Issued` (with the invoice number and date issued). **[Q]** Do you also want `Paid`?
- Totals net / VAT / gross calculated by the app.
- **[P]** The invoice itself is still issued in your invoicing software. Kraken only tracks the request.
  **[Q]** Which software do you use (for example Fakturownia, inFakt, wFirma)? Some have an API, so issuing could be automated later.

---

## 5. Price lists for contractors

**[R]** Per coffee: retail price, and prices with a discount, easy to look up when issuing an invoice.
Flexible enough to generate prices for any discount.

**[P] Proposal**
- **Retail price list:** one row per coffee × bag size, with net and gross price and a
  "valid from" date. The final prices come from the cost calculation (section 6) or are entered by hand.
- **Contractors:** name, tax ID (NIP), contact, and **default discount %**.
- **Price list view (computed, not stored):** pick a contractor (or type any discount %) and see
  the full price list with discounted net and gross prices, ready to copy or print.
- **Discount presets:** a short list (for example 10%, 15%, 20%) as quick buttons. B2B 15% is the current standard.
- **Special prices (optional):** a per-contractor override for a specific coffee and size, for negotiated deals.
- **Price history:** when prices change, the old ones are kept, so past invoice requests still show the price that applied then.
- **[Q]** Is the discount applied to the net or the gross price? Should results be rounded (for example to 0.50 or 1.00 PLN)?

---

## 6. Cost calculation and pricing

**[R]** Calculate what one bag of coffee costs to make, to set the retail price.

**[R] Columns from the brief** (one row per green-coffee delivery or lot):
| # | English | Polish (original) | Input or computed |
|---|---|---|---|
| 1 | Coffee | Ziarna | input (lot) |
| 2 | Delivery date | Data dostawy | input (lot) |
| 3 | Price per sack incl. proportional delivery cost | Cena ziarna za worek + dostawa proporcjonalnie | input |
| 4 | Quantity (kg) | Ilość kg | input |
| 5 | Unit price (per kg green) | Cena jednostkowa | = 3 ÷ 4 |
| 6 | Roast loss (%) | Strata na wypale | input, or average from the roasting log |
| 7 | Roasted weight from 1 kg green | Masa po wypale 1kg | = 1 kg × (1 − 6) |
| 8 | Cost of 1 kg roasted coffee | Koszt 1kg wypalonego ziarna | = 5 ÷ 7 |
| 9 | Cost of 250 g roasted coffee | Koszt wypalenia 250g ziarna | = 8 × 0.25 |
| 10 | 250 g bag (packaging) unit cost | Cena jednostkowa opakowania 250g | input (setting) |
| 11 | Label cost per 250 g bag | Koszt naklejek na opak 250g | input (setting) |
| 12 | Total cost of one 250 g pack | Koszt jednej paczki 250g | = 9 + 10 + 11 |
| 13–18 | Net and gross price at markup 2×, 2.5×, 3× | Cena netto/brutto (2x, 2.5x, 3x) | = 12 × markup; gross = net × (1 + VAT) |
| 19–20 | Final gross price (250 g / 1 kg) | Cena brutto końcowa (250g / 1kg) | input: the price you decide |
| 21–22 | Final net price (250 g / 1 kg) | Cena netto końcowa (250g / 1kg) | = gross ÷ (1 + VAT) |
| 23–24 | B2B 15% price (250 g / 1 kg) | B2b 15% (250g / 1kg) | = final price × 0.85 |

**[P] Make it flexible**
- Packaging, labels, VAT rate and markups (2×, 2.5×, 3×) are **settings**, not fixed columns, so they can change.
- Calculate for **every bag size** in the size list, not only 250 g and 1 kg (packaging and label cost per size).
- Optionally include other costs per kg: roasting energy, gas, overhead.
- Final prices chosen here become the **retail price list** in section 5 (one source of truth).

**[Q] Questions**
- What are the packaging and label costs for **1 kg** bags? The brief lists them only for 250 g.
- Does "Koszt wypalenia 250g ziarna" mean only the bean cost of 250 g roasted coffee, or should it include roasting costs (energy)?
- VAT rate to use for coffee? It will be a setting either way.
- Is the B2B price 15% off the net or the gross price?

---

## 7. Data storage and schema changes (Google Sheets)

**[R]** Everything is stored in a Google Sheet. Requirements will change over time, and **no data may ever be lost** during a schema change.

**[P] Design**
- **One tab per kind of record** (Lots, Roasts, Packing, Bag sizes, Contractors, Prices,
  Invoice requests, Invoice lines, Settings), with row 1 as column headers.
- **The app reads columns by header name, not by position.** Adding or reordering columns never breaks anything.
- **Every row has a permanent ID** plus `created_at`, `updated_at` and `created_by`.
- **Only inputs are stored.** Stock levels, costs and discounted prices are calculated by the app,
  so changing a formula needs no data migration.
- **No hard deletes:** rows get a `deleted` flag instead, so a mistake can be undone.
- **Versioned migrations:** a `_meta` tab holds the schema version. When a new app version needs
  a different structure, the app (1) makes a **full copy of the spreadsheet** in Google Drive as a backup,
  (2) runs the migration, (3) checks that row counts still match, and only then (4) updates the version.
  Migrations only add or rename columns. Old columns are kept until you confirm they can go.
- **Why not a new file for each version:** a new file gets a new ID and needs re-sharing, and data
  could be split across files. Updating in place with a backup copy first is safer.
- Google Sheets' own **version history** is an extra safety net.
- **[P]** You can still open and read the sheet directly. Editing it by hand is possible, but the app is the preferred way.
