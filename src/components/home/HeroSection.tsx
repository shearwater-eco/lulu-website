import { ArrowRight, Package } from "lucide-react";
import { Link } from "react-router-dom";
import luluMascotThumbsUp from "@/assets/lulu-mascot-thumbs-up.png";
import ziggyAlien from "@/assets/ziggy-alien.png";

const HeroSection = () => {
  return (
    <section className="relative pt-0 pb-8 lg:pb-12 overflow-hidden">
      {/* LULU logo */}
      <div className="mb-4 text-center">
        <span className="text-6xl md:text-8xl font-bold logo-mosaic">LULU</span>
      </div>

      <p className="text-xl lg:text-2xl text-muted-foreground font-medium lulu-subtitle text-center mb-6">
        Big value loo roll for everyday homes
      </p>

      <div className="container mx-auto px-4">
        {/* Scene: Lulu on cliff, product central, Ziggy in saucer */}
        <div className="relative flex items-end justify-center min-h-[320px] lg:min-h-[400px] mb-8">
          
          {/* Cliff / ground element */}
          <div className="absolute bottom-0 left-0 right-0 h-16 lg:h-20 rounded-t-[50%] border-t-3 border-black"
            style={{ background: `linear-gradient(180deg, hsl(var(--tile-green) / 0.3) 0%, hsl(var(--tile-lime) / 0.15) 100%)` }}
          />

          {/* Lulu standing on cliff - left side */}
          <div className="absolute left-2 lg:left-8 bottom-12 lg:bottom-16 z-20 animate-float-slow">
            <img 
              src={luluMascotThumbsUp} 
              alt="Lulu the mascot standing proudly"
              className="w-28 lg:w-44 drop-shadow-lg"
              width={176}
              height={176}
            />
          </div>

          {/* Product box - large and central */}
          <div className="relative z-10 animate-pop-in">
            <div className="mosaic-border-small rounded-3xl bg-white w-48 h-56 lg:w-64 lg:h-72 flex items-center justify-center shadow-lg">
              <div className="text-center text-muted-foreground">
                <Package className="h-20 w-20 mx-auto mb-3 opacity-50" />
                <p className="text-sm font-bold opacity-70 lulu-title">Val-U-Smart</p>
                <p className="text-xs opacity-50">24 Rolls</p>
              </div>
            </div>
          </div>

          {/* Ziggy in flying saucer - right side, floating */}
          <div className="absolute right-0 lg:right-6 top-0 lg:top-4 z-20 animate-saucer-hover">
            <div className="animate-saucer-glow">
              <img 
                src={ziggyAlien} 
                alt="Ziggy the friendly alien in a flying saucer"
                className="w-24 lg:w-36 drop-shadow-lg"
                width={144}
                height={144}
              />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <button className="btn-lulu-primary flex items-center hover:animate-bounce-hover">
                Shop 24 Rolls
                <ArrowRight className="ml-2 h-5 w-5" />
              </button>
            </Link>
            <Link to="/shop">
              <button className="btn-lulu-secondary hover:animate-bounce-hover">
                See 48 Rolls
              </button>
            </Link>
          </div>
          <p className="text-lg text-foreground font-semibold lulu-subtitle">
            Soft. Strong. Smart value.
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
