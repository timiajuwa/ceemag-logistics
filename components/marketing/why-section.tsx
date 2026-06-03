import { Clock, Headphones, Zap } from 'lucide-react'
import { COMPANY, CORRIDORS, WHY_ITEMS } from '@/lib/marketing-data'
import { SectionHeading } from '@/components/marketing/section-heading'

const PILLARS = [
  { icon: Zap, title: WHY_ITEMS[0].title, desc: WHY_ITEMS[0].desc },
  { icon: Headphones, title: WHY_ITEMS[1].title, desc: WHY_ITEMS[1].desc },
  { icon: Clock, title: WHY_ITEMS[2].title, desc: WHY_ITEMS[2].desc },
]

export function WhySection() {
  return (
    <section id="why" className="bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-16 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHeading
              eyebrow="Why Ceemag"
              title="A trial will convince you"
              description="We are an international courier, freight forwarder, and clearing agent in Canada and Africa — with the experience to stand out from our contemporaries."
            />
            <div className="mt-10 space-y-8">
              {PILLARS.map(p => {
                const Icon = p.icon
                return (
                  <div key={p.title} className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-[#c0392b] text-white">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg font-semibold text-[#0a0f14]">
                        {p.title}
                      </h3>
                      <p className="mt-1 text-gray-600">{p.desc}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-[#f8f9fb] p-8">
            <p className="font-heading text-sm font-semibold uppercase tracking-wider text-[#c0392b]">
              Corridors &amp; specialties
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {CORRIDORS.map(c => (
                <li
                  key={c}
                  className="rounded-lg border border-gray-100 bg-white px-4 py-3 text-sm font-medium text-gray-800"
                >
                  {c}
                </li>
              ))}
            </ul>
            <div className="mt-8 space-y-4 border-t border-gray-200 pt-8 text-sm text-gray-600">
              <div>
                <p className="font-semibold text-[#0a0f14]">{COMPANY.ontario.label}</p>
                <p className="mt-1">{COMPANY.ontario.address}</p>
                <a
                  href={`tel:${COMPANY.ontario.tel}`}
                  className="mt-1 block font-medium text-[#c0392b] hover:underline"
                >
                  {COMPANY.ontario.phones.join(' · ')}
                </a>
              </div>
              <div>
                <p className="font-semibold text-[#0a0f14]">{COMPANY.lagos.label}</p>
                <p className="mt-1">{COMPANY.lagos.address}</p>
                <a
                  href={`tel:${COMPANY.lagos.tel}`}
                  className="mt-1 block font-medium text-[#c0392b] hover:underline"
                >
                  {COMPANY.lagos.phones.join(' · ')}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
