# n8n webhook setup (exact steps)

Every quote from **/quote** is sent to your n8n workflow. The site **will not** accept submissions until `N8N_WEBHOOK_URL` is set.

## 1. Create the workflow in n8n

1. Open your n8n instance (cloud or self-hosted).
2. **New workflow** → name it `Ceemag Quote Requests`.
3. Add a **Webhook** node:
   - **HTTP Method:** `POST`
   - **Path:** e.g. `ceemag-quote` (you choose)
   - **Authentication:** None (or Header Auth — see step 4 below)
   - **Respond:** Using *Respond to Webhook* node (add that node at the end)
4. Copy the **Production URL** (looks like):
   ```text
   https://YOUR-INSTANCE.app.n8n.cloud/webhook/ceemag-quote
   ```
   Use **Production**, not Test, once the workflow is **Active**.

5. Add nodes after Webhook (examples):
   - **Gmail** / **Send Email** → notify `info@ceemag.ca` or coordinators
   - **Google Sheets** → append a row
   - **HubSpot** → create contact (map fields from `$json.contact`, `$json.shipment`)
   - **Slack** / **WhatsApp** → alert your team

6. Add **Respond to Webhook** (last node):
   - **Response Code:** `200`
   - **Response Body:** `{ "ok": true }`

7. **Save** → toggle workflow **Active**.

### Import ready-made workflow (optional)

In n8n: **⋯ menu → Import from File** → choose:

`docs/n8n-workflow-ceemag-quote.json`

Then open the Webhook node, copy your URL, and connect email/CRM nodes as you like.

## 2. JSON your workflow receives (exact shape)

```json
{
  "source": "ceemag-logistics",
  "type": "quote_request",
  "submittedAt": "2026-06-02T12:00:00.000Z",
  "contact": {
    "fullName": "Adaeze Okonkwo",
    "email": "you@email.com",
    "phone": "+1 416 555 0100"
  },
  "shipment": {
    "movingFrom": "Canada",
    "movingTo": "Nigeria",
    "cargoType": "Personal effects",
    "weightKg": "50",
    "route": "Canada → Nigeria"
  },
  "message": "Optional notes here"
}
```

In n8n expressions:

| Field | Expression |
|-------|------------|
| Name | `{{ $json.contact.fullName }}` |
| Email | `{{ $json.contact.email }}` |
| Phone | `{{ $json.contact.phone }}` |
| Route | `{{ $json.shipment.route }}` |
| Cargo | `{{ $json.shipment.cargoType }}` |
| Weight | `{{ $json.shipment.weightKg }}` |
| Notes | `{{ $json.message }}` |

## 3. Environment variables

### Local (`.env.local`)

```env
N8N_WEBHOOK_URL=https://YOUR-INSTANCE.app.n8n.cloud/webhook/ceemag-quote
NEXT_PUBLIC_WHATSAPP_NUMBER=19054632764
```

Optional security:

```env
# If n8n Webhook uses Header Auth → paste the full value n8n expects
N8N_WEBHOOK_AUTH_HEADER=Bearer your-token

# Or a shared secret checked in n8n (IF node on header X-Webhook-Secret)
N8N_WEBHOOK_SECRET=your-long-random-secret
```

### Vercel

Project → **Settings** → **Environment Variables**:

| Name | Value |
|------|--------|
| `N8N_WEBHOOK_URL` | Full production webhook URL from n8n |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | `19054632764` (no `+`) |
| `N8N_WEBHOOK_AUTH_HEADER` | Only if you enabled auth on the Webhook node |
| `N8N_WEBHOOK_SECRET` | Optional |

Apply to **Production** (and Preview if you test there) → **Redeploy**.

## 4. Test

```bash
curl -X POST http://localhost:3000/api/submit-quote \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "phone": "+19054632764",
    "movingFrom": "Canada",
    "movingTo": "Nigeria",
    "cargoType": "Personal effects",
    "weight": "25",
    "message": "n8n test"
  }'
```

Expected: `{"success":true}` and a new execution in n8n.

## 5. Troubleshooting

| Problem | Fix |
|---------|-----|
| 503 on submit | `N8N_WEBHOOK_URL` missing or still `your_n8n_webhook_url_here` |
| 502 on submit | Workflow inactive, wrong URL, or n8n returned non-200 |
| Works locally, not on Vercel | Add env vars on Vercel and redeploy |
| n8n Test URL only | Use **Production** webhook URL when workflow is Active |
