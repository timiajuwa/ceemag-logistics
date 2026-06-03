import { imageSrc } from '@/lib/images'

export const BRAND = {
  red: '#c0392b',
  redDark: '#962d22',
  accent: '#9AE66E',
  accentMuted: 'rgba(154, 230, 110, 0.35)',
  dark: '#05080c',
  darkElevated: '#0c1218',
}

export const HERO_IMAGE = imageSrc('hero')

export const COMPANY = {
  legalName: 'Ceemag Logistics Inc.',
  tagline: 'International Courier, Freight Forwarding & Clearing Agent',
  established: 2018,
  ontario: {
    label: 'Ontario Office (Etobicoke)',
    address: '24 Ronson Dr #14, Etobicoke, ON M9W 1B4',
    phones: ['+1 (905) 463-2764', '+1 (905) 460-6434', '647 718 0358'],
    tel: '+19054632764',
  },
  lagos: {
    label: 'Lagos Office (Surulere)',
    address: '37 Adelabu Street, Surulere, Lagos',
    phones: ['+234 818 385 5480', '0805 561 6729'],
    tel: '+2348183855480',
  },
  instagram: 'https://www.instagram.com/ceemaglogisticsinc/',
  corridors: [
    'Canada',
    'Nigeria',
    'Caribbean',
    'USA',
    'UK',
  ],
}

export const STATS = [
  { value: '24hr', label: 'GTA express from Nigeria' },
  { value: '24/7', label: 'Coordinator support' },
  { value: '2018', label: 'Serving Canada & Africa' },
  { value: '5', label: 'Core service lines' },
]

export const TESTIMONIALS = [
  {
    quote:
      'Very kind people! Down to earth and always looking to help.',
    name: 'Shivani Mahajan',
    initials: 'SM',
  },
  {
    quote:
      'The best cargo in the GTA. My cargo was sent Wednesday from Naija — I got it Thursday in Toronto within 24 hours. Thank you Ceemag.',
    name: 'Joy Chiz',
    initials: 'JC',
  },
  {
    quote:
      'Very reliable, excellent customer service. They treated my delivery with utmost care and speed. Tested and trusted — I recommend to everyone.',
    name: 'Ugo Okere',
    initials: 'UO',
  },
]

export const TRACKING_LINKS = [
  {
    name: 'Track-Trace',
    desc: 'Enter your airway bill or tracking number',
    href: 'https://www.track-trace.com/',
  },
  {
    name: 'IAG Cargo',
    desc: 'Track air cargo shipments',
    href: 'https://www.iagcargo.com/en/track-and-trace',
  },
]

export const PARTNERS = ['DHL', 'UPS', 'FedEx', 'IAG Cargo']

export const QUICK_ACTIONS = [
  {
    title: 'Request Quote',
    subtitle: 'Free quote — Canada & Africa routes',
    href: '/quote',
  },
  {
    title: 'Track Parcel',
    subtitle: 'Track-Trace or IAG Cargo',
    href: '#track',
  },
  {
    title: 'Ontario Office',
    subtitle: COMPANY.ontario.phones[0],
    href: `tel:${COMPANY.ontario.tel}`,
  },
  {
    title: 'Lagos Office',
    subtitle: COMPANY.lagos.phones[0],
    href: `tel:${COMPANY.lagos.tel}`,
  },
  {
    title: 'WhatsApp',
    subtitle: 'Message our team',
    href: 'https://wa.me/19054632764',
    external: true,
  },
  {
    title: 'Instagram',
    subtitle: '@ceemaglogisticsinc',
    href: COMPANY.instagram,
    external: true,
  },
]

export const SERVICES = [
  {
    title: 'Cargo Services',
    desc: 'Overnight, rush, and same-day deliveries — especially immigration filings worldwide.',
    imageKey: 'airCargo' as const,
  },
  {
    title: 'Delivery Services',
    desc: 'Canada to Nigeria, Nigeria to Canada, Canada to Caribbean, Nigeria to USA.',
    imageKey: 'cargoShip' as const,
  },
  {
    title: 'Courier Services',
    desc: 'First-class mail (~3 days) and priority mail (~5 days) to Nigeria. We partner with DHL, UPS, and FedEx.',
    imageKey: 'packages' as const,
  },
  {
    title: 'Moving Services',
    desc: 'Property movement and relocation — containers from pickup to port, and port to final destination.',
    imageKey: 'moving' as const,
  },
  {
    title: 'Janitorial Services',
    desc: 'Daily office cleaning for multinationals, small businesses, schools, and local authority buildings.',
    imageKey: 'office' as const,
  },
]

export const ROUTES = [
  {
    title: 'Cargo Within Canada',
    desc: 'Coast-to-coast delivery across Canada — a core strength for Ceemag.',
    tag: 'Domestic',
    countries: ['🇨🇦 Canada'],
    imageKey: 'truck' as const,
  },
  {
    title: 'Canada → Nigeria',
    desc: 'Air and sea freight with professional packaging, moving, shipping, and clearing.',
    tag: 'Popular',
    countries: ['🇨🇦', '→', '🇳🇬'],
    imageKey: 'warehouse' as const,
  },
  {
    title: 'Nigeria → US & UK',
    desc: 'Air and sea options for commercial and personal shipments.',
    tag: 'International',
    countries: ['🇳🇬', '→', '🇺🇸 🇬🇧'],
    imageKey: 'airCargo' as const,
  },
  {
    title: 'Worldwide Shipping',
    desc: 'Canada, Nigeria, Caribbean, USA, UK, and across Africa — one coordinator, one call.',
    tag: 'Global',
    countries: ['🌍 Worldwide'],
    imageKey: 'cargoShip' as const,
  },
]

export const WHY_ITEMS = [
  {
    title: 'Coast to Coast Delivery',
    desc: 'Moving cargo and packages coast to coast in Canada — with humility and excellent service.',
  },
  {
    title: 'Professional Packaging',
    desc: 'Packaging, moving, shipping, and clearing goods is what we do every day.',
  },
  {
    title: 'Global Network',
    desc: 'Air, road, and sea — with partners and experience that make us stand out from contemporaries.',
  },
]

export const CORRIDORS = [
  'Canada ↔ Nigeria',
  'Nigeria → USA / UK',
  'Canada → Caribbean',
  'Immigration filings',
  'Personal effects & barrels',
  'Commercial & frozen goods',
]
