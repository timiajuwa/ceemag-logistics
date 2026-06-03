'use client'

import { Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/marketing-data'

function TestimonialCard({
  quote,
  name,
  initials,
}: {
  quote: string
  name: string
  initials: string
}) {
  return (
    <article className="mx-3 w-[min(100vw-2rem,380px)] flex-shrink-0 rounded-2xl border border-[#9ae66e]/25 bg-black/45 p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-start justify-between gap-3">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
          ))}
        </div>
        <span className="rounded-md bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/50">
          Client review
        </span>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-white/90">&ldquo;{quote}&rdquo;</p>
      <div className="mt-5 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#9ae66e] text-sm font-bold text-[#05080c]">
          {initials}
        </div>
        <p className="font-heading font-semibold text-white">{name}</p>
      </div>
    </article>
  )
}

export function TestimonialsMarquee() {
  const items = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <div id="testimonials" className="relative mt-14 overflow-hidden pb-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#05080c] to-transparent sm:w-24" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#05080c] to-transparent sm:w-24" />
      <div className="flex w-max animate-marquee">
        {items.map((t, i) => (
          <TestimonialCard key={`${t.name}-${i}`} {...t} />
        ))}
      </div>
    </div>
  )
}
