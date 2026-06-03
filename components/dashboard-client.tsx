'use client'

import { useEffect, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

// ─── Types ────────────────────────────────────────────────────────────────────

type ShipmentStatus = 'In Transit' | 'Customs' | 'Delivered' | 'Delayed' | 'New Quote'

interface Shipment {
  id: string
  name: string
  route: string
  mode: string
  weight: string
  carrier: string
  status: ShipmentStatus
  isNew?: boolean
}

interface HubContact {
  id: string
  properties: {
    firstname?: string
    lastname?: string
    email?: string
    phone?: string
    route_from?: string
    route_to?: string
    cargo_type?: string
    weight?: string
    hs_lead_status?: string
  }
  createdAt: string
  isNew?: boolean
}

// ─── Static seed data ─────────────────────────────────────────────────────────

const SEED_SHIPMENTS: Shipment[] = [
  { id: 'CMG-2406-041', name: 'Adaeze Okonkwo',   route: 'Canada → Nigeria',    mode: 'Air', weight: '18 kg',       carrier: 'DHL',   status: 'In Transit' },
  { id: 'CMG-2406-039', name: 'Emeka Nwosu',      route: 'Canada → Nigeria',    mode: 'Sea', weight: '210 kg',      carrier: 'FedEx', status: 'Customs'    },
  { id: 'CMG-2406-036', name: 'Fatima Al-Hassan', route: 'Nigeria → UK',        mode: 'Air', weight: '9 kg',        carrier: 'UPS',   status: 'Delivered'  },
  { id: 'CMG-2406-034', name: 'Marcus Baptiste',  route: 'Canada → Caribbean',  mode: 'Sea', weight: '85 kg',       carrier: 'FedEx', status: 'In Transit' },
  { id: 'CMG-2406-031', name: 'Chisom Eze',       route: 'Canada → Nigeria',    mode: 'Air', weight: '32 kg frozen',carrier: 'DHL',   status: 'Delayed'    },
]

function makeSeedContacts(): HubContact[] {
  const now = Date.now()
  return [
    {
      id: 'seed-1',
      properties: { firstname: 'Adaeze', lastname: 'Johnson',  email: 'adaeze.j@gmail.com',    route_from: 'Canada',  route_to: 'Nigeria',    cargo_type: 'Personal effects',  weight: '45' },
      createdAt: new Date(now - 2 * 60 * 1000).toISOString(),
    },
    {
      id: 'seed-2',
      properties: { firstname: 'Kwame',  lastname: 'Mensah',   email: 'k.mensah@hotmail.com',  route_from: 'Nigeria', route_to: 'Canada',     cargo_type: 'Commercial goods',  weight: '120' },
      createdAt: new Date(now - 18 * 60 * 1000).toISOString(),
    },
    {
      id: 'seed-3',
      properties: { firstname: 'Keisha', lastname: 'Baptiste', email: 'keisha.b@yahoo.com',    route_from: 'Canada',  route_to: 'Caribbean',  cargo_type: 'Personal effects',  weight: '60' },
      createdAt: new Date(now - 55 * 60 * 1000).toISOString(),
    },
    {
      id: 'seed-4',
      properties: { firstname: 'Priya',  lastname: 'Okafor',   email: 'priya.okafor@gmail.com',route_from: 'Canada',  route_to: 'Nigeria',    cargo_type: 'Frozen goods',      weight: '30' },
      createdAt: new Date(now - 3 * 60 * 60 * 1000).toISOString(),
    },
  ]
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

const AVATAR_COLORS = [
  'bg-violet-500', 'bg-blue-500', 'bg-emerald-500',
  'bg-amber-500',  'bg-rose-500', 'bg-cyan-500',
  'bg-indigo-500', 'bg-pink-500',
]

function avatarColor(name: string) {
  const hash = name.split('').reduce((a, c) => a + c.charCodeAt(0), 0)
  return AVATAR_COLORS[hash % AVATAR_COLORS.length]
}

function initials(first?: string, last?: string) {
  return `${(first?.[0] ?? '').toUpperCase()}${(last?.[0] ?? '').toUpperCase()}`
}

function fullName(c: HubContact) {
  return [c.properties.firstname, c.properties.lastname].filter(Boolean).join(' ') || 'Unknown'
}

function timeAgo(iso: string) {
  const secs = Math.floor((Date.now() - new Date(iso).getTime()) / 1000)
  if (secs < 60)   return 'just now'
  if (secs < 3600) return `${Math.floor(secs / 60)} min ago`
  if (secs < 86400) return `${Math.floor(secs / 3600)} hr ago`
  return `${Math.floor(secs / 86400)}d ago`
}

function daysUntil(dateStr: string) {
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86_400_000)
}

function statusBadge(status: ShipmentStatus) {
  const map: Record<ShipmentStatus, string> = {
    'In Transit': 'bg-amber-100 text-amber-700 border-amber-200',
    'Customs':    'bg-blue-100 text-blue-700 border-blue-200',
    'Delivered':  'bg-green-100 text-green-700 border-green-200',
    'Delayed':    'bg-red-100 text-red-700 border-red-200',
    'New Quote':  'bg-purple-100 text-purple-700 border-purple-200',
  }
  return map[status] ?? ''
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function LogoMark({ sub }: { sub: string }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-sm"
        style={{ backgroundColor: '#c0392b' }}
      >
        <span className="text-xs font-bold tracking-widest text-white">CL</span>
      </div>
      <div>
        <p className="text-sm font-bold leading-tight text-white">Ceemag Operations</p>
        <p className="text-xs leading-tight text-gray-400">{sub}</p>
      </div>
    </div>
  )
}

function MetricCard({ label, value, note }: { label: string; value: number; note?: string }) {
  return (
    <Card className="flex-1">
      <CardContent className="pt-4">
        <p className="text-xs font-medium uppercase tracking-wide text-gray-500">{label}</p>
        <p className="mt-1 text-3xl font-bold" style={{ color: '#1a1a1a' }}>{value}</p>
        {note && <p className="mt-1 text-xs text-gray-400">{note}</p>}
      </CardContent>
    </Card>
  )
}

function ShipmentRow({ s }: { s: Shipment }) {
  return (
    <div
      className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-gray-50 ${s.isNew ? 'animate-slide-in' : ''}`}
    >
      <span className="w-28 font-mono text-xs text-gray-500">{s.id}</span>
      <span className="w-36 truncate font-medium text-gray-800">{s.name}</span>
      <span className="flex-1 text-xs text-gray-500">{s.route}</span>
      <span className="w-8 text-xs text-gray-400">{s.mode}</span>
      <span className="w-20 text-xs text-gray-500">{s.weight}</span>
      <span className="w-12 text-xs text-gray-400">{s.carrier}</span>
      <Badge className={`text-xs ${statusBadge(s.status)}`}>{s.status}</Badge>
    </div>
  )
}

function ContactCard({ c }: { c: HubContact }) {
  const name = fullName(c)
  const initStr = initials(c.properties.firstname, c.properties.lastname)
  const route =
    c.properties.route_from && c.properties.route_to
      ? `${c.properties.route_from} → ${c.properties.route_to}`
      : null

  return (
    <div className={`flex items-start gap-3 rounded-lg border border-gray-100 p-3 ${c.isNew ? 'animate-slide-in' : ''}`}>
      <div className={`flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold text-white ${avatarColor(name)}`}>
        {initStr || '?'}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <span className="truncate text-sm font-medium text-gray-800">{name}</span>
          <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">New</Badge>
        </div>
        <p className="truncate text-xs text-gray-400">{c.properties.email}</p>
        {route && (
          <p className="mt-0.5 text-xs text-gray-500">{route}</p>
        )}
        <div className="mt-1 flex items-center gap-2">
          <span className="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-500">via Ceemag form</span>
          <span className="text-xs text-gray-400">{timeAgo(c.createdAt)}</span>
        </div>
      </div>
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DashboardClient() {
  const [pendingCount, setPendingCount] = useState(11)
  const [shipments, setShipments] = useState<Shipment[]>(SEED_SHIPMENTS)
  const [contacts, setContacts] = useState<HubContact[]>(() => makeSeedContacts())
  const [syncSeconds, setSyncSeconds] = useState(0)

  const seenIdsRef = useRef<Set<string>>(new Set(['seed-1', 'seed-2', 'seed-3', 'seed-4']))
  const initializedRef = useRef(false)

  // Count up seconds from page load (for "synced Xm ago")
  useEffect(() => {
    const t = setInterval(() => setSyncSeconds(s => s + 1), 1000)
    return () => clearInterval(t)
  }, [])

  // Poll HubSpot every 8 seconds
  useEffect(() => {
    const poll = async () => {
      try {
        const res = await fetch('/api/hubspot-contacts')
        const data = await res.json()
        const fetched: HubContact[] = data.results ?? []

        if (!initializedRef.current) {
          // First load — mark all as seen, merge into list without animation
          fetched.forEach(c => seenIdsRef.current.add(c.id))
          if (fetched.length > 0) {
            setContacts(prev => [...fetched, ...prev])
          }
          initializedRef.current = true
          return
        }

        // Subsequent polls — only process genuinely new contacts
        const newOnes = fetched.filter(c => !seenIdsRef.current.has(c.id))
        if (newOnes.length === 0) return

        newOnes.forEach(c => seenIdsRef.current.add(c.id))
        setPendingCount(p => p + newOnes.length)

        // Animate new contacts into the Quote Requests panel
        setContacts(prev => [
          ...newOnes.map(c => ({ ...c, isNew: true })),
          ...prev,
        ])

        // Prepend new rows to Shipment Pipeline
        const newShipmentId = () =>
          `CMG-${new Date().toISOString().slice(2, 7).replace('-', '')}-${Math.floor(Math.random() * 900 + 100)}`

        setShipments(prev => [
          ...newOnes.map(c => ({
            id: newShipmentId(),
            name: fullName(c),
            route:
              c.properties.route_from && c.properties.route_to
                ? `${c.properties.route_from} → ${c.properties.route_to}`
                : 'Route TBD',
            mode: 'Air',
            weight: c.properties.weight ? `${c.properties.weight} kg` : 'TBD',
            carrier: 'TBD',
            status: 'New Quote' as ShipmentStatus,
            isNew: true,
          })),
          ...prev,
        ])
      } catch {
        // fail silently — dashboard stays functional
      }
    }

    poll()
    const interval = setInterval(poll, 8000)
    return () => clearInterval(interval)
  }, [])

  const syncDisplay =
    syncSeconds < 60 ? 'just now' : `${Math.floor(syncSeconds / 60)}m ago`

  const cutoffDate = '2026-06-05'
  const daysToCloseCutoff = daysUntil(cutoffDate)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Header ── */}
      <header
        className="flex items-center justify-between px-6 py-3.5"
        style={{ backgroundColor: '#1a1a1a' }}
      >
        <LogoMark sub="Etobicoke · Lagos" />

        <div className="flex items-center gap-2 rounded-full bg-amber-500/20 px-3 py-1.5">
          <span className="text-xs font-medium text-amber-400">
            Next flight cutoff: June 5 —{' '}
            <span className="font-bold">{daysToCloseCutoff} day{daysToCloseCutoff !== 1 ? 's' : ''}</span>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="pulse-dot h-2 w-2 rounded-full bg-green-400"
          />
          <span className="text-sm font-medium text-white">Live</span>
          <span className="text-xs text-gray-400">Etobicoke online · Lagos online</span>
        </div>
      </header>

      <div className="px-6 py-6 space-y-6">
        {/* ── Metric Cards ── */}
        <div className="flex gap-4">
          <MetricCard label="Active Shipments"   value={34}           note="across all carriers" />
          <MetricCard label="Quotes Pending"      value={pendingCount} note="awaiting response" />
          <MetricCard label="Customs Clearing"   value={7}            note="Lagos port" />
          <MetricCard label="Delivered This Month" value={58}         note="June 2026" />
        </div>

        {/* ── Two-column layout ── */}
        <div className="grid grid-cols-2 gap-4">
          {/* LEFT: Shipment Pipeline */}
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">
                Shipment Pipeline
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-2">
              {/* Column headers */}
              <div className="flex items-center gap-3 px-3 py-1.5 text-xs font-medium uppercase tracking-wide text-gray-400">
                <span className="w-28">ID</span>
                <span className="w-36">Customer</span>
                <span className="flex-1">Route</span>
                <span className="w-8">Mode</span>
                <span className="w-20">Weight</span>
                <span className="w-12">Carrier</span>
                <span className="w-20">Status</span>
              </div>
              <Separator className="mb-1" />
              <div className="space-y-0.5">
                {shipments.map((s, i) => (
                  <ShipmentRow key={`${s.id}-${i}`} s={s} />
                ))}
              </div>
            </CardContent>
          </Card>

          {/* RIGHT: Quote Requests */}
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">
                Quote Requests
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-3">
              <div className="space-y-2">
                {contacts.map((c, i) => (
                  <ContactCard key={`${c.id}-${i}`} c={c} />
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* ── Bottom row ── */}
        <div className="grid grid-cols-2 gap-4">
          {/* Upcoming Flights */}
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">
                Upcoming Flights
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {/* Flight 1 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">June 5, 2026</p>
                  <p className="text-xs text-gray-500">Canada → Nigeria · Air</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{daysToCloseCutoff}d to cutoff</span>
                  <Badge className="bg-amber-100 text-amber-700 border-amber-200 text-xs">Filling</Badge>
                </div>
              </div>

              <Separator />

              {/* Flight 2 */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-800">June 19, 2026</p>
                  <p className="text-xs text-gray-500">Canada → Nigeria · Air</p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-gray-500">{daysUntil('2026-06-19')}d out</span>
                  <Badge className="bg-blue-100 text-blue-700 border-blue-200 text-xs">Open</Badge>
                </div>
              </div>

              <Separator />

              <p className="text-xs text-gray-400">
                Automated cutoff reminders sent to 6 customers awaiting June 5 flight.
              </p>
            </CardContent>
          </Card>

          {/* Carrier Status */}
          <Card>
            <CardHeader className="border-b pb-3">
              <CardTitle className="text-sm font-semibold text-gray-700">
                Carrier Status
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4 space-y-3">
              {[
                { name: 'DHL',   active: 14 },
                { name: 'UPS',   active: 9  },
                { name: 'FedEx', active: 11 },
              ].map(carrier => (
                <div key={carrier.name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-12 text-sm font-semibold text-gray-800">{carrier.name}</span>
                    <Badge className="bg-green-100 text-green-700 border-green-200 text-xs">Live</Badge>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-gray-600">{carrier.active} active shipments</span>
                    <p className="text-xs text-gray-400">synced {syncDisplay}</p>
                  </div>
                </div>
              ))}

              <Separator />

              <p className="text-xs text-gray-400">
                No delays flagged · Customs queue normal · Lagos port clear
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
