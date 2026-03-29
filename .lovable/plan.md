

# "The Box IS The Website" — Complete Implementation Plan

## Concept

The homepage becomes the LULU box unfolded flat. The stained-glass mosaic border from the physical packaging frames the page. The front panel is the hero. The back panel tells Lulu's story. Below that, a clean product grid for shopping. The box handle becomes a decorative arch element at the top.

---

## Page Flow (Top to Bottom)

```text
┌─ HEADER (compact, h-16) ─────────────────────┐
│                                                │
│  ═══ "THE BEST TP IN THE UNIVERSE" ═══        │
│                                                │
│  ╔═ STAINED-GLASS MOSAIC BORDER ════════════╗  │
│  ║  ┌─ Handle arch (decorative SVG) ────┐   ║  │
│  ║  └──────────────────────────────────┘   ║  │
│  ║  ┌─ CURVED WHITE PANEL (front) ─────┐   ║  │
│  ║  │  "TOILET TISSUE by"               │   ║  │
│  ║  │       LULU                         │   ║  │
│  ║  │  [VAL-U-SMART 24 ROLLS seal]      │   ║  │
│  ║  │  "gentle on you, kind to earth"    │   ║  │
│  ║  │       [SHOP NOW]                   │   ║  │
│  ║  └───────────────────────────────────┘   ║  │
│  ╚══════════════════════════════════════════╝  │
│                                                │
│  [═══════ Video (autoplay, muted) ═══════]     │
│                                                │
│  ╔═ STAINED-GLASS MOSAIC BORDER ════════════╗  │
│  ║  ┌─ CURVED WHITE PANEL (back) ──────┐   ║  │
│  ║  │  WWW.LULU.EARTH                   │   ║  │
│  ║  │  Lulu mascot + poem               │   ║  │
│  ║  │  Certification badges (PNGs)       │   ║  │
│  ║  │  "LULU by ShearWater Eco TM"      │   ║  │
│  ║  └───────────────────────────────────┘   ║  │
│  ╚══════════════════════════════════════════╝  │
│                                                │
│  ── OUR SUSTAINABLE RANGE ──                   │
│  [Product+Price+AddToCart] x3                   │
│                                                │
│  ── TESTIMONIALS ──                            │
│  ── CTA ──                                     │
│  ── FOOTER ──                                  │
└────────────────────────────────────────────────┘
```

---

## Files to Create

| File | What It Does |
|------|-------------|
| `src/components/storefront/StainedGlassMosaic.tsx` | SVG component generating the irregular radiating mosaic pattern with black "leading" lines. Colours from the box: hot pink (#E91E78), lime (#7CFC00), green (#00A651), red (#E30613), orange (#F7941D), yellow-green (#C5E300), teal (#00B4A0), sky blue (#00BFFF), purple (#8B00FF). Variants: `frame` (wraps content), `arch` (handle shape), `strip` (horizontal divider). |
| `src/components/storefront/CurvedPanel.tsx` | Hourglass-shaped white content panel using CSS `clip-path`. Concave sides matching the box. Light teal outline + hot pink strip between panel edge and mosaic. |
| `src/sections/BoxFrontSection.tsx` | Hero section = front face of box. Mosaic frame with handle arch at top. Curved white panel containing: "TOILET TISSUE by" (serif italic), "LULU" (bold serif, large), VAL-U-SMART seal (teal circle, feather, "24 ROLLS"), tagline, SHOP NOW button. Bold "THE BEST TP IN THE UNIVERSE" tagline banner above the mosaic frame. Video sits below the box frame. |
| `src/sections/BoxBackSection.tsx` | Story section = back face of box. Same mosaic frame + curved panel. "WWW.LULU.EARTH" header, Lulu mascot image (existing `lulu-mascot-thumbs-up-new.png`), full poem in italic serif, row of certification badge PNGs (`badge-tree-free.png`, `badge-lower-carbon.png`, `badge-dignity.png`), "LULU by ShearWater Eco TM". |

## Files to Modify

| File | Change |
|------|--------|
| `src/pages/Home.tsx` | Replace current 6 sections with: BoxFrontSection, BoxBackSection, ProductRangeSection, TestimonialsSection, CTASection. Remove WhyChoose + Certifications imports. Update side strips to use new mosaic. |
| `src/sections/ProductRangeSection.tsx` | Replace numbered circles with product images (existing box assets). Change "LEARN MORE" to "ADD TO CART". Add price placeholders ("From £X.XX"). Subtle mosaic border accents on cards. |
| `src/components/storefront/RainbowBorder.tsx` | Update `SideRainbowStrips` to use stained-glass mosaic pattern instead of flat colour blocks. |
| `src/components/storefront/StoreHeader.tsx` | Reduce height to h-16, add small Lulu mascot icon beside logo. |
| `src/index.css` | Add stained-glass colour CSS variables. |

## Files to Delete

| File | Reason |
|------|--------|
| `src/sections/WhyChooseSection.tsx` | Content merged into BoxBackSection |
| `src/sections/CertificationsSection.tsx` | Badge images moved to BoxBackSection |

---

## Existing Assets Used (no new uploads needed)

- `lulu-mascot-thumbs-up-new.png` — mascot in BoxBack
- `badge-tree-free.png`, `badge-lower-carbon.png`, `badge-dignity.png` — certification badges in BoxBack
- `lulu-box-front.jpg` / `lulu-box-mockup.png` — product images in ProductRange cards
- `/lulu-video-website-2.mp4` — autoplay video below front panel

## Mobile Behaviour

- Mosaic border shrinks from ~40px to ~16px
- Handle arch scales down
- Curved panel concavity reduces (subtler on small screens)
- Side strips hidden (already the case)

## Implementation Order

1. StainedGlassMosaic + CurvedPanel components
2. BoxFrontSection (hero with tagline + handle arch)
3. BoxBackSection (story + badges)
4. Update Home.tsx (new section order)
5. Update ProductRangeSection (sales-focused cards)
6. Compact StoreHeader
7. Delete WhyChooseSection + CertificationsSection
8. Polish + mobile responsiveness

