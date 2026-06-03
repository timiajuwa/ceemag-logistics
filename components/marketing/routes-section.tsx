import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { ROUTES } from '@/lib/marketing-data'
import { SectionHeading } from '@/components/marketing/section-heading'
import { MarketingImage } from '@/components/marketing/marketing-image'

export function RoutesSection() {
  return (
    <section id="routes" className="bg-[#05080c] py-20 text-white sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow="Shipping routes"
          title="Where we ship"
          description="The same corridors Ceemag operates today — Canada, Nigeria, the Caribbean, USA, UK, and across Africa."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {ROUTES.map(r => (
            <article
              key={r.title}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-[#0c1218]"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <MarketingImage
                  name={r.imageKey}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] to-transparent" />
                <div className="absolute left-4 top-4 flex items-center gap-2">
                  <span className="rounded-full bg-[#c0392b] px-3 py-1 text-xs font-bold uppercase tracking-wide">
                    {r.tag}
                  </span>
                  <span className="font-heading text-sm text-white/90">
                    {r.countries.join(' ')}
                  </span>
                </div>
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="font-heading text-2xl font-bold">{r.title}</h3>
                <p className="mt-3 leading-relaxed text-white/65">{r.desc}</p>
                <Link
                  href="/quote"
                  className="mt-5 inline-flex items-center gap-1 font-heading text-sm font-semibold text-[#9ae66e] hover:underline"
                >
                  Get a quote for this route <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
