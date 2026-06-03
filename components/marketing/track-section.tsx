'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'
import { TRACKING_LINKS } from '@/lib/marketing-data'
import { SectionHeading } from '@/components/marketing/section-heading'

export function TrackSection() {
  const [trackingId, setTrackingId] = useState('')

  const openTrackTrace = () => {
    if (!trackingId.trim()) return
    window.open(
      `https://www.track-trace.com/aircargo?track=${encodeURIComponent(trackingId.trim())}`,
      '_blank'
    )
  }

  return (
    <section id="track" className="bg-[#f4f6f8] py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm sm:p-10">
          <SectionHeading
            eyebrow="Track Parcel"
            title="Track your shipment"
            description="Use the same tools as ceemag.ca — enter your tracking number on Track-Trace or IAG Cargo."
          />
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <input
              type="text"
              value={trackingId}
              onChange={e => setTrackingId(e.target.value)}
              placeholder="Enter tracking / airway bill number"
              className="h-12 flex-1 rounded-full border border-gray-200 px-5 text-sm outline-none ring-[#c0392b]/20 focus:border-[#c0392b] focus:ring-2"
            />
            <button
              type="button"
              onClick={openTrackTrace}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-[#c0392b] px-8 font-heading text-sm font-semibold text-white hover:bg-[#a93226]"
            >
              <Search className="h-4 w-4" />
              Track on Track-Trace
            </button>
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
            {TRACKING_LINKS.map(link => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl border border-gray-100 bg-gray-50 px-5 py-4 transition-colors hover:border-[#c0392b]/30 hover:bg-white"
              >
                <p className="font-heading font-semibold text-[#0a0f14]">{link.name}</p>
                <p className="mt-0.5 text-sm text-gray-500">{link.desc}</p>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
