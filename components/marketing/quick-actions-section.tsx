import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { QUICK_ACTIONS } from '@/lib/marketing-data'
import { SectionHeading } from '@/components/marketing/section-heading'

export function QuickActionsSection() {
  return (
    <section className="bg-[#05080c] py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          light
          eyebrow="Tools"
          title="Quick Actions"
          description="Get instant access to pricing, booking, tracking, and support. All in one place, available 24/7."
          className="mx-auto text-center"
        />
        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {QUICK_ACTIONS.map(action => {
            const inner = (
              <div className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.02] p-6 transition-all duration-300 hover:-translate-y-1 hover:border-[#9ae66e]/40 hover:shadow-[0_20px_50px_-20px_rgba(154,230,110,0.25)]">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-heading text-lg font-semibold text-white">
                      {action.title}
                    </h3>
                    <p className="mt-1 text-sm text-[#9ae66e]">{action.subtitle}</p>
                  </div>
                  <ArrowUpRight className="h-5 w-5 text-white/30 transition-colors group-hover:text-[#9ae66e]" />
                </div>
              </div>
            )
            if ('external' in action && action.external) {
              return (
                <a
                  key={action.title}
                  href={action.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {inner}
                </a>
              )
            }
            return (
              <Link key={action.title} href={action.href}>
                {inner}
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
