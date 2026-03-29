import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CurvedPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Hourglass-shaped white panel matching the LULU box face.
 * Concave sides with teal outline + hot pink outer glow strip.
 */
export function CurvedPanel({ children, className }: CurvedPanelProps) {
  return (
    <div className={cn('relative mx-auto w-full max-w-lg', className)}>
      {/* Hot pink glow strip behind the panel */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `polygon(
            8% 0%, 92% 0%,
            100% 5%, 96% 50%, 100% 95%,
            92% 100%, 8% 100%,
            0% 95%, 4% 50%, 0% 5%
          )`,
          background: 'hsl(var(--secondary))',
          transform: 'scale(1.03)',
        }}
      />

      {/* Teal outline layer */}
      <div
        className="absolute inset-0"
        style={{
          clipPath: `polygon(
            8% 0%, 92% 0%,
            100% 5%, 96% 50%, 100% 95%,
            92% 100%, 8% 100%,
            0% 95%, 4% 50%, 0% 5%
          )`,
          background: 'hsl(var(--primary))',
          transform: 'scale(1.015)',
        }}
      />

      {/* White panel */}
      <div
        className="relative bg-background"
        style={{
          clipPath: `polygon(
            8% 0%, 92% 0%,
            100% 5%, 96% 50%, 100% 95%,
            92% 100%, 8% 100%,
            0% 95%, 4% 50%, 0% 5%
          )`,
        }}
      >
        <div className="px-8 py-10 md:px-12 md:py-14">
          {children}
        </div>
      </div>
    </div>
  );
}
