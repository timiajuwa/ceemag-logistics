import { STATS } from '@/lib/marketing-data'

export function StatsSection() {
  return (
    <section className="relative border-y border-white/5 bg-[#0c1218] py-16 sm:py-20">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-10 px-4 sm:px-6 lg:grid-cols-4 lg:px-8">
        {STATS.map((s, i) => (
          <div
            key={s.label}
            className={`text-center ${i > 0 ? 'lg:border-l lg:border-white/10' : ''}`}
          >
            <p className="font-heading text-4xl font-bold text-white sm:text-5xl lg:text-6xl">
              <span className="text-[#9ae66e]">{s.value}</span>
            </p>
            <p className="mt-2 font-heading text-sm font-medium uppercase tracking-wider text-white/50">
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
