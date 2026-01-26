export function RainbowWaveFooter() {
  return (
    <div className="relative h-8 overflow-hidden">
      <svg
        viewBox="0 0 1440 48"
        className="absolute bottom-0 w-full h-full"
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id="rainbowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="hsl(var(--primary))" />
            <stop offset="25%" stopColor="hsl(var(--secondary))" />
            <stop offset="50%" stopColor="hsl(var(--accent))" />
            <stop offset="75%" stopColor="hsl(var(--primary))" />
            <stop offset="100%" stopColor="hsl(var(--secondary))" />
          </linearGradient>
        </defs>
        <path
          d="M0,24 C120,36 240,12 360,24 C480,36 600,12 720,24 C840,36 960,12 1080,24 C1200,36 1320,12 1440,24 L1440,48 L0,48 Z"
          fill="url(#rainbowGradient)"
          opacity="0.3"
        />
        <path
          d="M0,32 C120,44 240,20 360,32 C480,44 600,20 720,32 C840,44 960,20 1080,32 C1200,44 1320,20 1440,32 L1440,48 L0,48 Z"
          fill="url(#rainbowGradient)"
          opacity="0.5"
        />
      </svg>
    </div>
  );
}
