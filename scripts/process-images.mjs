#!/usr/bin/env node
/**
 * Image pipeline for Hadassah Creations Concept.
 *
 * Reads the source photography in ./images, normalises it to correctly encoded
 * WebP, writes SEO-friendly filenames into ./public/images and emits a small
 * manifest (src/data/images.gen.js) so React can render width/height without
 * layout shift. Also renders the favicon set and the Open Graph share image.
 *
 * Usage:  npm run images
 */
import { mkdir, readFile, readdir, rm, writeFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import sharp from 'sharp'

const ROOT = process.cwd()
const SRC = path.join(ROOT, 'images')
const OUT = path.join(ROOT, 'public', 'images')
const DATA = path.join(ROOT, 'src', 'data')

/** Source file -> public, search-friendly filename. */
const RENAME = {
  'download.webp': 'customised-hotel-soaps',
  'hotelSoap.webp': 'wrapped-hotel-soap-bars',
  'hotelSoap3.webp': 'hotel-cleansing-soap',
  'hotelShampoo.webp': 'mini-hotel-shampoo-bottles',
  'hotelDentalkit.webp': 'customised-hotel-dental-kit',
  'hotelShavingkit.webp': 'customised-hotel-shaving-kit',
  'hotelShowercap.webp': 'customised-hotel-shower-cap',
  'hotellCottonbud.webp': 'customised-hotel-cotton-buds',
  'hotelSugar.webp': 'customised-hotel-sugar-sachets',
  'hotelToothpick.webp': 'customised-hotel-toothpicks',
  'customisedTshirt.webp': 'customised-hotel-t-shirt',
  'hotelTowel.webp': 'branded-hotel-towels',
  'hotelDuvet.jpg': 'hotel-duvet-bedding',
  'hotelSewingkit.webp': 'hotel-sewing-kit-envelope',
  'hotelSewingki.webp': 'hotel-sewing-kit-card',
  'hotelSlippers.webp': 'branded-hotel-slippers',
}

/** Derived crops: (source file, extract region in source pixels) -> new slug. */
const CROPS = [
  {
    from: 'hotelShampoo.webp',
    slug: 'customised-hotel-body-lotion',
    // centre bottle in the source photo carries the "Moisturiser" label
    extract: (w, h) => ({
      left: Math.round(w * 0.3),
      top: Math.round(h * 0.04),
      width: Math.round(w * 0.36),
      height: Math.round(h * 0.9),
    }),
    // portrait crop padded onto a matching blurred backdrop at 4:3
    padToAspect: 4 / 3,
    frame: [480, 360],
  },
]

const WEBP = { quality: 82, effort: 5, adaptiveQuantization: true }
const SMALL_MAX = 400 // only emit a -sm variant when it is genuinely smaller

/** lazily filled file path -> data uri (used by the OG image renderer) */
const dataUri = new Map()

const manifest = {}

function record(slug, width, height, variant, byteLength) {
  manifest[slug] ??= { widths: [], bytes: {} }
  const entry = manifest[slug]
  entry.widths.push(width)
  entry.widths.sort((a, b) => a - b)
  entry.bytes[variant ?? 'full'] = byteLength
  if (variant === undefined) {
    // The full-size rendition is the source of truth for intrinsic dimensions;
    // the -sm variant must never overwrite them or the srcset descriptors and
    // the width/height attributes would disagree with the real file.
    entry.width = width
    entry.height = height
    entry.ratio = Number((height / width).toFixed(4))
  }
}

async function emit(input, slug, { width, withSmall }) {
  const meta = await input.clone().metadata()
  const natW = meta.width
  const natH = meta.height

  const full = await input
    .clone()
    .resize({ width, withoutEnlargement: true })
    .webp(WEBP)
    .toBuffer({ resolveWithObject: true })
  await writeFile(path.join(OUT, `${slug}.webp`), full.data)
  const fullW = full.info.width
  const fullH = full.info.height
  record(slug, fullW, fullH, undefined, full.info.size)
  manifest[slug].src = `/images/${slug}.webp`

  if (withSmall && natW > SMALL_MAX) {
    const sm = await input
      .clone()
      .resize({ width: SMALL_MAX, withoutEnlargement: true })
      .webp(WEBP)
      .toBuffer({ resolveWithObject: true })
    await writeFile(path.join(OUT, `${slug}-sm.webp`), sm.data)
    record(slug, sm.info.width, sm.info.height, 'sm', sm.info.size)
    manifest[slug].sm = `/images/${slug}-sm.webp`
  }

  console.log(
    `  ${slug}.webp  ${fullW}x${fullH}  ${(full.info.size / 1024).toFixed(1)} kB` +
      (manifest[slug].sm ? `  (+sm ${(manifest[slug].bytes.sm / 1024).toFixed(1)} kB)` : ''),
  )
}

async function buildProductImages() {
  console.log('\n▸ product photography')
  for (const [file, slug] of Object.entries(RENAME)) {
    const from = path.join(SRC, file)
    if (!existsSync(from)) {
      console.warn(`  ! missing source: ${file}`)
      continue
    }
    await emit(sharp(from).rotate(), slug, { width: 1400, withSmall: true })
  }

  for (const crop of CROPS) {
    const from = path.join(SRC, crop.from)
    if (!existsSync(from)) continue
    const base = sharp(from).rotate()
    const { info } = await base.clone().toBuffer({ resolveWithObject: true })
    const region = crop.extract(info.width, info.height)
    const cut = await base
      .clone()
      .extract(region)
      .toBuffer({ resolveWithObject: true })

    if (crop.padToAspect) {
      // Pad the tall crop onto a blurred, enlarged copy of itself so the card
      // keeps a consistent 4:3 frame without cropping the product away.
      const [fw, fh] = crop.frame
      const bg = await sharp(cut.data)
        .resize({ width: fw, height: fh, fit: 'cover', position: 'attention' })
        .blur(30)
        .modulate({ brightness: 0.9, saturation: 0.9 })
        .toBuffer()
      const fg = await sharp(cut.data).resize({ height: Math.round(fh * 0.92) }).toBuffer()
      const padded = await sharp(bg).composite([{ input: fg, gravity: 'centre' }]).toBuffer()
      await emit(sharp(padded), crop.slug, { width: 1400, withSmall: true })
    } else {
      await emit(sharp(cut.data), crop.slug, { width: 1400, withSmall: true })
    }
  }
}

async function buildFavicons() {
  console.log('\n▸ logo + favicons')
  const svgPath = path.join(ROOT, 'public', 'logo-mark.svg')
  const svg = await readFile(svgPath)
  await writeFile(path.join(ROOT, 'public', 'favicon.svg'), svg)
  const sizes = [
    ['favicon-16.png', 16],
    ['favicon-32.png', 32],
    ['favicon-192.png', 192],
    ['apple-touch-icon.png', 180],
    ['android-chrome-192.png', 192],
    ['android-chrome-512.png', 512],
    ['og-logo.png', 512],
  ]
  for (const [name, size] of sizes) {
    const buf = await sharp(svg, { density: 300 })
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer()
    await writeFile(path.join(ROOT, 'public', name), buf)
    console.log(`  ${name}  ${size}x${size}`)
  }
}

async function buildOgImage() {
  console.log('\n▸ open graph share image')
  const logo = await readFile(path.join(ROOT, 'public', 'logo-mark.svg'), 'utf8')
  const W = 1200
  const H = 630

  for (const file of [
    'customised-hotel-soaps.webp',
    'branded-hotel-towels.webp',
    'mini-hotel-shampoo-bottles.webp',
    'hotel-duvet-bedding.webp',
  ]) {
    const p = path.join(OUT, file)
    if (existsSync(p)) dataUri.set(p, `data:image/webp;base64,${await b64(p)}`)
  }

  const photo = (file, x, y, w, h, r = 20) => {
    const p = path.join(OUT, file)
    if (!existsSync(p)) return ''
    return `
      <clipPath id="c${x}-${y}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}"/></clipPath>
      <image href="${dataUri.get(p)}" xlink:href="${dataUri.get(p)}"
             x="${x}" y="${y}" width="${w}" height="${h}"
             preserveAspectRatio="xMidYMid slice" clip-path="url(#c${x}-${y})"/>`
  }

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#2E1065"/>
        <stop offset="0.45" stop-color="#5B21B6"/>
        <stop offset="1" stop-color="#0F766E"/>
      </linearGradient>
      <linearGradient id="gold" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stop-color="#FDE68A"/>
        <stop offset="1" stop-color="#F59E0B"/>
      </linearGradient>
      <radialGradient id="glow" cx="0.8" cy="0.1" r="0.8">
        <stop offset="0" stop-color="#2DD4BF" stop-opacity="0.45"/>
        <stop offset="1" stop-color="#2DD4BF" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#bg)"/>
    <rect width="${W}" height="${H}" fill="url(#glow)"/>

    <g transform="translate(72 66) scale(1.35)">${logo.replace(/<svg[^>]*>|<\/svg>/g, '')}</g>
    <text x="176" y="112" font-family="Georgia, 'Times New Roman', serif" font-size="40" fill="#FFFFFF" letter-spacing="1">Hadassah Creations Concept</text>
    <text x="176" y="152" font-family="Arial, Helvetica, sans-serif" font-size="24" fill="#FDE68A" letter-spacing="4">CUSTOMISED HOTEL AMENITIES</text>

    <text x="72" y="300" font-family="Georgia, 'Times New Roman', serif" font-size="62" fill="#FFFFFF">Premium Customised Hotel</text>
    <text x="72" y="372" font-family="Georgia, 'Times New Roman', serif" font-size="62" fill="#FFFFFF">Amenities That Make</text>
    <text x="72" y="444" font-family="Georgia, 'Times New Roman', serif" font-size="62" fill="url(#gold)">Every Stay Special.</text>

    <text x="72" y="520" font-family="Arial, Helvetica, sans-serif" font-size="27" fill="#E9D5FF">Hotel toiletries, guest kits, branded towels &amp; luxury bedding</text>
    <rect x="72" y="552" width="470" height="56" rx="28" fill="#25D366"/>
    <text x="307" y="589" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="bold" fill="#062B21">Order on WhatsApp</text>

    ${photo('customised-hotel-soaps.webp', 800, 250, 160, 160)}
    ${photo('branded-hotel-towels.webp', 975, 250, 160, 160)}
    ${photo('mini-hotel-shampoo-bottles.webp', 800, 425, 160, 160)}
    ${photo('hotel-duvet-bedding.webp', 975, 425, 160, 160)}
  </svg>`

  const buf = await sharp(Buffer.from(svg)).jpeg({ quality: 86, mozjpeg: true }).toBuffer()
  await writeFile(path.join(ROOT, 'public', 'og-image.jpg'), buf)
  console.log(`  og-image.jpg  1200x630  ${(buf.length / 1024).toFixed(1)} kB`)
}

function b64(file) {
  return readFile(file).then((b) => b.toString('base64'))
}

async function writeManifest() {
  await mkdir(DATA, { recursive: true })
  const banner = `// AUTO-GENERATED by scripts/process-images.mjs — do not edit by hand.\n`
  const body = `export const images = ${JSON.stringify(manifest, null, 2)}\n`
  await writeFile(path.join(DATA, 'images.gen.js'), banner + body)
  console.log(`\n▸ wrote src/data/images.gen.js (${Object.keys(manifest).length} images)`)
}

async function main() {
  await mkdir(OUT, { recursive: true })
  await mkdir(DATA, { recursive: true })
  // clear stale output so removed products never linger in dist
  if (existsSync(OUT)) {
    for (const f of await readdir(OUT)) {
      if (f.endsWith('.webp')) await rm(path.join(OUT, f))
    }
  }
  await buildProductImages()
  await buildFavicons()
  await buildOgImage()
  await writeManifest()
  console.log('\n✓ images ready\n')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
