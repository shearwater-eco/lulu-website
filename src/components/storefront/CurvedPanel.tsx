import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface CurvedPanelProps {
  children: ReactNode;
  className?: string;
}

/**
 * Simple white content panel — the border layers (pink, teal, mosaic)
 * are now handled by MosaicFrame's SVG. This just provides padding
 * for content inside the hourglass area.
 */
export function CurvedPanel({ children, className }: CurvedPanelProps) {
  return (
    <div className={cn('relative mx-auto w-full', className)}>
      <div className="px-6 py-8 md:px-10 md:py-12 lg:px-14 lg:py-16">
        {children}
      </div>
    </div>
  );
}
