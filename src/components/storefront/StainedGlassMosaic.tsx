import { ReactNode, useMemo } from 'react';
import { cn } from '@/lib/utils';

// 9 colours from the LULU packaging mosaic
const MOSAIC_COLORS = [
  '#E91E78', // hot pink
  '#7CFC00', // lime
  '#00A651', // green
  '#E30613', // red
  '#F7941D', // orange
  '#C5E300', // yellow-green
  '#00B4A0', // teal
  '#00BFFF', // sky blue
  '#8B00FF', // purple
];

// Deterministic pseudo-random based on seed
function seededRandom(seed: number) {
  const x = Math.sin(seed) * 10000;
  return x - Math.floor(x);
}

// --- MOSAIC FRAME: wraps children with a stained-glass border ---
interface MosaicFrameProps {
  children: ReactNode;
  className?: string;
  borderWidth?: number;
  showArch?: boolean;
}

export function MosaicFrame({
  children,
  className,
  borderWidth = 48,
  showArch = false,
}: MosaicFrameProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Mosaic border background — SVG that fills the whole area */}
      <div className="absolute inset-0 rounded-sm overflow-hidden">
        <RadiatingMosaicBorder seed={1} />
      </div>

      {/* Handle arch at top */}
      {showArch && (
        <div className="relative z-10 flex justify-center -mt-1">
          <MosaicArch />
        </div>
      )}

      {/* Inner content area — sits inside the hourglass */}
      <div
        className="relative z-10"
        style={{
          margin: borderWidth,
          marginTop: showArch ? 0 : borderWidth,
        }}
      >
        {children}
      </div>
    </div>
  );
}

/**
 * Radial sunburst mosaic border.
 *
 * Layer order (back to front):
 * 1. Hot pink solid outer frame
 * 2. Light blue/teal solid background
 * 3. Black rect (leading background)
 * 4. Mosaic trapezoid tile paths
 * 5. Hourglass white fill with thin black stroke
 *
 * Tiles radiate from the center outward — each tile is a trapezoid
 * formed between two radial lines and two concentric depth rings.
 * The inner ring follows the concave hourglass curve.
 */
function RadiatingMosaicBorder({ seed = 1 }: { seed?: number }) {
  const vW = 600;
  const vH = 800;

  // Outer frame insets
  const pinkInset = 5;
  const tealInset = 10;
  const mosaicInset = tealInset + pinkInset;

  // Hourglass inner panel — generous white area
  const panelTop = 55;
  const panelBottom = vH - 55;
  const panelLeft = 60;
  const panelRight = vW - 60;
  // Concave waist — subtle curve matching the box
  const waistInset = 25;
  const panelCenterY = vH / 2;

  // Build the hourglass path using cubic beziers
  const hourglassPath = useMemo(() => {
    const tl = { x: panelLeft, y: panelTop };
    const tr = { x: panelRight, y: panelTop };
    const br = { x: panelRight, y: panelBottom };
    const bl = { x: panelLeft, y: panelBottom };
    const waistL = panelLeft + waistInset;
    const waistR = panelRight - waistInset;

    return [
      `M ${tl.x} ${tl.y}`,
      `L ${tr.x} ${tr.y}`,
      // Right side: curve inward to waist then back out
      `C ${tr.x} ${tr.y + 120}, ${waistR} ${panelCenterY - 80}, ${waistR} ${panelCenterY}`,
      `C ${waistR} ${panelCenterY + 80}, ${br.x} ${br.y - 120}, ${br.x} ${br.y}`,
      `L ${bl.x} ${bl.y}`,
      // Left side: curve inward to waist then back out
      `C ${bl.x} ${bl.y - 120}, ${waistL} ${panelCenterY + 80}, ${waistL} ${panelCenterY}`,
      `C ${waistL} ${panelCenterY - 80}, ${tl.x} ${tl.y + 120}, ${tl.x} ${tl.y}`,
      'Z',
    ].join(' ');
  }, []);

  // Sample points along the hourglass inner boundary for tile generation
  // Returns {x, y} for a given parameter t (0..1 going clockwise from top-left)
  const sampleHourglass = useMemo(() => {
    // We sample using cubic bezier math
    const cubicBezier = (
      t: number,
      p0: number, p1: number, p2: number, p3: number
    ) => {
      const u = 1 - t;
      return u * u * u * p0 + 3 * u * u * t * p1 + 3 * u * t * t * p2 + t * t * t * p3;
    };

    const tl = { x: panelLeft, y: panelTop };
    const tr = { x: panelRight, y: panelTop };
    const br = { x: panelRight, y: panelBottom };
    const bl = { x: panelLeft, y: panelBottom };
    const waistL = panelLeft + waistInset;
    const waistR = panelRight - waistInset;

    return (side: 'top' | 'right' | 'bottom' | 'left', t: number): { x: number; y: number } => {
      switch (side) {
        case 'top': {
          // Linear along top edge from tl to tr
          return { x: tl.x + (tr.x - tl.x) * t, y: tl.y };
        }
        case 'right': {
          // Cubic bezier: tr → (tr.x, tr.y+120) → (waistR, cy-80) → (waistR, cy) first half
          // then (waistR, cy) → (waistR, cy+80) → (br.x, br.y-120) → br second half
          if (t <= 0.5) {
            const lt = t * 2;
            return {
              x: cubicBezier(lt, tr.x, tr.x, waistR, waistR),
              y: cubicBezier(lt, tr.y, tr.y + 120, panelCenterY - 80, panelCenterY),
            };
          } else {
            const lt = (t - 0.5) * 2;
            return {
              x: cubicBezier(lt, waistR, waistR, br.x, br.x),
              y: cubicBezier(lt, panelCenterY, panelCenterY + 80, br.y - 120, br.y),
            };
          }
        }
        case 'bottom': {
          // Linear along bottom edge from br to bl (reversed)
          return { x: br.x - (br.x - bl.x) * t, y: br.y };
        }
        case 'left': {
          // Cubic bezier: bl → (bl.x, bl.y-120) → (waistL, cy+80) → (waistL, cy) first half
          // then (waistL, cy) → (waistL, cy-80) → (tl.x, tl.y+120) → tl second half
          if (t <= 0.5) {
            const lt = t * 2;
            return {
              x: cubicBezier(lt, bl.x, bl.x, waistL, waistL),
              y: cubicBezier(lt, bl.y, bl.y - 120, panelCenterY + 80, panelCenterY),
            };
          } else {
            const lt = (t - 0.5) * 2;
            return {
              x: cubicBezier(lt, waistL, waistL, tl.x, tl.x),
              y: cubicBezier(lt, panelCenterY, panelCenterY - 80, tl.y + 120, tl.y),
            };
          }
        }
      }
    };
  }, []);

  // Generate mosaic tiles
  const tiles = useMemo(() => {
    const result: { d: string; color: string }[] = [];
    let idx = seed;
    const gap = 3; // leading gap between tiles

    const pickColor = () => {
      const ci = Math.floor(seededRandom(idx++) * MOSAIC_COLORS.length);
      return MOSAIC_COLORS[ci];
    };

    // For each side, generate tiles that radiate from inner curve to outer edge
    const generateSideTiles = (
      side: 'top' | 'right' | 'bottom' | 'left',
      numCols: number,
      numRows: number,
    ) => {
      for (let col = 0; col < numCols; col++) {
        const t0 = col / numCols;
        const t1 = (col + 1) / numCols;

        // Inner boundary points (on the hourglass curve)
        const inner0 = sampleHourglass(side, t0);
        const inner1 = sampleHourglass(side, t1);

        // Outer boundary points (on the outer rectangle edge, inset by mosaicInset)
        let outer0: { x: number; y: number };
        let outer1: { x: number; y: number };

        switch (side) {
          case 'top':
            outer0 = { x: mosaicInset + (vW - 2 * mosaicInset) * t0, y: mosaicInset };
            outer1 = { x: mosaicInset + (vW - 2 * mosaicInset) * t1, y: mosaicInset };
            break;
          case 'right':
            outer0 = { x: vW - mosaicInset, y: mosaicInset + (vH - 2 * mosaicInset) * t0 };
            outer1 = { x: vW - mosaicInset, y: mosaicInset + (vH - 2 * mosaicInset) * t1 };
            break;
          case 'bottom':
            outer0 = { x: vW - mosaicInset - (vW - 2 * mosaicInset) * t0, y: vH - mosaicInset };
            outer1 = { x: vW - mosaicInset - (vW - 2 * mosaicInset) * t1, y: vH - mosaicInset };
            break;
          case 'left':
            outer0 = { x: mosaicInset, y: vH - mosaicInset - (vH - 2 * mosaicInset) * t0 };
            outer1 = { x: mosaicInset, y: vH - mosaicInset - (vH - 2 * mosaicInset) * t1 };
            break;
        }

        // Split into depth rows
        for (let row = 0; row < numRows; row++) {
          const r0 = row / numRows;
          const r1 = (row + 1) / numRows;

          // Lerp between inner and outer for each depth
          const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

          const p0x = lerp(inner0.x, outer0.x, r0);
          const p0y = lerp(inner0.y, outer0.y, r0);
          const p1x = lerp(inner1.x, outer1.x, r0);
          const p1y = lerp(inner1.y, outer1.y, r0);
          const p2x = lerp(inner1.x, outer1.x, r1);
          const p2y = lerp(inner1.y, outer1.y, r1);
          const p3x = lerp(inner0.x, outer0.x, r1);
          const p3y = lerp(inner0.y, outer0.y, r1);

          // Apply gap (shrink tile inward)
          const cx = (p0x + p1x + p2x + p3x) / 4;
          const cy = (p0y + p1y + p2y + p3y) / 4;
          const shrink = (px: number, py: number) => {
            const dx = px - cx;
            const dy = py - cy;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 0.1) return { x: px, y: py };
            const factor = Math.max(0, dist - gap / 2) / dist;
            return { x: cx + dx * factor, y: cy + dy * factor };
          };

          const s0 = shrink(p0x, p0y);
          const s1 = shrink(p1x, p1y);
          const s2 = shrink(p2x, p2y);
          const s3 = shrink(p3x, p3y);

          result.push({
            d: `M ${s0.x} ${s0.y} L ${s1.x} ${s1.y} L ${s2.x} ${s2.y} L ${s3.x} ${s3.y} Z`,
            color: pickColor(),
          });
        }
      }
    };

    // Top: 12 cols × 2 rows
    generateSideTiles('top', 12, 2);
    // Bottom: 12 cols × 2 rows
    generateSideTiles('bottom', 12, 2);
    // Right: 10 cols × 2 rows
    generateSideTiles('right', 10, 2);
    // Left: 10 cols × 2 rows
    generateSideTiles('left', 10, 2);

    return result;
  }, [seed, sampleHourglass]);

  return (
    <svg
      className="w-full h-full"
      viewBox={`0 0 ${vW} ${vH}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      {/* Layer 1: Hot pink outer frame */}
      <rect width={vW} height={vH} fill="#E91E78" />

      {/* Layer 2: Teal/light blue background */}
      <rect
        x={pinkInset} y={pinkInset}
        width={vW - 2 * pinkInset} height={vH - 2 * pinkInset}
        fill="#00B4A0"
      />

      {/* Layer 3: Black leading background */}
      <rect
        x={mosaicInset} y={mosaicInset}
        width={vW - 2 * mosaicInset} height={vH - 2 * mosaicInset}
        fill="#1a1a1a"
      />

      {/* Layer 4: Mosaic tiles */}
      {tiles.map((tile, i) => (
        <path key={i} d={tile.d} fill={tile.color} />
      ))}

      {/* Layer 5: White hourglass panel with thin black stroke */}
      <path
        d={hourglassPath}
        fill="white"
        stroke="#1a1a1a"
        strokeWidth={3}
      />
    </svg>
  );
}

// --- MOSAIC ARCH: the handle shape from the box top ---
export function MosaicArch() {
  const archWidth = 280;
  const archHeight = 80;
  const tileSize = 14;

  const tiles = useMemo(() => {
    const result: { x: number; y: number; w: number; h: number; color: string }[] = [];
    const cols = Math.ceil(archWidth / tileSize);
    const rows = Math.ceil(archHeight / tileSize);

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const s = 99 + row * cols + col;
        const colorIdx = Math.floor(seededRandom(s) * MOSAIC_COLORS.length);
        const sizeVar = 0.85 + seededRandom(s + 100) * 0.3;
        const w = tileSize * sizeVar;
        const h = tileSize * sizeVar;
        const x = col * tileSize + (tileSize - w) / 2;
        const y = row * tileSize + (tileSize - h) / 2;
        result.push({ x, y, w, h, color: MOSAIC_COLORS[colorIdx] });
      }
    }
    return result;
  }, []);

  return (
    <svg
      width={archWidth}
      height={archHeight}
      viewBox={`0 0 ${archWidth} ${archHeight}`}
      className="w-48 md:w-64 lg:w-72 h-auto"
    >
      <defs>
        <clipPath id="arch-clip">
          <path
            d={`M 0 ${archHeight} 
                Q 0 0, ${archWidth / 2} 0 
                Q ${archWidth} 0, ${archWidth} ${archHeight} 
                L ${archWidth - 20} ${archHeight} 
                Q ${archWidth - 20} 20, ${archWidth / 2} 20 
                Q 20 20, 20 ${archHeight} Z`}
          />
        </clipPath>
      </defs>
      <g clipPath="url(#arch-clip)">
        <rect width={archWidth} height={archHeight} fill="#1a1a1a" />
        {tiles.map((tile, i) => (
          <rect
            key={i}
            x={tile.x}
            y={tile.y}
            width={tile.w}
            height={tile.h}
            fill={tile.color}
            rx={1}
          />
        ))}
      </g>
    </svg>
  );
}

// --- MOSAIC STRIP: horizontal divider ---
export function MosaicStrip({ className, seed = 7 }: { className?: string; seed?: number }) {
  const viewW = 800;
  const stripH = 32;
  const numTiles = 40;

  const tiles = useMemo(() => {
    const result: { d: string; color: string }[] = [];
    const gap = 1.5;
    for (let i = 0; i < numTiles; i++) {
      const x0 = (i / numTiles) * viewW + gap / 2;
      const x1 = ((i + 1) / numTiles) * viewW - gap / 2;
      const colorIdx = Math.floor(seededRandom(seed + i) * MOSAIC_COLORS.length);
      result.push({
        d: `M ${x0} ${gap} L ${x1} ${gap} L ${x1} ${stripH - gap} L ${x0} ${stripH - gap} Z`,
        color: MOSAIC_COLORS[colorIdx],
      });
    }
    return result;
  }, [seed]);

  return (
    <div className={cn('w-full overflow-hidden', className)} style={{ height: stripH }}>
      <svg
        className="w-full h-full"
        viewBox={`0 0 ${viewW} ${stripH}`}
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={viewW} height={stripH} fill="#1a1a1a" />
        {tiles.map((tile, i) => (
          <path key={i} d={tile.d} fill={tile.color} />
        ))}
      </svg>
    </div>
  );
}

// --- SIDE MOSAIC STRIPS ---
export function SideMosaicStrips() {
  return (
    <>
      <div className="fixed left-0 top-0 bottom-0 w-8 hidden lg:block z-40 overflow-hidden">
        <SideStripPattern seed={3} />
      </div>
      <div className="fixed right-0 top-0 bottom-0 w-8 hidden lg:block z-40 overflow-hidden">
        <SideStripPattern seed={5} />
      </div>
    </>
  );
}

function SideStripPattern({ seed }: { seed: number }) {
  const viewW = 40;
  const viewH = 1200;
  const numTiles = 60;
  const gap = 1.5;

  const tiles = useMemo(() => {
    const result: { d: string; color: string }[] = [];
    for (let i = 0; i < numTiles; i++) {
      const y0 = (i / numTiles) * viewH + gap / 2;
      const y1 = ((i + 1) / numTiles) * viewH - gap / 2;
      const colorIdx = Math.floor(seededRandom(seed + i) * MOSAIC_COLORS.length);
      result.push({
        d: `M ${gap} ${y0} L ${viewW - gap} ${y0} L ${viewW - gap} ${y1} L ${gap} ${y1} Z`,
        color: MOSAIC_COLORS[colorIdx],
      });
    }
    return result;
  }, [seed]);

  return (
    <svg
      className="w-full h-full"
      viewBox={`0 0 ${viewW} ${viewH}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <rect width={viewW} height={viewH} fill="#1a1a1a" />
      {tiles.map((tile, i) => (
        <path key={i} d={tile.d} fill={tile.color} />
      ))}
    </svg>
  );
}
