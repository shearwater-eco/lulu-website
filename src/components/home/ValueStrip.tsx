import { Package, Star, Truck, Shield } from "lucide-react";

const ValueStrip = () => {
  const items = [
    { icon: Package, text: "24 Rolls. No nonsense.", color: "tile-teal", rotation: "rotate-[-2deg]" },
    { icon: Star, text: "Great everyday value", color: "tile-green", rotation: "rotate-[1deg]" },
    { icon: Truck, text: "Delivered to your door", color: "tile-blue", rotation: "rotate-[-1deg]" },
    { icon: Shield, text: "Soft & strong", color: "tile-pink", rotation: "rotate-[2deg]" },
  ];

  return (
    <section className="py-4 my-2">
      <div className="flex flex-wrap justify-center gap-3 lg:gap-5 px-4">
        {items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl border-2 border-black shadow-md transform ${item.rotation} transition-transform hover:scale-110 hover:rotate-0 cursor-default animate-pop-in`}
            style={{
              backgroundColor: `hsl(var(--${item.color}) / 0.12)`,
              animationDelay: `${i * 0.12}s`,
              animationFillMode: "backwards",
            }}
          >
            <div
              className="p-1.5 rounded-md text-white border-2 border-black flex-shrink-0"
              style={{ backgroundColor: `hsl(var(--${item.color}))` }}
            >
              <item.icon className="h-4 w-4" />
            </div>
            <p className="font-bold text-foreground text-xs lg:text-sm lulu-title whitespace-nowrap">{item.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ValueStrip;
