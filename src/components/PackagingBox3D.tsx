import { useState, useEffect } from "react";
import luluFrontPanel from "@/assets/lulu-front-panel.png";
import luluBackPanel from "@/assets/lulu-back-panel.png";
import luluSidePanel from "@/assets/lulu-side-panel.png";
import valUSmartLogo from "@/assets/val-u-smart-logo.png";

const PackagingBox3D = () => {
  const [rotateY, setRotateY] = useState(20);
  const [rotateX, setRotateX] = useState(-10);
  const [autoRotate, setAutoRotate] = useState(true);

  useEffect(() => {
    if (!autoRotate) return;
    
    const interval = setInterval(() => {
      setRotateY(prev => (prev + 0.5) % 360);
    }, 30);

    return () => clearInterval(interval);
  }, [autoRotate]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (autoRotate) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientY - rect.top) / rect.height - 0.5) * -40;
    const y = ((e.clientX - rect.left) / rect.width - 0.5) * 40;
    
    setRotateX(x);
    setRotateY(y);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <div 
        className="w-full max-w-2xl aspect-square perspective-[1000px] cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setAutoRotate(false)}
        onMouseLeave={() => setAutoRotate(true)}
      >
        <div 
          className="relative w-full h-full preserve-3d transition-transform duration-100 ease-out"
          style={{
            transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Front Face */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{
              transform: 'translateZ(100px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <img 
              src={luluFrontPanel} 
              alt="Lulu Front Panel" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Back Face */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{
              transform: 'translateZ(-100px) rotateY(180deg)',
              transformStyle: 'preserve-3d'
            }}
          >
            <img 
              src={luluBackPanel} 
              alt="Lulu Back Panel" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Right Side */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{
              transform: 'rotateY(90deg) translateZ(100px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <img 
              src={luluSidePanel} 
              alt="Lulu Side Panel" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Left Side */}
          <div 
            className="absolute inset-0 backface-hidden"
            style={{
              transform: 'rotateY(-90deg) translateZ(100px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <img 
              src={luluSidePanel} 
              alt="Lulu Side Panel" 
              className="w-full h-full object-contain drop-shadow-2xl"
            />
          </div>

          {/* Top Face */}
          <div 
            className="absolute inset-0 backface-hidden bg-white/90"
            style={{
              transform: 'rotateX(90deg) translateZ(100px)',
              transformStyle: 'preserve-3d'
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <img 
                src={valUSmartLogo} 
                alt="Val-U-Smart Logo" 
                className="w-1/2 object-contain"
              />
            </div>
          </div>

          {/* Bottom Face */}
          <div 
            className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary/5 to-secondary/5"
            style={{
              transform: 'rotateX(-90deg) translateZ(100px)',
              transformStyle: 'preserve-3d'
            }}
          />
        </div>
      </div>
      
      <p className="text-sm text-muted-foreground text-center animate-pulse">
        {autoRotate ? "Hover to interact • Auto-rotating" : "Drag to rotate • Move mouse to explore"}
      </p>
    </div>
  );
};

export default PackagingBox3D;
