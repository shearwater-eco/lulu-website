import { Leaf, Recycle, TreePine, Award } from "lucide-react";

const EcoBadges = ({ className = "" }: { className?: string }) => {
  const badges = [
    {
      icon: Leaf,
      title: "Plastic-Free",
      description: "100% plastic-free packaging",
      color: "text-success"
    },
    {
      icon: TreePine,
      title: "FSC Certified",
      description: "Responsibly sourced paper",
      color: "text-primary"
    },
    {
      icon: Recycle,
      title: "Low Carbon",
      description: "Minimal environmental impact",
      color: "text-info"
    },
    {
      icon: Award,
      title: "Chemical-Free",
      description: "No harmful chemicals",
      color: "text-warning"
    }
  ];

  const mosaicColors = ['mosaic-green', 'mosaic-pink', 'mosaic-yellow', 'mosaic-blue'];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        const colorVar = mosaicColors[index];
        return (
          <div
            key={index}
            className="card-lulu flex flex-col items-center text-center p-6 rounded-xl animate-fade-in hover:transform hover:scale-105 transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div 
              className="p-4 rounded-full mb-4 text-white border-2 border-black"
              style={{ backgroundColor: `hsl(var(--${colorVar}))` }}
            >
              <Icon className="h-8 w-8" />
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