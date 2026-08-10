# Integration vendor logos

Used on the homepage integrations wall (`components/home-v2.tsx` → `LOGO_FILES`).

These are the trademarks of their respective owners. They appear here to identify
the products Vadal.ai connects to — nominative use, the same basis every
integrations directory relies on. They do not imply endorsement or partnership.

## Provenance

| Source | Files |
|---|---|
| The vendor's own website | workday, icims, onelogin, greenhouse, moodle, peoplestrong, salesforce, slack, smartrecruiters |
| Wikimedia Commons (free-licence only: PD-textlogo, CC0, public domain) | adp, cornerstone, docebo, google-workspace, hubspot, microsoft-entra-id, microsoft-teams, okta, oracle, outlook, power-bi, sap, ukg, whatsapp |

Wikimedia Commons hosts only freely-licensed files, which is why it was preferred
over vendor press kits where both existed.

## Verify before adding

Every file here was rendered and inspected by eye before being committed. Do not
skip that step — searching for logos by name returns confident, wrong results.
Real examples from building this set:

- `"ADP"` → **Groupe ADP**, the Paris airports operator
- `"UKG Kronos"` → the **Kronos** mark, retired when Kronos and Ultimate Software
  merged into UKG in 2020
- `"Tableau"` → an **Ionicons** icon-font glyph, not the company's logo
- `"Microsoft Teams"` → **Microsoft Exchange**

## Not represented

- **Darwinbox, Ramco, Lever** — publish only their customers' logos, not their own
- **Microsoft Dynamics 365, Tableau** — absent from Commons; their own sites refuse
  automated requests (HTTP 403)
- **Looker** — the only Commons file is CC BY-SA 4.0, which carries attribution and
  share-alike obligations that do not suit a logo on a commercial page

These fall through to the monochrome glyph in `lib/brand-marks.ts`, then to a
monogram. Dropping a file in here and adding it to `LOGO_FILES` takes over
automatically.

## Sub-products

SAP SuccessFactors and SAP Payroll use the SAP mark; Oracle HCM and Oracle ERP use
the Oracle mark. Accurate — they are SAP and Oracle products — but it does mean the
wall shows the SAP mark three times.
