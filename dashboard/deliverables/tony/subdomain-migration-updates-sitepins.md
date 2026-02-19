# Subdomain Migration: updates.sitepins.com

**Task:** Migrate updates.sitepins.com from Upvoty to sitepins-updates Cloudflare Pages app  
**Date:** 2026-02-19  
**Assignee:** Farhad (guided by Tony)

## What Was Done

### 1. Removed Upvoty Custom Domain
- Disconnected `updates.sitepins.com` from Upvoty dashboard
- Removed CNAME pointing to `sitepins.upvotyfeedback.com`

### 2. Added Custom Domain in Cloudflare Pages
- Added `updates.sitepins.com` to the `sitepins-updates` Cloudflare Pages project
- Target CNAME: `sitepins-updates.pages.dev`

### 3. Updated DNS Manually
- `sitepins.com` DNS is managed in a separate Cloudflare account (not the one we have access to)
- Farhad manually updated the CNAME record:
  - Old: `updates → sitepins.upvotyfeedback.com`
  - New: `updates → sitepins-updates.pages.dev`

### 4. SSL Provisioned
- Cloudflare Pages auto-detected the CNAME change
- SSL certificate provisioned successfully
- Site verified and live

## Result

✅ **Live site:** https://updates.sitepins.com/

The new feedback board + changelog app is now serving on the subdomain, replacing Upvoty completely.

## Notes

- DNS propagation took ~5 minutes
- No downtime observed during the switch
- sitepins.com domain is on a separate Cloudflare account, so all DNS changes required manual intervention
