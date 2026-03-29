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

/**
 * Generates radiating trapezoid wedge tiles that fan outward from the
 * inner panel edge — matching the physical LULU box stained-glass style.
 *
 * The approach: divide each side of the border into radial "columns" that
 * emanate from the center. Each column is split into "rows" (depth layers).
 * This creates the characteristic fan/sunburst pattern with black leading.
 */

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
  borderWidth = 40,
  showArch = false,
}: MosaicFrameProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Mosaic border background — SVG that fills the whole area */}
      <div
        className="absolute inset-0 rounded-sm overflow-hidden"
      >
        <RadiatingMosaicBorder seed={1} />
      </div>

      {/* Handle arch at top */}
      {showArch && (
        <div className="relative z-10 flex justify-center -mt-1">
          <MosaicArch />
        </div>
      )}

      {/* Inner content area */}
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
 * Radiating mosaic border — generates trapezoid tiles that fan out
 * from center towards each edge of the container.
 */
function RadiatingMosaicBorder({ seed = 1 }: { seed?: number }) {
  // We create an SVG with a viewBox and generate trapezoid paths
  // for each of the 4 sides (top, right, bottom, left).
  const viewW = 600;
  const viewH = 800;
  const border = 60; // border thickness in viewBox units
  const gap = 2; // leading gap between tiles

  const tiles = useMemo(() => {
    const result: { d: string; color: string }[] = [];
    let idx = seed;

    // Helper: interpolate between two points
    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

    // Generate tiles for one side
    // outerEdge: array of points along the outer edge (left to right or top to bottom)
    // innerEdge: corresponding points along the inner edge
    const generateSide = (
      outerStart: [number, number],
      outerEnd: [number, number],
      innerStart: [number, number],
      innerEnd: [number, number],
      numCols: number,
      numRows: number,
    ) => {
      for (let col = 0; col < numCols; col++) {
        const t0 = col / numCols;
        const t1 = (col + 1) / numCols;

        for (let row = 0; row < numRows; row++) {
          const r0 = row / numRows;
          const r1 = (row + 1) / numRows;

          // Four corners of the trapezoid
          // Outer edge at t0,t1 and inner edge at t0,t1, interpolated by row depth
          const ox0 = lerp(outerStart[0], outerEnd[0], t0);
          const oy0 = lerp(outerStart[1], outerEnd[1], t0);
          const ox1 = lerp(outerStart[0], outerEnd[0], t1);
          const oy1 = lerp(outerStart[1], outerEnd[1], t1);

          const ix0 = lerp(innerStart[0], innerEnd[0], t0);
          const iy0 = lerp(innerStart[1], innerEnd[1], t0);
          const ix1 = lerp(innerStart[0], innerEnd[0], t1);
          const iy1 = lerp(innerStart[1], innerEnd[1], t1);

          // Interpolate between outer and inner by row depth
          const p0x = lerp(ox0, ix0, r0) + gap / 2;
          const p0y = lerp(oy0, iy0, r0) + gap / 2;
          const p1x = lerp(ox1, ix1, r0) - gap / 2;
          const p1y = lerp(oy1, iy1, r0) + gap / 2;
          const p2x = lerp(ox1, ix1, r1) - gap / 2;
          const p2y = lerp(oy1, iy1, r1) - gap / 2;
          const p3x = lerp(ox0, ix0, r1) + gap / 2;
          const p3y = lerp(oy0, iy0, r1) - gap / 2;

          const colorIdx = Math.floor(seededRandom(idx++) * MOSAIC_COLORS.length);

          result.push({
            d: `M ${p0x} ${p0y} L ${p1x} ${p1y} L ${p2x} ${p2y} L ${p3x} ${p3y} Z`,
            color: MOSAIC_COLORS[colorIdx],
          });
        }
      }
    };

    // TOP side: outer = top edge, inner = top of content area
    generateSide(
      [0, 0], [viewW, 0],           // outer left-to-right
      [border, border], [viewW - border, border], // inner left-to-right
      20, 3
    );

    // BOTTOM side
    generateSide(
      [0, viewH], [viewW, viewH],
      [border, viewH - border], [viewW - border, viewH - border],
      20, 3
    );

    // LEFT side
    generateSide(
      [0, 0], [0, viewH],
      [border, border], [border, viewH - border],
      12, 3
    );

    // RIGHT side
    generateSide(
      [viewW, 0], [viewW, viewH],
      [viewW - border, border], [viewW - border, viewH - border],
      12, 3
    );

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
      {/* Black background = the "leading" between tiles */}
      <rect width={viewW} height={viewH} fill="#1a1a1a" />
      {tiles.map((tile, i) => (
        <path key={i} d={tile.d} fill={tile.color} />
      ))}
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

// --- SIDE MOSAIC STRIPS: replaces the old SideRainbowStrips ---
export function SideMosaicStrips() {
  return (
    <>
      {/* Left side */}
      <div className="fixed left-0 top-0 bottom-0 w-8 hidden lg:block z-40 overflow-hidden">
        <SideStripPattern seed={3} />
      </div>
      {/* Right side */}
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
