import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import luluMascotThumbsUp from "@/assets/lulu-mascot-thumbs-up.png";

const floatingLabels = [
  { text: "24 Rolls", color: "tile-teal", position: "-top-3 -left-6 lg:-left-12", rotation: "rotate-[-8deg]" },
  { text: "Smart Value", color: "tile-green", position: "top-8 -right-6 lg:-right-14", rotation: "rotate-[5deg]" },
  { text: "Soft & Strong", color: "tile-pink", position: "bottom-20 -left-8 lg:-left-14", rotation: "rotate-[-4deg]" },
  { text: "Free Delivery", color: "tile-orange", position: "bottom-8 -right-4 lg:-right-10", rotation: "rotate-[7deg]" },
];

const ProductShowcase = () => {
  return (
    <section className="py-10 lg:py-14 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[10%] w-20 h-20 rounded-full opacity-10" style={{ background: 'hsl(var(--tile-teal))' }} />
        <div className="absolute bottom-20 right-[8%] w-32 h-32 rounded-full opacity-8" style={{ background: 'hsl(var(--tile-pink))' }} />
        <div className="absolute top-[40%] right-[15%] w-16 h-16 rounded-full opacity-10" style={{ background: 'hsl(var(--tile-yellow))' }} />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="max-w-3xl mx-auto">
          
          {/* Section title — playful */}
          <div className="text-center mb-8">
            <h2 className="lulu-title text-3xl lg:text-4xl inline-block relative">
              The Roll That Does It All
              <div className="absolute -bottom-1 left-0 right-0 h-1.5 rounded-full" style={{ background: 'hsl(var(--tile-teal))' }} />
            </h2>
          </div>

          {/* Poster layout — product + Lulu peeking in */}
          <div className="relative flex justify-center items-center">
            
            {/* Lulu peeking from left */}
            <div className="hidden md:block absolute -left-4 lg:left-0 bottom-0 z-20 animate-float-slow">
              <img 
                src={luluMascotThumbsUp}
                alt="Lulu pointing at the product"
                className="w-24 lg:w-32 drop-shadow-md transform -scale-x-100"
                width={128}
                height={128}
              />
            </div>

            {/* Main product — poster style */}
            <div className="relative">
              {/* Floating labels */}
              {floatingLabels.map((label, i) => (
                <div
                  key={i}
                  className={`absolute ${label.position} z-20 animate-float px-3 py-1.5 lg:px-4 lg:py-2 rounded-xl border-2 border-black text-white font-bold text-xs lg:text-sm lulu-title shadow-lg transform ${label.rotation}`}
                  style={{
                    backgroundColor: `hsl(var(--${label.color}))`,
                    animationDelay: `${i * 0.6}s`,
                  }}
                >
                  {label.text}
                </div>
              ))}

              <div className="bg-white rounded-3xl border-3 border-black p-6 lg:p-10 shadow-xl relative overflow-hidden">
                {/* Subtle diagonal stripe */}
                <div className="absolute top-0 right-0 w-32 h-32 opacity-5 transform rotate-45 translate-x-10 -translate-y-10"
                  style={{ background: 'hsl(var(--tile-teal))' }}
                />
                
                <div className="w-52 h-60 lg:w-64 lg:h-72 flex items-center justify-center mx-auto relative">
                  <div className="text-center">
                    <Package className="h-24 w-24 lg:h-28 lg:w-28 mx-auto mb-3 text-tile-teal opacity-60" />
                    <p className="text-xl lg:text-2xl font-bold lulu-title">Val-U-Smart</p>
                    <p className="text-sm text-muted-foreground mb-2">24 Premium Rolls</p>
                    <p className="text-3xl lg:text-4xl font-black" style={{ color: 'hsl(var(--tile-teal))' }}>
                      £11.99
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Subscribe callout — speech bubble style */}
          <div className="max-w-sm mx-auto mt-8 relative">
            <div className="bg-white border-2 border-black rounded-2xl p-4 shadow-md transform rotate-[-1deg]"
              style={{ backgroundColor: 'hsl(var(--tile-yellow) / 0.15)' }}
            >
              <p className="font-bold text-foreground text-sm lulu-title text-center">🎉 Subscribe & Save</p>
              <p className="text-xs text-muted-foreground mt-1 text-center">
                10% off + 11th box FREE + price locked for 10 boxes
              </p>
            </div>
          </div>

          {/* Tagline + CTA */}
          <div className="text-center mt-8 space-y-5">
            <p className="text-2xl text-foreground font-bold lulu-title">
              No fuss. Just a smart buy.
            </p>
            <Link to="/shop">
              <button className="btn-lulu-primary flex items-center justify-center mx-auto text-lg group">
                Buy Now – Free Delivery
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
