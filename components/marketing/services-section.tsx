import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { SERVICES } from '@/lib/marketing-data'
import { SectionHeading } from '@/components/marketing/section-heading'
import { MarketingImage } from '@/components/marketing/marketing-image'

export function ServicesSection() {
  return (
    <section id="services" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="What We Do"
          title="WE MAKE SHIPPING EASY."
          description="International courier, freight forwarding, and clearing — the same services listed on ceemag.ca, presented with one coordinator from quote to delivery."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <Link
              key={s.title}
              href="/quote"
              className={`group relative overflow-hidden rounded-2xl bg-[#0a0f14] shadow-xl ${
                i === 0 ? 'md:col-span-2 lg:col-span-2' : ''
              }`}
            >
              <div className={i === 0 ? 'aspect-[21/9]' : 'aspect-[4/3]'}>
                <MarketingImage
                  name={s.imageKey}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes={i === 0 ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#05080c] via-[#05080c]/55 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <h3 className="font-heading text-xl font-bold text-white sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-white/75 sm:text-base">
                  {s.desc}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[#9ae66e]">
                  Get a quote <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
