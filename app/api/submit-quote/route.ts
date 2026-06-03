import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const body = await req.json()

  const webhookUrl = process.env.N8N_WEBHOOK_URL
  if (webhookUrl && !webhookUrl.startsWith('your_')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (err) {
      console.error('[submit-quote] webhook error:', err)
    }
  }

  return NextResponse.json({ success: true })
}
