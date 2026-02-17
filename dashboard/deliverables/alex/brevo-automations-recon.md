# Brevo Automations — API Recon Report
**Date:** 2026-02-17  
**Account:** Sitepins (hi@sitepins.com)  
**Plan:** Starter Marketing (paid/active)  
**MA Status:** Enabled (key present)

---

## TL;DR

**Brevo has NO automation management API.** You cannot list, create, pause, or inspect automations via the v3 REST API. The automation workflow builder is 100% UI-only.

However, **you CAN trigger automation workflows indirectly** via 3 mechanisms: posting events, updating contact attributes, and adding/removing contacts from lists.

For Alex's 3-email LTD sequence, the **direct email campaign approach** (no automation needed) is simpler and gives full API control.

---

## 1. Endpoints Tested

| Endpoint | HTTP Status | Result |
|----------|-------------|--------|
| GET /automations | 404 | `"Invalid route/ method passed"` |
| GET /workflows | 404 | `"Invalid route/ method passed"` |
| GET /automation/triggers | 404 | `"Invalid route/ method passed"` |
| GET /automation/workflows | 404 | `"Invalid route/ method passed"` |
| GET /marketing/automation | 404 | `"Invalid route/ method passed"` |
| GET /marketing/workflows | 404 | `"Invalid route/ method passed"` |
| POST /trackEvent | 404 | `"Invalid route/ method passed"` |
| POST /track/events | 404 | `"Invalid route/ method passed"` |
| **POST /events** | **204** | **✅ Working — event tracking for contacts** |
| GET /emailCampaigns?type=trigger | 200 | Returns 0 campaigns (none set up) |
| GET /emailCampaigns?type=automation | 400 | Type invalid |

---

## 2. Official API Coverage (Python Library)

The official `brevo-python` library (v1.2.0, complete API coverage) has **no AutomationApi class**.

Full class list: AccountApi, BalanceApi, CompaniesApi, ContactsApi, ConversationsApi, CouponsApi, CustomObjectsApi, DealsApi, DomainsApi, EcommerceApi, **EmailCampaignsApi**, **EventsApi**, ExternalFeedsApi, FilesApi, InboundParsingApi, MasterAccountApi, NotesApi, PaymentsApi, ProcessApi, ProgramApi, RewardApi, SMSCampaignsApi, SendersApi, TasksApi, TierApi, **TransactionalEmailsApi**, TransactionalSMSApi, TransactionalWhatsAppApi, UserApi, **WebhooksApi**, WhatsAppCampaignsApi.

**Notable absence: No AutomationApi, WorkflowsApi, or any automation management class.**

---

## 3. Capability Table

| Action | Possible via API | Notes |
|--------|-----------------|-------|
| **List existing automations** | ❌ No | UI-only. Cannot enumerate workflows via API |
| **Create new automation** | ❌ No | Workflow builder is UI-only |
| **Edit automation steps** | ❌ No | UI-only |
| **Pause automation** | ❌ No | No endpoint exists |
| **Resume automation** | ❌ No | No endpoint exists |
| **Delete automation** | ❌ No | No endpoint exists |
| **Get automation stats** | ❌ No | No direct stats endpoint for workflows |
| **Enroll contact into automation** | ⚠️ Indirect | Via events, attribute changes, or list adds |
| **Trigger event-based automation** | ✅ Yes | `POST /events` — fires named event for a contact |
| **Trigger attribute-based automation** | ✅ Yes | `PUT /contacts/{identifier}` — update contact attributes |
| **Trigger list-based automation** | ✅ Yes | `POST /contacts/lists/{listId}/contacts/add` |
| **Send email via template** | ✅ Yes | `POST /smtp/email` — transactional, 1:1 |
| **Send bulk email campaign** | ✅ Yes | `POST /emailCampaigns` → `POST /emailCampaigns/{id}/sendNow` |
| **Schedule email campaign** | ✅ Yes | `POST /emailCampaigns` with `scheduledAt` param |
| **Read campaign stats** | ✅ Yes | `GET /emailCampaigns/{campaignId}` includes opens/clicks/etc |
| **Webhooks for automation events** | ✅ Yes | `POST /webhooks` — receive events like `unsubscribed` |
| **Update contact attributes** | ✅ Yes | `PUT /contacts/{identifier}` — triggers automations if configured |
| **Add/remove from lists** | ✅ Yes | Triggers list-enrollment automations if configured |

---

## 4. How to Indirectly Trigger Automations

If automations are built in the Brevo UI with these trigger types, they can be fired via API:

### Method A: Event Trigger (POST /events)
```bash
POST https://api.brevo.com/v3/events
Headers: api-key: <KEY>

{
  "event_name": "upgraded_to_paid",
  "identifiers": {"email_id": "user@example.com"},
  "contact_properties": {"PURCHASED_PLAN_NAME": "Pro LTD"},
  "event_properties": {"plan": "pro_ltd", "price": 199}
}
```
- Returns 204 on success
- `event_name` must match what's configured in the workflow trigger
- Can also update contact attributes in the same call

### Method B: Attribute Change Trigger
```bash
PUT https://api.brevo.com/v3/contacts/user@example.com
{
  "attributes": {"PURCHASED_DATE": "2026-02-17", "PURCHASED_PLAN_NAME": "Pro LTD"}
}
```
- If a workflow is triggered by an attribute having a specific value, changing it via API fires the automation

### Method C: List-Based Trigger
```bash
POST https://api.brevo.com/v3/contacts/lists/{listId}/contacts/add
{
  "emails": ["user@example.com"]
}
```
- Moving a contact into a specific list can trigger a list-enrollment automation

---

## 5. Existing Automations in Sitepins Account

**Cannot determine via API.** The `/automations` and all variant paths return 404.

To see existing automations: Log in to https://app.brevo.com → Automation tab.

What I can confirm from the account:
- Marketing Automation is enabled (`marketingAutomation.enabled: true`)
- MA key exists: `z4eglhsggznb9u6m06bt4adz` (used by JS tracker, not REST API)
- No "trigger" type email campaigns are currently active (API confirmed 0 results)
- Templates exist: welcome_copy, Organization Member emails, Password Reset, etc.

---

## 6. Account Context

```json
{
  "plan": "Starter Marketing (paid, active)",
  "contacts": 726 in Free Users list,
  "lists": {
    "10": "Free Users (726 subscribers)",
    "12": "Lifetime Paid Users (10 subscribers)",
    "8":  "Paid Users (3 subscribers)"
  },
  "marketingAutomation": {"enabled": true}
}
```

---

## 7. Recommended Strategy for Alex's 3-Email LTD Sequence

Since automation management is UI-only, the **cleanest fully-API approach** is to skip automations entirely and use **direct email campaigns**:

```
Email 1 (Day 0)  → POST /emailCampaigns (to list 10, sendNow)
Email 2 (Day 5)  → POST /emailCampaigns (to list 10, scheduledAt: Day 5)
Email 3 (Final)  → POST /emailCampaigns (to list 10, manual trigger when seats < 10)
```

**Advantages over automation:**
- Full API control — no UI required
- Can read stats per campaign (`GET /emailCampaigns/{id}`)
- Can schedule in advance or fire manually
- Works with existing Starter plan

**If using Brevo automations (UI setup required):**
- Build a 3-step email workflow in the Brevo UI triggered by an event (e.g., `ltd_campaign_launch`)
- Alex fires the event via `POST /events` for all 726 free users
- Brevo handles the delay/sequencing internally
- Stats only visible in UI, not via API

---

## 8. What's NOT Possible (UI-Only Features)

- Visual automation workflow builder
- A/B testing within automations
- Conditional branching based on contact behavior (open/click tracking within automations)
- Per-automation performance dashboard
- Listing/auditing active automations programmatically
- Removing a contact from an active automation mid-flow
- Any automation template management

---

*Recon completed: 2026-02-17. No changes made to account, no emails sent, no automations modified.*
