import Link from 'next/link'
import { LogoMark } from '@/components/logo-mark'
import { COMPANY } from '@/lib/marketing-data'

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#05080c] text-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <LogoMark variant="light" />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/55">
              {COMPANY.tagline}. Canada, Nigeria, Caribbean, USA, UK, and across Africa.
            </p>
            <p className="mt-6 font-heading text-xs uppercase tracking-wider text-[#9ae66e]">
              Est. {COMPANY.established} · A trial will convince you
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3 lg:col-span-8">
            <div>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/90">
                Services
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-white/55">
                <li><a href="#services" className="hover:text-[#9ae66e]">Cargo Services</a></li>
                <li><a href="#services" className="hover:text-[#9ae66e]">Courier &amp; Delivery</a></li>
                <li><a href="#services" className="hover:text-[#9ae66e]">Moving &amp; Relocation</a></li>
                <li><a href="#services" className="hover:text-[#9ae66e]">Janitorial</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/90">
                Quick Links
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm text-white/55">
                <li><Link href="/quote" className="hover:text-[#9ae66e]">Request a Quote</Link></li>
                <li><a href="#routes" className="hover:text-[#9ae66e]">Shipping Routes</a></li>
                <li><a href="#contact" className="hover:text-[#9ae66e]">Contact Us</a></li>
                <li>
                  <a
                    href="https://www.instagram.com/ceemaglogisticsinc/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#9ae66e]"
                  >
                    @ceemaglogisticsinc
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-heading text-xs font-semibold uppercase tracking-wider text-white/90">
                Offices
              </h4>
              <div className="mt-4 space-y-5 text-sm text-white/55">
                <div>
                  <p className="font-medium text-white">Ontario</p>
                  <p className="mt-1">{COMPANY.ontario.address}</p>
                  <a href={`tel:${COMPANY.ontario.tel}`} className="mt-1 block hover:text-[#9ae66e]">
                    {COMPANY.ontario.phones[0]}
                  </a>
                </div>
                <div>
                  <p className="font-medium text-white">Lagos</p>
                  <p className="mt-1">{COMPANY.lagos.address}</p>
                  <a href={`tel:${COMPANY.lagos.tel}`} className="mt-1 block hover:text-[#9ae66e]">
                    {COMPANY.lagos.phones[0]}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-center text-xs text-white/40 sm:flex-row sm:text-left">
          <p>© {new Date().getFullYear()} {COMPANY.legalName} · All Rights Reserved</p>
          <a
            href={COMPANY.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#9ae66e]"
          >
            @ceemaglogisticsinc
          </a>
        </div>
      </div>
    </footer>
  )
}
