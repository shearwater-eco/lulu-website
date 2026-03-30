import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";

const floatingLabels = [
  { text: "24 Rolls", color: "tile-teal", position: "top-4 -left-4 lg:-left-8 rotate-[-6deg]" },
  { text: "Smart Value", color: "tile-green", position: "top-12 -right-4 lg:-right-8 rotate-[4deg]" },
  { text: "Soft & Strong", color: "tile-pink", position: "bottom-16 -left-4 lg:-left-6 rotate-[-3deg]" },
];

const ProductShowcase = () => {
  return (
    <section className="py-10 lg:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center">
          
          {/* Poster-style product display */}
          <div className="relative inline-block mb-8">
            {/* Floating labels */}
            {floatingLabels.map((label, i) => (
              <div
                key={i}
                className={`absolute ${label.position} z-20 animate-float px-4 py-2 rounded-xl border-2 border-black text-white font-bold text-sm lulu-title shadow-md`}
                style={{
                  backgroundColor: `hsl(var(--${label.color}))`,
                  animationDelay: `${i * 0.5}s`,
                }}
              >
                {label.text}
              </div>
            ))}

            {/* Main product image area */}
            <div className="relative bg-white rounded-3xl border-3 border-black p-8 lg:p-12 shadow-lg">
              <div className="w-56 h-64 lg:w-72 lg:h-80 flex items-center justify-center mx-auto">
                <div className="text-center text-muted-foreground">
                  <Package className="h-24 w-24 lg:h-32 lg:w-32 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-bold lulu-title opacity-70">Val-U-Smart</p>
                  <p className="text-3xl lg:text-4xl font-black mt-2" style={{ color: 'hsl(var(--tile-teal))' }}>
                    £11.99
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Subscribe & Save callout */}
          <div className="inline-block border-2 border-black rounded-xl p-4 mb-6 max-w-md mx-auto transform rotate-[-1deg]"
            style={{ backgroundColor: 'hsl(var(--tile-yellow) / 0.2)' }}
          >
            <p className="font-bold text-foreground text-sm lulu-title">🎉 Subscribe & Save</p>
            <p className="text-xs text-muted-foreground mt-1">
              10% off + 11th box FREE + no price increases for your next 10 boxes
            </p>
          </div>

          <p className="text-xl text-foreground font-bold lulu-title mb-6">
            No fuss. Just a smart buy.
          </p>

          <Link to="/shop">
            <button className="btn-lulu-primary flex items-center justify-center mx-auto text-lg hover:animate-bounce-hover">
              Buy Now – Free Delivery
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
