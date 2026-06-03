'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { LogoMark } from '@/components/logo-mark'
import { Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'

const NAV = [
  { label: 'Services', href: '#services' },
  { label: 'Routes', href: '#routes' },
  { label: 'Why Ceemag', href: '#why' },
  { label: 'Contact', href: '#contact' },
]

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const solid = scrolled || !overlay

  return (
    <header
      className={cn(
        'z-50 transition-all duration-300',
        overlay ? 'fixed inset-x-0 top-0 px-4 pt-4 sm:px-6' : 'sticky top-0 border-b border-white/10 bg-[#05080c]/95 backdrop-blur-md'
      )}
    >
      <div
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-4 transition-all duration-300',
          overlay
            ? cn(
                'rounded-full px-4 py-2.5 sm:px-6 sm:py-3',
                solid
                  ? 'bg-white/95 shadow-lg shadow-black/10 backdrop-blur-md'
                  : 'bg-white/90 shadow-md backdrop-blur-md'
              )
            : 'px-4 py-3 sm:px-6 lg:px-8'
        )}
      >
        <LogoMark variant={overlay && !solid ? 'dark' : overlay ? 'dark' : 'light'} />

        <nav className="hidden items-center gap-8 lg:flex">
          {NAV.map(item => (
            <a
              key={item.href}
              href={item.href}
              className={cn(
                'font-heading text-sm font-medium transition-colors',
                overlay ? 'text-[#0a0f14]/80 hover:text-[#0a0f14]' : 'text-white/80 hover:text-white'
              )}
            >
              {item.label}
            </a>
          ))}
          <Link
            href="/quote"
            className="inline-flex h-10 items-center rounded-full bg-[#c0392b] px-5 font-heading text-sm font-semibold text-white transition-colors hover:bg-[#a93226]"
          >
            Get a Quote
          </Link>
        </nav>

        <button
          type="button"
          className={cn(
            'rounded-full p-2 lg:hidden',
            overlay ? 'text-[#0a0f14]' : 'text-white'
          )}
          onClick={() => setOpen(!open)}
          aria-label="Menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div
          className={cn(
            'mx-auto mt-2 max-w-7xl rounded-2xl border p-4 lg:hidden',
            overlay
              ? 'border-gray-200 bg-white shadow-xl'
              : 'border-white/10 bg-[#0c1218]'
          )}
        >
          <nav className="flex flex-col gap-3">
            {NAV.map(item => (
              <a
                key={item.href}
                href={item.href}
                className={cn(
                  'font-heading text-sm font-medium',
                  overlay ? 'text-[#0a0f14]' : 'text-white/90'
                )}
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/quote"
              className="mt-2 inline-flex h-11 items-center justify-center rounded-full bg-[#c0392b] font-heading text-sm font-semibold text-white"
              onClick={() => setOpen(false)}
            >
              Get a Quote
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
