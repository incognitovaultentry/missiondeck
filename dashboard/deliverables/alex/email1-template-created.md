# Email 1 Campaign — Created in Brevo
*Created: 2026-02-17*

## Summary

| Field | Value |
|-------|-------|
| **Campaign ID** | 64 |
| **Name** | Sitepins LTD Launch — Email 1 |
| **Status** | `draft` ✅ |
| **Scheduled** | Not scheduled |
| **Created at** | 2026-02-17T12:14:54.000+06:00 |

## Campaign Details

| Field | Value |
|-------|-------|
| **Subject** | We're running a lifetime deal. 100 seats. No renewals, ever. |
| **Preview text** | 95 seats available. Pro at $199 or Team at $249 — once. |
| **Sender name** | Sitepins |
| **Sender email** | hi@sitepins.com |
| **Reply-to** | hi@sitepins.com |
| **Recipient list** | List ID 10 (Free Users — 726 contacts) |
| **Exclusion list** | List ID 12 (Lifetime Paid Users) |

## Brevo Dashboard Link

https://app.brevo.com/campaigns/email/64/edit

## Notes

- Status confirmed as `draft` via GET /emailCampaigns/64
- NOT scheduled, NOT sent — safe to review before launch
- CTA links include UTM: `?utm_source=email&utm_campaign=ltd2026&utm_content=email1`
- Unsubscribe link uses Brevo `{{ unsubscribe }}` variable (auto-replaced at send time)
- To send: go to Brevo dashboard, review, then schedule or send manually
