import { NextResponse } from 'next/server'

export async function GET() {
  const apiKey = process.env.HUBSPOT_API_KEY

  if (!apiKey || apiKey.startsWith('your_')) {
    return NextResponse.json({ results: [] })
  }

  const params = new URLSearchParams({
    limit: '20',
    properties: 'firstname,lastname,email,phone,hs_lead_status,route_from,route_to,cargo_type,weight',
    sort: '-createdate',
  })

  try {
    const res = await fetch(
      `https://api.hubapi.com/crm/v3/objects/contacts?${params}`,
      {
        headers: { Authorization: `Bearer ${apiKey}` },
        cache: 'no-store',
      }
    )

    if (!res.ok) {
      console.error('[hubspot-contacts] API error:', res.status, await res.text())
      return NextResponse.json({ results: [] })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    console.error('[hubspot-contacts] fetch error:', err)
    return NextResponse.json({ results: [] })
  }
}
