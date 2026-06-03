/**
 * Caches logistics photos into public/images/ (run before deploy for bundled assets).
 * Usage: npm run images
 */
import { writeFile, access } from 'node:fs/promises'
import { mkdir } from 'node:fs/promises'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'images')

const ASSETS = [
  ['hero.jpg', 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?w=2400&q=85&auto=format&fit=crop'],
  ['warehouse.jpg', 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1200&q=80&auto=format&fit=crop'],
  ['truck.jpg', 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80&auto=format&fit=crop'],
  ['air-cargo.jpg', 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=80&auto=format&fit=crop'],
  ['packages.jpg', 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?w=1200&q=80&auto=format&fit=crop'],
  ['cargo-ship.jpg', 'https://images.unsplash.com/photo-1600880292203-757bb62b4575?w=1200&q=80&auto=format&fit=crop'],
  ['moving.jpg', 'https://images.unsplash.com/photo-1600880292089-90aefbb08623?w=1200&q=80&auto=format&fit=crop'],
  ['office.jpg', 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=80&auto=format&fit=crop'],
]

await mkdir(root, { recursive: true })

for (const [file, url] of ASSETS) {
  const dest = join(root, file)
  console.log(`Downloading ${file}…`)
  try {
    const res = await fetch(url, {
      headers: { 'User-Agent': 'ceemag-logistics-setup/1.0' },
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    const buf = Buffer.from(await res.arrayBuffer())
    await writeFile(dest, buf)
    console.log(`  ✓ ${file} (${(buf.length / 1024).toFixed(0)} KB)`)
  } catch (err) {
    console.error(`  ✗ ${file}: ${err.message}`)
  }
}

try {
  await access(join(root, 'hero.jpg'))
  console.log('\nLocal images ready. Set in Vercel: NEXT_PUBLIC_USE_LOCAL_IMAGES=true')
} catch {
  console.log('\nSome downloads failed — Vercel will use remote Unsplash URLs at runtime.')
}
