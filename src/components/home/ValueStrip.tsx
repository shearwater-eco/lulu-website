import { Package, Star, Truck, Shield } from "lucide-react";

const ValueStrip = () => {
  const items = [
    { icon: Package, text: "24 Rolls. No nonsense.", delay: "0s" },
    { icon: Star, text: "Great everyday value", delay: "0.1s" },
    { icon: Truck, text: "Delivered to your door", delay: "0.2s" },
    { icon: Shield, text: "Soft & strong", delay: "0.3s" },
  ];

  return (
    <section className="py-6 my-4">
      <div className="mosaic-border-small rounded-2xl bg-white p-5 mx-4">
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
          {items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 animate-fade-in"
              style={{ animationDelay: item.delay, animationFillMode: "backwards" }}
            >
              <div
                className="p-2.5 rounded-lg text-white border-2 border-black flex-shrink-0"
                style={{ backgroundColor: `hsl(var(--tile-teal))` }}
              >
                <item.icon className="h-5 w-5" />
              </div>
              <p className="font-bold text-foreground text-sm lulu-title whitespace-nowrap">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ValueStrip;
