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

function generateMosaicTiles(
  width: number,
  height: number,
  tileSize: number,
  seed: number = 42
) {
  const tiles: { x: number; y: number; w: number; h: number; color: string }[] = [];
  const cols = Math.ceil(width / tileSize);
  const rows = Math.ceil(height / tileSize);

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const s = seed + row * cols + col;
      const colorIdx = Math.floor(seededRandom(s) * MOSAIC_COLORS.length);
      // Slight size variation for organic feel
      const sizeVar = 0.85 + seededRandom(s + 100) * 0.3;
      const w = tileSize * sizeVar;
      const h = tileSize * sizeVar;
      const x = col * tileSize + (tileSize - w) / 2;
      const y = row * tileSize + (tileSize - h) / 2;
      tiles.push({ x, y, w, h, color: MOSAIC_COLORS[colorIdx] });
    }
  }
  return tiles;
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
  borderWidth = 32,
  showArch = false,
}: MosaicFrameProps) {
  return (
    <div className={cn('relative', className)}>
      {/* Mosaic border background */}
      <div
        className="absolute inset-0 rounded-2xl overflow-hidden"
        style={{ padding: 0 }}
      >
        <MosaicPattern seed={1} />
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

// --- MOSAIC PATTERN: fills its container with mosaic tiles ---
function MosaicPattern({ seed = 1 }: { seed?: number }) {
  // We generate a repeating tile pattern via SVG
  const tileSize = 18;
  const patternSize = tileSize * 12; // 216px repeat

  const tiles = useMemo(
    () => generateMosaicTiles(patternSize, patternSize, tileSize, seed),
    [seed]
  );

  return (
    <svg
      className="w-full h-full"
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    >
      <defs>
        <pattern
          id={`mosaic-${seed}`}
          x="0"
          y="0"
          width={patternSize}
          height={patternSize}
          patternUnits="userSpaceOnUse"
        >
          {/* Black background (the "leading" between tiles) */}
          <rect width={patternSize} height={patternSize} fill="#1a1a1a" />
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
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#mosaic-${seed})`} />
    </svg>
  );
}

// --- MOSAIC ARCH: the handle shape from the box top ---
export function MosaicArch() {
  const archWidth = 280;
  const archHeight = 80;
  const tileSize = 14;

  const tiles = useMemo(
    () => generateMosaicTiles(archWidth, archHeight, tileSize, 99),
    []
  );

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
        <pattern
          id="arch-mosaic"
          x="0"
          y="0"
          width={archWidth}
          height={archHeight}
          patternUnits="userSpaceOnUse"
        >
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
        </pattern>
      </defs>
      <rect
        width={archWidth}
        height={archHeight}
        fill="url(#arch-mosaic)"
        clipPath="url(#arch-clip)"
      />
    </svg>
  );
}

// --- MOSAIC STRIP: horizontal divider ---
export function MosaicStrip({ className, seed = 7 }: { className?: string; seed?: number }) {
  const tileSize = 16;
  const patternW = tileSize * 20;
  const stripH = tileSize * 2;

  const tiles = useMemo(
    () => generateMosaicTiles(patternW, stripH, tileSize, seed),
    [seed]
  );

  return (
    <div className={cn('w-full overflow-hidden', className)} style={{ height: stripH }}>
      <svg
        className="w-full h-full"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern
            id={`strip-mosaic-${seed}`}
            x="0"
            y="0"
            width={patternW}
            height={stripH}
            patternUnits="userSpaceOnUse"
          >
            <rect width={patternW} height={stripH} fill="#1a1a1a" />
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
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#strip-mosaic-${seed})`} />
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
        <MosaicPattern seed={3} />
      </div>
      {/* Right side */}
      <div className="fixed right-0 top-0 bottom-0 w-8 hidden lg:block z-40 overflow-hidden">
        <MosaicPattern seed={5} />
      </div>
    </>
  );
}
