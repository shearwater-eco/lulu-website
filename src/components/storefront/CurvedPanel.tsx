import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CurvedPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Hourglass-shaped white panel matching the LULU box face.
 * The panel is wider at top and bottom, narrower at the center (concave sides).
 * Has a teal/primary outline and hot pink outer glow strip — matching the box.
 *
 * Uses SVG clip-path for precise curves matching the physical packaging.
 */
export function CurvedPanel({ children, className }: CurvedPanelProps) {
  // The hourglass shape — concave sides. 
  // Top edge: flat. Bottom edge: flat. Left & right: curve inward.
  const clipPath = `
    M 0.05 0
    L 0.95 0
    Q 1 0, 1 0.05
    Q 0.92 0.25, 0.92 0.5
    Q 0.92 0.75, 1 0.95
    Q 1 1, 0.95 1
    L 0.05 1
    Q 0 1, 0 0.95
    Q 0.08 0.75, 0.08 0.5
    Q 0.08 0.25, 0 0.05
    Q 0 0, 0.05 0
    Z
  `;

  // Convert to polygon-ish percentages for CSS clip-path
  const cssClipPath = `polygon(
    5% 0%, 95% 0%,
    100% 3%, 93% 25%, 92% 50%, 93% 75%, 100% 97%,
    95% 100%, 5% 100%,
    0% 97%, 7% 75%, 8% 50%, 7% 25%, 0% 3%
  )`;

  return (
    <div className={cn('relative mx-auto w-full', className)}>
      {/* Hot pink glow strip behind the panel */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: cssClipPath,
          background: '#E91E78',
          transform: 'scale(1.04, 1.02)',
        }}
      />

      {/* Teal/primary outline layer */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: cssClipPath,
          background: 'hsl(var(--primary))',
          transform: 'scale(1.02, 1.01)',
        }}
      />

      {/* White panel */}
      <div
        className="relative bg-background"
        style={{ clipPath: cssClipPath }}
      >
        <div className="px-6 py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
          {children}
        </div>
      </div>
    </div>
  );
}
