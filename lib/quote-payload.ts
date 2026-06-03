export interface QuoteFormInput {
  fullName: string
  email: string
  phone: string
  movingFrom: string
  movingTo: string
  cargoType: string
  weight: string
  message?: string
}

/** Exact JSON body sent to your n8n Webhook node — map these fields in n8n. */
export interface N8nQuotePayload {
  source: 'ceemag-logistics'
  type: 'quote_request'
  submittedAt: string
  contact: {
    fullName: string
    email: string
    phone: string
  }
  shipment: {
    movingFrom: string
    movingTo: string
    cargoType: string
    weightKg: string
    route: string
  }
  message: string
}

export function buildN8nQuotePayload(input: QuoteFormInput): N8nQuotePayload {
  return {
    source: 'ceemag-logistics',
    type: 'quote_request',
    submittedAt: new Date().toISOString(),
    contact: {
      fullName: input.fullName.trim(),
      email: input.email.trim(),
      phone: input.phone.trim(),
    },
    shipment: {
      movingFrom: input.movingFrom,
      movingTo: input.movingTo,
      cargoType: input.cargoType,
      weightKg: input.weight,
      route: `${input.movingFrom} → ${input.movingTo}`,
    },
    message: (input.message ?? '').trim(),
  }
}

export function validateQuoteInput(body: unknown): QuoteFormInput | null {
  if (!body || typeof body !== 'object') return null
  const b = body as Record<string, unknown>
  const str = (k: string) => (typeof b[k] === 'string' ? (b[k] as string).trim() : '')
  const fullName = str('fullName')
  const email = str('email')
  const phone = str('phone')
  const movingFrom = str('movingFrom')
  const movingTo = str('movingTo')
  const cargoType = str('cargoType')
  const weight = str('weight')
  if (!fullName || !email || !phone || !movingFrom || !movingTo || !cargoType || !weight) {
    return null
  }
  if (!email.includes('@')) return null
  return {
    fullName,
    email,
    phone,
    movingFrom,
    movingTo,
    cargoType,
    weight,
    message: str('message'),
  }
}
