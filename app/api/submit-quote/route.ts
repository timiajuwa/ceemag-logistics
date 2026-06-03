import { NextRequest, NextResponse } from 'next/server'
import { buildN8nQuotePayload, validateQuoteInput } from '@/lib/quote-payload'

function isPlaceholder(url: string) {
  const v = url.trim().toLowerCase()
  return !v || v.startsWith('your_') || v.includes('example.com')
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const input = validateQuoteInput(body)
  if (!input) {
    return NextResponse.json(
      { error: 'Missing or invalid fields. All required quote fields must be filled.' },
      { status: 400 }
    )
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL?.trim()
  if (!webhookUrl || isPlaceholder(webhookUrl)) {
    return NextResponse.json(
      {
        error:
          'Quote forwarding is not configured. Set N8N_WEBHOOK_URL in Vercel (or .env.local).',
      },
      { status: 503 }
    )
  }

  const payload = buildN8nQuotePayload(input)
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  }

  const authHeader = process.env.N8N_WEBHOOK_AUTH_HEADER?.trim()
  if (authHeader) {
    headers['Authorization'] = authHeader.startsWith('Bearer ')
      ? authHeader
      : `Bearer ${authHeader}`
  }

  const secret = process.env.N8N_WEBHOOK_SECRET?.trim()
  if (secret) {
    headers['X-Webhook-Secret'] = secret
  }

  try {
    const n8nRes = await fetch(webhookUrl, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
      cache: 'no-store',
    })

    if (!n8nRes.ok) {
      const detail = await n8nRes.text().catch(() => '')
      console.error('[submit-quote] n8n error:', n8nRes.status, detail)
      return NextResponse.json(
        { error: 'Could not submit your quote. Please call us or use WhatsApp.' },
        { status: 502 }
      )
    }
  } catch (err) {
    console.error('[submit-quote] n8n fetch error:', err)
    return NextResponse.json(
      { error: 'Could not reach our quote system. Please try again shortly.' },
      { status: 502 }
    )
  }

  return NextResponse.json({ success: true })
}
