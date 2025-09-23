import recycledPlasticLogo from "@/assets/100-recycled-plastic.png";
import treFreeLogo from "@/assets/tree-free.png";
import zeroPlasticLogo from "@/assets/zero-plastic.png";
import zeroWasteLogo from "@/assets/zero-waste.png";

const EcoBadges = ({ className = "" }: { className?: string }) => {
  const badges = [
    {
      image: recycledPlasticLogo,
      title: "100% RECYCLED",
      description: "Plastic packaging",
      color: "text-primary"
    },
    {
      image: treFreeLogo,
      title: "TREE-FREE",
      description: "Sustainable source",
      color: "text-success"
    },
    {
      image: zeroPlasticLogo,
      title: "ZERO PLASTIC",
      description: "Product content",
      color: "text-info"
    },
    {
      image: zeroWasteLogo,
      title: "ZERO WASTE",
      description: "Reused or recycled",
      color: "text-warning"
    }
  ];

  const tileColors = ['tile-green', 'tile-pink', 'tile-yellow', 'tile-blue'];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {badges.map((badge, index) => {
        const colorVar = tileColors[index];
        return (
          <div
            key={index}
            className="card-lulu flex flex-col items-center text-center p-6 rounded-xl animate-fade-in hover:transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div 
              className="p-4 rounded-full mb-4 text-white border-2 border-black flex items-center justify-center"
              style={{ backgroundColor: `hsl(var(--${colorVar}))` }}
            >
              <img 
                src={badge.image} 
                alt={badge.title}
                className="h-12 w-12 object-contain"
              />
            </div>
            <h4 className="lulu-title text-sm text-foreground mb-2">
              {badge.title}
            </h4>
            <p className="text-sm text-muted-foreground">
              {badge.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default EcoBadges;