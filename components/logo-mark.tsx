import Link from 'next/link'
import { cn } from '@/lib/utils'

export function LogoMark({
  className = '',
  variant = 'dark',
}: {
  className?: string
  variant?: 'dark' | 'light'
}) {
  const isLight = variant === 'light'

  return (
    <Link href="/" className={cn('flex items-center gap-3', className)}>
      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-[#c0392b] shadow-sm">
        <span className="font-heading text-sm font-bold tracking-widest text-white">CL</span>
      </div>
      <div>
        <p
          className={cn(
            'font-heading text-base font-bold leading-tight sm:text-lg',
            isLight ? 'text-white' : 'text-[#0a0f14]'
          )}
        >
          Ceemag Logistics
        </p>
        <p
          className={cn(
            'text-[10px] font-medium uppercase tracking-wider sm:text-xs',
            isLight ? 'text-white/60' : 'text-gray-500'
          )}
        >
          Canada · Nigeria · Worldwide
        </p>
      </div>
    </Link>
  )
}

export function LogoMarkLight({ className = '' }: { className?: string }) {
  return <LogoMark className={className} variant="dark" />
}
