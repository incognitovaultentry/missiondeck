# Seats Counter v1 — Deployment Summary

## What Was Done
Added a live "seats remaining" counter to the Sitepins pricing page, visible only in the **Lifetime** tab above the pricing cards.

**Display:** `⚡ 95 of 100 lifetime seats remaining`
- Styled as a pill badge using the site's primary blue (`#358DF5`)
- Thin progress bar below (5% fill = 5 seats sold)
- Matches existing design system (border, bg opacity, AOS animation)
- Hardcoded at **95** for now — ready to be wired to an API endpoint

## File Changed
- `src/pages/pricing.astro` — 70 lines added (counter HTML + scoped CSS)

## Commit
- **Hash:** `d180216`
- **Branch:** `openclaw`
- **URL:** https://github.com/teamosis/sitepins-website/commit/d180216

## What Farhad Needs to Do to Deploy
1. Review the change on GitHub: https://github.com/teamosis/sitepins-website/compare/main...openclaw
2. Merge `openclaw` → `main` — Vercel auto-deploys on merge
3. Check https://sitepins.com/pricing → click "Lifetime" tab → counter should appear

## Next Step (When Ready)
To make the number live:
- Create an API endpoint (e.g. `/api/seats`) that returns `{ remaining: number }`
- Replace the hardcoded `95` in `pricing.astro` with a fetch call at build time,
  or add a client-side JS fetch with a `data-seats` attribute for runtime updates
