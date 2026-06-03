import Link from 'next/link'
import { ArrowRight, MapPin, Phone } from 'lucide-react'
import { COMPANY } from '@/lib/marketing-data'
import { SectionHeading } from '@/components/marketing/section-heading'

export function ContactSection() {
  return (
    <section id="contact" className="bg-[#f4f6f8] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-[#05080c] px-6 py-14 sm:px-12 sm:py-16">
          <div className="lg:grid lg:grid-cols-2 lg:gap-12">
            <div>
              <SectionHeading
                light
                eyebrow="Contact"
                title="Speak with a coordinator"
                description="Tell us what you need moved and when it must arrive. We respond with real options — same team behind ceemag.ca."
              />
              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/quote"
                  className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 font-heading text-sm font-semibold text-[#05080c] hover:bg-white/95"
                >
                  Get a Free Quote
                  <ArrowRight className="h-5 w-5" />
                </Link>
                <a
                  href={`tel:${COMPANY.ontario.tel}`}
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/30 px-8 font-heading text-sm font-semibold text-white hover:bg-white/10"
                >
                  <Phone className="h-4 w-4" />
                  Call Ontario
                </a>
              </div>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:mt-0">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <MapPin className="h-5 w-5 text-[#9ae66e]" />
                <p className="mt-3 font-heading font-semibold text-white">
                  {COMPANY.ontario.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {COMPANY.ontario.address}
                </p>
                <div className="mt-3 space-y-1">
                  <a
                    href={`tel:${COMPANY.ontario.tel}`}
                    className="block text-sm font-medium text-[#9ae66e] hover:underline"
                  >
                    {COMPANY.ontario.phones[0]}
                  </a>
                  {COMPANY.ontario.phones.slice(1).map(ph => (
                    <p key={ph} className="text-sm text-white/50">
                      {ph}
                    </p>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                <MapPin className="h-5 w-5 text-[#9ae66e]" />
                <p className="mt-3 font-heading font-semibold text-white">
                  {COMPANY.lagos.label}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-white/60">
                  {COMPANY.lagos.address}
                </p>
                <div className="mt-3 space-y-1">
                  <a
                    href={`tel:${COMPANY.lagos.tel}`}
                    className="block text-sm font-medium text-[#9ae66e] hover:underline"
                  >
                    {COMPANY.lagos.phones[0]}
                  </a>
                  {COMPANY.lagos.phones.slice(1).map(ph => (
                    <p key={ph} className="text-sm text-white/50">
                      {ph}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
