# Email 1 — Brevo Template Summary

**Created:** 2026-02-17  
**Task:** LTD Launch Email Sequence — Email 1

---

## Template Details

| Field        | Value                                                              |
|--------------|--------------------------------------------------------------------|
| Template ID  | **66**                                                             |
| Name         | LTD Launch — Email 1 (Day 0)                                       |
| Subject      | We're running a lifetime deal. 100 seats. No renewals, ever.       |
| Preview text | 95 seats available. Pro at $199 or Team at $249 — once.            |
| Sender name  | Sitepins                                                           |
| Sender email | hi@sitepins.com                                                    |
| Status       | **Inactive** (isActive: false)                                     |
| Created at   | 2026-02-17T07:23:16 UTC                                            |

---

## How it was built

- Base template: Brevo template #1 (Sitepins "welcome" — dark-themed, branded HTML)
- Full CSS, header logo, and footer (unsubscribe + copyright) carried over unchanged
- Body copy replaced with Email 1 content from `email-sequence-v1.md`
- CTA button: "Grab your lifetime seat →" → `https://sitepins.com/pricing?utm_source=email&utm_campaign=ltd2026&utm_medium=email&utm_content=email1`
- Subject variant B: `Sitepins forever — one payment, done.` (for A/B testing — set at campaign level)

---

## ⚠️ Status

- Template is **INACTIVE** — safe, not attached to any campaign
- Do NOT send until Tony approves and campaign is configured in Brevo
- Before sending: confirm list selection, set exclude list (buyers), configure A/B subject split

---

## Next Steps

1. Tony reviews template in Brevo (ID 66) — confirm copy looks good
2. Create Email 1 campaign in Brevo, attach template 66
3. Set UTM + A/B subject test (Subject A vs Subject B at 20% each)
4. Schedule or send on campaign launch day
