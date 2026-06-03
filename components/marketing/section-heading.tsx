import { cn } from '@/lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  description,
  light = false,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  light?: boolean
  className?: string
}) {
  return (
    <div className={cn('max-w-3xl', className)}>
      {eyebrow && (
        <p
          className={cn(
            'font-heading text-xs font-semibold uppercase tracking-[0.25em]',
            light ? 'text-[#9ae66e]' : 'text-[#c0392b]'
          )}
        >
          {eyebrow}
        </p>
      )}
      <h2
        className={cn(
          'font-heading mt-3 text-3xl font-bold tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]',
          light ? 'text-white' : 'text-[#0a0f14]'
        )}
      >
        {title}
      </h2>
      {description && (
        <p
          className={cn(
            'mt-4 text-lg leading-relaxed',
            light ? 'text-white/65' : 'text-gray-600'
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
