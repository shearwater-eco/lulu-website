import { Leaf, Recycle, TreePine, Award } from "lucide-react";

const EcoBadges = ({ className = "" }: { className?: string }) => {
  const badges = [
    {
      icon: () => (
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-current">
            <div className="text-xs font-bold">ECO</div>
          </div>
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 text-xs font-bold">
            SMART
          </div>
        </div>
      ),
      title: "ECO SMART",
      description: "6 ROLLS",
      color: "text-primary"
    },
    {
      icon: TreePine,
      title: "FSC",
      description: "Certified sustainable",
      color: "text-success"
    },
    {
      icon: Recycle,
      title: "100%",
      description: "Recyclable",
      color: "text-info"
    },
    {
      icon: () => (
        <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center border-2 border-current">
          <Leaf className="h-4 w-4 text-green-600" />
        </div>
      ),
      title: "PLASTIC",
      description: "FREE",
      color: "text-warning"
    }
  ];

  const tileColors = ['tile-green', 'tile-pink', 'tile-yellow', 'tile-blue'];

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 ${className}`}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        const colorVar = tileColors[index];
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