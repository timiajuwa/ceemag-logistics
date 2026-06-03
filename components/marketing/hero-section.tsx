import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { COMPANY } from '@/lib/marketing-data'
import { MarketingImage } from '@/components/marketing/marketing-image'
import { TestimonialsMarquee } from '@/components/marketing/testimonials-marquee'
import { SiteHeader } from '@/components/site-header'

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] overflow-hidden bg-[#05080c] text-white">
      <MarketingImage
        name="hero"
        fill
        priority
        className="object-cover object-center"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#05080c]/85 via-[#05080c]/60 to-[#05080c]" />
      <div className="hero-mesh absolute inset-0" />

      <SiteHeader overlay />

      <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-between px-4 pb-8 pt-28 sm:px-6 lg:px-8">
        <div className="max-w-4xl animate-fade-up">
          <p className="font-heading text-xs font-medium uppercase tracking-[0.28em] text-white/55 sm:text-sm">
            — {COMPANY.legalName}, Etobicoke &amp; Lagos
          </p>
          <h1 className="font-heading mt-6 text-[2.5rem] font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
            One Call.
            <br />
            Any Route.
            <br />
            <span className="text-[#9ae66e]">Anywhere.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75 sm:text-xl">
            {COMPANY.tagline}. We ship to Canada, Nigeria, the Caribbean, USA, UK, and
            across Africa — with the same care you expect from your local coordinator.
          </p>
          <p className="mt-4 text-sm text-white/50">
            Ontario: {COMPANY.ontario.phones[0]} · Lagos: {COMPANY.lagos.phones[0]}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/quote"
              className="inline-flex h-12 items-center gap-2 rounded-full bg-white px-8 font-heading text-sm font-semibold text-[#05080c] transition-transform hover:scale-[1.02] hover:bg-white/95 sm:text-base"
            >
              Get a Free Quote
              <ArrowRight className="h-5 w-5" />
            </Link>
            <a
              href="#track"
              className="inline-flex h-12 items-center rounded-full border border-white/35 bg-white/5 px-8 font-heading text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:border-white/55 hover:bg-white/10 sm:text-base"
            >
              Track Your Parcel
            </a>
          </div>
        </div>

        <div className="wave-pattern relative mt-8 rounded-t-3xl bg-[#05080c]/40 pt-6 backdrop-blur-[2px]">
          <TestimonialsMarquee />
        </div>
      </div>
    </section>
  )
}
