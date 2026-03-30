import { Recycle, TreePine, Leaf } from "lucide-react";

const EcoSection = () => {
  const items = [
    { icon: Recycle, text: "Plastic-free packaging", color: "tile-green" },
    { icon: TreePine, text: "Responsibly sourced", color: "tile-teal" },
    { icon: Leaf, text: "Lower impact", color: "tile-lime" },
  ];

  return (
    <section className="py-8 lg:py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto text-center space-y-5">
          <p className="text-muted-foreground lulu-subtitle text-base lg:text-lg opacity-70">
            Gentle on you, kind to the planet
          </p>
          <div className="flex justify-center gap-6 lg:gap-10">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group">
                <div className="p-2 rounded-lg border border-black/20 transition-all group-hover:scale-110 group-hover:border-black"
                  style={{ backgroundColor: `hsl(var(--${item.color}) / 0.1)` }}
                >
                  <item.icon className="h-5 w-5" style={{ color: `hsl(var(--${item.color}))` }} />
                </div>
                <p className="text-[11px] text-muted-foreground font-medium leading-tight">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoSection;
