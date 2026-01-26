import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface RainbowBorderProps {
  children: ReactNode;
  className?: string;
  animated?: boolean;
}

// EXACT lulu.earth animated diagonal rainbow stripes
export function RainbowBorder({ children, className, animated = false }: RainbowBorderProps) {
  return (
    <div className={cn("relative group", className)}>
      {/* Animated diagonal rainbow stripes border */}
      <div className="absolute -inset-1 rounded-2xl overflow-hidden">
        <div 
          className={cn(
            "absolute inset-0",
            animated && "group-hover:animate-rainbow-slide"
          )}
          style={{
            background: `repeating-linear-gradient(
              -45deg,
              #00C1B0,
              #00C1B0 20px,
              #000000 20px,
              #000000 22px,
              #FF4D8D 22px,
              #FF4D8D 42px,
              #000000 42px,
              #000000 44px,
              #FFE23E 44px,
              #FFE23E 64px,
              #000000 64px,
              #000000 66px,
              #3EC9FF 66px,
              #3EC9FF 86px,
              #000000 86px,
              #000000 88px,
              #FF8B4D 88px,
              #FF8B4D 108px,
              #000000 108px,
              #000000 110px,
              #9B59B6 110px,
              #9B59B6 130px,
              #000000 130px,
              #000000 132px,
              #4ADE80 132px,
              #4ADE80 152px,
              #000000 152px,
              #000000 154px
            )`,
            backgroundSize: '300px 300px',
          }}
        />
      </div>
      {/* Inner content */}
      <div className="relative bg-background rounded-xl border-2 border-foreground">
        {children}
      </div>
    </div>
  );
}

// Single stripe rainbow bar (horizontal)
export function RainbowStripeBar({ className }: { className?: string }) {
  return (
    <div className={cn("h-2 w-full overflow-hidden", className)}>
      <div 
        className="h-full w-full"
        style={{
          background: `repeating-linear-gradient(
            90deg,
            #00C1B0 0px,
            #00C1B0 30px,
            #FF4D8D 30px,
            #FF4D8D 60px,
            #FFE23E 60px,
            #FFE23E 90px,
            #3EC9FF 90px,
            #3EC9FF 120px,
            #9B59B6 120px,
            #9B59B6 150px,
            #4ADE80 150px,
            #4ADE80 180px,
            #FF8B4D 180px,
            #FF8B4D 210px
          )`,
        }}
      />
    </div>
  );
}

// Vertical rainbow strips for sides
export function SideRainbowStrips() {
  const colors = [
    'bg-[#00C1B0]', // teal
    'bg-[#000000]', // black
    'bg-[#FF4D8D]', // pink
    'bg-[#FFE23E]', // yellow
    'bg-[#3EC9FF]', // blue
    'bg-[#9B59B6]', // purple
    'bg-[#FF8B4D]', // orange
    'bg-[#4ADE80]', // green
  ];

  return (
    <>
      {/* Left side strips */}
      <div className="fixed left-0 top-0 bottom-0 w-8 hidden lg:flex flex-col z-40">
        {colors.map((color, i) => (
          <div key={`left-${i}`} className={cn("flex-1", color)} />
        ))}
      </div>
      {/* Right side strips */}
      <div className="fixed right-0 top-0 bottom-0 w-8 hidden lg:flex flex-col z-40">
        {[...colors].reverse().map((color, i) => (
          <div key={`right-${i}`} className={cn("flex-1", color)} />
        ))}
      </div>
    </>
  );
}
