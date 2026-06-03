import { SectionHeading } from '@/components/marketing/section-heading'

const STEPS = [
  {
    num: '01',
    text: 'Domestic and international air & sea — Canada, Nigeria, Caribbean, USA, UK, and beyond.',
  },
  {
    num: '02',
    text: 'Complete customs brokerage, clearing, and door-to-door delivery with transparent updates.',
  },
  {
    num: '03',
    text: 'Moving, courier, warehousing coordination, and janitorial — one team owns the outcome.',
  },
]

export function OneStopSection() {
  return (
    <section className="border-y border-gray-100 bg-white py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <SectionHeading
            eyebrow="One Call"
            title="Your One-Stop Shop for Shipping Solutions"
            description="We eliminate the chaos of multiple carriers, brokers, and tracking logins. One call to Ceemag puts every solution in motion."
          />
          <ol className="space-y-6">
            {STEPS.map(s => (
              <li
                key={s.num}
                className="flex gap-5 rounded-2xl border border-gray-100 bg-[#f8f9fa] p-6"
              >
                <span className="font-heading text-3xl font-bold text-[#9ae66e]">{s.num}</span>
                <p className="text-gray-700 leading-relaxed">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
