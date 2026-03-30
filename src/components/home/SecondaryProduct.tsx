import { Link } from "react-router-dom";
import { Package } from "lucide-react";

const SecondaryProduct = () => {
  return (
    <section className="py-6">
      <div className="container mx-auto px-4">
        <div className="max-w-lg mx-auto flex items-center gap-5 py-5 px-6 rounded-2xl border-2 border-black transform rotate-[0.5deg]"
          style={{ background: 'linear-gradient(135deg, hsl(var(--tile-pink) / 0.08) 0%, hsl(var(--tile-orange) / 0.06) 100%)' }}
        >
          <div className="p-3 rounded-xl border-2 border-black bg-tile-pink text-white flex-shrink-0">
            <Package className="h-6 w-6" />
          </div>
          <div className="flex-1">
            <p className="font-bold text-foreground lulu-title text-base">
              Need more? Grab the 48 pack.
            </p>
            <p className="text-sm text-muted-foreground lulu-subtitle">
              Even better value per roll.
            </p>
          </div>
          <Link to="/shop" className="flex-shrink-0">
            <button className="btn-lulu-secondary text-xs px-4 py-2">
              View
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default SecondaryProduct;
