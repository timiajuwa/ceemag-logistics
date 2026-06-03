'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { LogoMarkLight } from '@/components/logo-mark'
import Link from 'next/link'

const LOCATIONS = ['Canada', 'Nigeria', 'Caribbean', 'UK', 'USA']
const CARGO_TYPES = [
  'Personal effects',
  'Frozen goods',
  'Commercial goods',
  'Vehicle',
  'Documents',
]

interface FormData {
  fullName: string
  email: string
  phone: string
  movingFrom: string
  movingTo: string
  cargoType: string
  weight: string
  message: string
}

function SuccessState({ name, email }: { name: string; email: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
        <svg className="h-8 w-8 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <div>
        <p className="text-lg font-semibold" style={{ color: '#1a1a1a' }}>
          Thanks {name} — we&apos;ll be in touch within 2 hours.
        </p>
        <p className="mt-1 text-sm text-gray-500">
          Our team has your request and will contact you at {email} within 2 hours.
        </p>
      </div>
    </div>
  )
}

export function QuoteForm() {
  const [form, setForm] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    movingFrom: '',
    movingTo: '',
    cargoType: '',
    weight: '',
    message: '',
  })
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState('')

  const set = (field: keyof FormData) => (value: string) =>
    setForm(prev => ({ ...prev, [field]: value }))

  const selectClass =
    'w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm focus:border-[#c0392b] focus:outline-none focus:ring-1 focus:ring-[#c0392b]'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.movingFrom || !form.movingTo || !form.cargoType) {
      setError('Please fill in all required fields.')
      return
    }

    setSubmitting(true)
    setError('')

    try {
      const res = await fetch('/api/submit-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(
          typeof data.error === 'string' ? data.error : 'Request failed'
        )
      }
      setSubmitted(true)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Something went wrong. Please try again or message us on WhatsApp.'
      )
    } finally {
      setSubmitting(false)
    }
  }

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? '14160000000'
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    'Hi Ceemag Logistics, I\'d like a freight quote.'
  )}`

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#f4f4f4' }}>
      <header className="border-b border-gray-200 bg-white px-6 py-4">
        <div className="mx-auto flex max-w-2xl items-center justify-between">
          <LogoMarkLight />
          <Link href="/" className="text-sm font-medium text-[#c0392b] hover:underline">
            ← Home
          </Link>
        </div>
      </header>

      <main className="mx-auto max-w-2xl px-4 py-8">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold" style={{ color: '#1a1a1a' }}>
              Get a Free Quote
            </CardTitle>
            <CardDescription>
              Same free quote form as ceemag.ca — we respond within 2 hours during business hours.
              Ontario {''}
              <a href="tel:+19054632764" className="text-[#c0392b] hover:underline">
                (905) 463-2764
              </a>
              {' · '}
              Lagos {''}
              <a href="tel:+2348183855480" className="text-[#c0392b] hover:underline">
                +234 818 385 5480
              </a>
            </CardDescription>
          </CardHeader>

          <CardContent>
            {submitted ? (
              <SuccessState name={form.fullName} email={form.email} />
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <Label htmlFor="fullName">
                    Full Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="fullName"
                    placeholder="e.g. Adaeze Okonkwo"
                    value={form.fullName}
                    onChange={e => set('fullName')(e.target.value)}
                    required
                  />
                </div>

                {/* Email + Phone */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="email">
                      Email <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@email.com"
                      value={form.email}
                      onChange={e => set('email')(e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="phone">
                      Phone <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="+1 416 000 0000"
                      value={form.phone}
                      onChange={e => set('phone')(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Moving From + To */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="movingFrom">
                      Moving From <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="movingFrom"
                      value={form.movingFrom}
                      onChange={e => set('movingFrom')(e.target.value)}
                      required
                      className={selectClass}
                    >
                      <option value="" disabled>Select country</option>
                      {LOCATIONS.map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="movingTo">
                      Moving To <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="movingTo"
                      value={form.movingTo}
                      onChange={e => set('movingTo')(e.target.value)}
                      required
                      className={selectClass}
                    >
                      <option value="" disabled>Select country</option>
                      {LOCATIONS.map(l => (
                        <option key={l} value={l}>{l}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Cargo Type + Weight */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <Label htmlFor="cargoType">
                      Cargo Type <span className="text-red-500">*</span>
                    </Label>
                    <select
                      id="cargoType"
                      value={form.cargoType}
                      onChange={e => set('cargoType')(e.target.value)}
                      required
                      className={selectClass}
                    >
                      <option value="" disabled>Select type</option>
                      {CARGO_TYPES.map(t => (
                        <option key={t} value={t}>{t}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="weight">
                      Weight (kg) <span className="text-red-500">*</span>
                    </Label>
                    <Input
                      id="weight"
                      type="number"
                      min="0"
                      placeholder="e.g. 50"
                      value={form.weight}
                      onChange={e => set('weight')(e.target.value)}
                      required
                    />
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <Label htmlFor="message">
                    Message{' '}
                    <span className="font-normal text-gray-400">(optional)</span>
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Special handling notes, pickup address, questions..."
                    rows={3}
                    value={form.message}
                    onChange={e => set('message')(e.target.value)}
                  />
                </div>

                {error && <p className="text-sm text-red-600">{error}</p>}

                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-11 w-full font-semibold text-white"
                  style={{ backgroundColor: submitting ? '#a93226' : '#c0392b' }}
                >
                  {submitting ? 'Sending…' : 'Get My Quote →'}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-3 py-1">
                  <div className="h-px flex-1 bg-gray-200" />
                  <span className="text-xs text-gray-400">or</span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>

                {/* WhatsApp CTA */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex w-full items-center justify-center gap-2.5 rounded-md border border-gray-300 py-2.5 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
                >
                  <svg className="h-5 w-5" style={{ color: '#25D366' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Message us on WhatsApp
                </a>
              </form>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-gray-400">
          Ceemag Logistics &nbsp;·&nbsp; Etobicoke, Ontario &nbsp;·&nbsp; Lagos, Nigeria
        </p>
      </main>
    </div>
  )
}
