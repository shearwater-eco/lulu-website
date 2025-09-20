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

  return (
    <div className={`grid grid-cols-2 md:grid-cols-4 gap-4 ${className}`}>
      {badges.map((badge, index) => {
        const Icon = badge.icon;
        return (
          <div
            key={index}
            className="flex flex-col items-center text-center p-4 rounded-lg bg-card border mosaic-border animate-fade-in"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className={`p-3 rounded-full bg-muted mb-3 ${badge.color}`}>
              <Icon className="h-6 w-6" />
            </div>
            <h4 className="font-semibold text-sm text-foreground mb-1">
              {badge.title}
            </h4>
            <p className="text-xs text-muted-foreground">
              {badge.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default EcoBadges;