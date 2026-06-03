import type { Viewport } from 'next'
import { DashboardClient } from '@/components/dashboard-client'

export const metadata = {
  title: 'Operations — Ceemag Logistics',
}

export const viewport: Viewport = {
  width: 1400,
  initialScale: 1,
}

export default function DashboardPage() {
  return <DashboardClient />
}
