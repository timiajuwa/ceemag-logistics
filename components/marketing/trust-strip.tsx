import { COMPANY, PARTNERS } from '@/lib/marketing-data'

export function TrustStrip() {
  return (
    <section className="border-b border-white/10 bg-[#0a1016] py-8">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
          <div className="text-center lg:text-left">
            <p className="font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#9ae66e]">
              {COMPANY.legalName}
            </p>
            <p className="mt-1 text-sm text-white/60">{COMPANY.tagline}</p>
            <p className="mt-2 text-xs text-white/45">
              Etobicoke, ON · Surulere, Lagos · Est. {COMPANY.established}
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <span className="text-xs font-medium uppercase tracking-wider text-white/40">
              Partners
            </span>
            {PARTNERS.map(p => (
              <span
                key={p}
                className="rounded-full border border-white/15 bg-white/5 px-4 py-1.5 font-heading text-xs font-semibold text-white/80"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
