/**
 * Curated logistics photography (Unsplash).
 * Run `npm run images` to cache copies under public/images/ for offline use.
 * NEVER use photo-1494412574647 — it serves unrelated/random images.
 */
const u = (id: string, w: number) =>
  `https://images.unsplash.com/${id}?w=${w}&q=85&auto=format&fit=crop`

export const IMAGES = {
  hero: {
    local: '/images/hero.jpg',
    remote: u('photo-1578575437130-527eed3abbec', 2400),
    alt: 'Shipping containers at a cargo port',
  },
  warehouse: {
    local: '/images/warehouse.jpg',
    remote: u('photo-1586528116311-ad8dd3c8310d', 1200),
    alt: 'Warehouse with stacked freight',
  },
  truck: {
    local: '/images/truck.jpg',
    remote: u('photo-1601584115197-04ecc0da31d7', 1200),
    alt: 'Freight truck on the highway',
  },
  airCargo: {
    local: '/images/air-cargo.jpg',
    remote: u('photo-1436491865332-7a61a109cc05', 1200),
    alt: 'Aircraft used for air freight',
  },
  packages: {
    local: '/images/packages.jpg',
    remote: u('photo-1566576912321-d58ddd7a6088', 1200),
    alt: 'Courier packages ready for delivery',
  },
  cargoShip: {
    local: '/images/cargo-ship.jpg',
    remote: u('photo-1600880292203-757bb62b4575', 1200),
    alt: 'Cargo ship at sea',
  },
  moving: {
    local: '/images/moving.jpg',
    remote: u('photo-1600880292089-90aefbb08623', 1200),
    alt: 'Logistics team coordinating a move',
  },
  office: {
    local: '/images/office.jpg',
    remote: u('photo-1497366216548-37526070297c', 1200),
    alt: 'Modern office building',
  },
} as const

export type ImageKey = keyof typeof IMAGES

/** Prefer locally cached files when present (after npm run images). */
export function imageSrc(key: ImageKey): string {
  if (process.env.NEXT_PUBLIC_USE_LOCAL_IMAGES === 'true') {
    return IMAGES[key].local
  }
  return IMAGES[key].remote
}
