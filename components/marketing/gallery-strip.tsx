import { MarketingImage } from '@/components/marketing/marketing-image'
import type { ImageKey } from '@/lib/images'

const STRIP: { key: ImageKey; label: string }[] = [
  { key: 'warehouse', label: 'Warehousing & handling' },
  { key: 'truck', label: 'Ground freight' },
  { key: 'airCargo', label: 'Air cargo' },
  { key: 'cargoShip', label: 'Ocean freight' },
]

export function GalleryStrip() {
  return (
    <section className="border-y border-white/10 bg-[#0a1016] py-6">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-2 px-4 sm:grid-cols-4 sm:px-6 lg:px-8">
        {STRIP.map(item => (
          <div key={item.key} className="relative aspect-[4/3] overflow-hidden rounded-xl">
            <MarketingImage
              name={item.key}
              fill
              className="object-cover opacity-90"
              sizes="25vw"
            />
            <div className="absolute inset-0 bg-[#05080c]/40" />
            <p className="absolute inset-x-0 bottom-0 p-3 text-center font-heading text-xs font-semibold text-white sm:text-sm">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
