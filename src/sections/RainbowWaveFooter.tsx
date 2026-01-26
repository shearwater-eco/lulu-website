export function RainbowWaveFooter() {
  // EXACT colors from lulu.earth rainbow wave
  const colors = [
    '#4ADE80', // green
    '#FF4D8D', // pink
    '#9B59B6', // purple
    '#FF8B4D', // orange
    '#FFE23E', // yellow
    '#00C1B0', // teal
    '#3EC9FF', // blue
    '#4ADE80', // green
    '#FF4D8D', // pink
    '#9B59B6', // purple
    '#FF8B4D', // orange
    '#00C1B0', // teal
  ];

  return (
    <div className="relative overflow-hidden">
      {/* SVG curved container with rainbow stripes */}
      <svg
        viewBox="0 0 1440 200"
        preserveAspectRatio="none"
        className="w-full h-24 md:h-32"
      >
        <defs>
          <clipPath id="waveClip">
            <path d="M0,100 C360,20 1080,180 1440,100 L1440,200 L0,200 Z" />
          </clipPath>
        </defs>
        
        {/* Rainbow stripes inside wave */}
        <g clipPath="url(#waveClip)">
          {colors.map((color, i) => (
            <rect
              key={i}
              x={i * (1440 / colors.length)}
              y="0"
              width={(1440 / colors.length) + 1}
              height="200"
              fill={color}
            />
          ))}
        </g>
        
        {/* Wave outline */}
        <path
          d="M0,100 C360,20 1080,180 1440,100"
          fill="none"
          stroke="black"
          strokeWidth="3"
        />
      </svg>
    </div>
  );
}
