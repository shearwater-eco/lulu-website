import { Recycle, TreePine, Leaf } from "lucide-react";

const EcoSection = () => {
  const items = [
    { icon: Recycle, text: "Plastic-free packaging" },
    { icon: TreePine, text: "Responsibly sourced" },
    { icon: Leaf, text: "Lower impact" },
  ];

  return (
    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto text-center space-y-6">
          <h2 className="lulu-title text-xl text-muted-foreground">
            Gentle on you, kind to the planet
          </h2>
          <div className="flex justify-center gap-8 lg:gap-12">
            {items.map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 opacity-70">
                <item.icon className="h-6 w-6 text-tile-green" />
                <p className="text-xs text-muted-foreground font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EcoSection;
