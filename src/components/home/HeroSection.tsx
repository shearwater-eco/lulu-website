import { ArrowRight, Package, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import luluMascotThumbsUp from "@/assets/lulu-mascot-thumbs-up.png";
import pluAlien from "@/assets/plu-alien.png";

const HeroSection = () => {
  return (
    <section className="relative pt-0 pb-6 lg:pb-10 overflow-hidden">
      {/* LULU logo */}
      <div className="-mt-6 lg:-mt-8 mb-2 text-center">
        <span className="text-7xl md:text-9xl font-bold logo-mosaic tracking-tight">LULU</span>
      </div>

      <p className="text-xl lg:text-2xl text-muted-foreground font-medium lulu-subtitle text-center mb-4">
        Big value loo roll for everyday homes
      </p>

      <div className="container mx-auto px-4">
        {/* SCENE — immersive, not a grid */}
        <div className="relative flex items-end justify-center min-h-[340px] lg:min-h-[420px] mb-6">
          
          {/* Sky sparkles */}
          <Sparkles className="absolute top-6 left-[20%] h-5 w-5 text-tile-yellow animate-float opacity-60" />
          <Sparkles className="absolute top-14 right-[25%] h-4 w-4 text-tile-pink animate-float-slow opacity-50" />
          <Sparkles className="absolute top-3 right-[15%] h-3 w-3 text-tile-lime animate-float opacity-40" />

          {/* Rolling hills / cliff */}
          <div className="absolute bottom-0 left-[-5%] right-[-5%] h-24 lg:h-28 rounded-t-[60%] border-t-2 border-black"
            style={{ background: `linear-gradient(180deg, hsl(var(--tile-green) / 0.35) 0%, hsl(var(--tile-lime) / 0.12) 100%)` }}
          />
          <div className="absolute bottom-0 left-[10%] right-[30%] h-16 lg:h-20 rounded-t-[70%]"
            style={{ background: `linear-gradient(180deg, hsl(var(--tile-teal) / 0.15) 0%, transparent 100%)` }}
          />

          {/* LULU — big, standing on the hill, with speech bubble */}
          <div className="absolute left-1 lg:left-6 bottom-16 lg:bottom-20 z-20">
            {/* Speech bubble */}
            <div className="relative mb-2 ml-4 lg:ml-8">
              <div className="bg-white border-2 border-black rounded-2xl px-3 py-1.5 shadow-md transform rotate-[-2deg] animate-pop-in"
                style={{ animationDelay: '0.6s', animationFillMode: 'backwards' }}
              >
                <p className="text-xs lg:text-sm font-bold lulu-title whitespace-nowrap">Smart value! 💪</p>
              </div>
              {/* Bubble tail */}
              <div className="w-3 h-3 bg-white border-b-2 border-r-2 border-black transform rotate-45 ml-6 -mt-1.5" />
            </div>
            <div className="animate-float-slow">
              <img 
                src={luluMascotThumbsUp} 
                alt="Lulu the mascot standing proudly"
                className="w-32 lg:w-48 drop-shadow-xl"
                width={192}
                height={192}
              />
            </div>
          </div>

          {/* PRODUCT — large, central, tilted slightly for energy */}
          <div className="relative z-10 animate-pop-in transform rotate-[1deg]">
            <div className="mosaic-border-small rounded-3xl bg-white w-[300px] h-[345px] lg:w-[408px] lg:h-[456px] flex items-center justify-center shadow-xl"
              style={{ width: 'clamp(300px, 42vw, 408px)', height: 'clamp(345px, 48vw, 456px)' }}
            >
              <div className="text-center">
                <Package className="h-20 w-20 lg:h-24 lg:w-24 mx-auto mb-3 text-tile-teal opacity-60" />
                <p className="text-base lg:text-lg font-bold lulu-title">Val-U-Smart</p>
                <p className="text-sm text-muted-foreground">24 Rolls</p>
                <p className="text-2xl lg:text-3xl font-black mt-1" style={{ color: 'hsl(var(--tile-teal))' }}>£11.99</p>
              </div>
            </div>
            {/* Price starburst */}
            <div className="absolute -top-4 -right-4 lg:-top-5 lg:-right-5 z-30 animate-wiggle">
              <div className="bg-tile-yellow text-foreground border-2 border-black rounded-full w-16 h-16 lg:w-20 lg:h-20 flex items-center justify-center transform rotate-[-8deg] shadow-md">
                <div className="text-center leading-tight">
                  <p className="text-[10px] lg:text-xs font-bold">FROM</p>
                  <p className="text-sm lg:text-base font-black">50p</p>
                  <p className="text-[10px] lg:text-xs font-bold">/roll</p>
                </div>
              </div>
            </div>
          </div>

          {/* P.L.U. — in flying saucer, top right of LULU title */}
          <div className="absolute right-[-5%] lg:right-[2%] -top-[15%] lg:-top-[10%] z-20 animate-saucer-hover">
            <div className="animate-saucer-glow">
              <img 
                src={pluAlien} 
                alt="P.L.U. the friendly alien in a flying saucer"
                className="w-[168px] lg:w-[240px] drop-shadow-2xl"
                width={240}
                height={240}
              />
            </div>
            {/* P.L.U. speech bubble */}
            <div className="absolute -bottom-2 left-0 animate-pop-in" style={{ animationDelay: '1s', animationFillMode: 'backwards' }}>
              <div className="bg-white border-2 border-black rounded-2xl px-2.5 py-1 shadow-md transform rotate-[3deg]">
                <p className="text-[10px] lg:text-xs font-bold lulu-title whitespace-nowrap">Take me to the rolls! 🛸</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTAs — big, bold, immediate */}
        <div className="text-center space-y-3">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/shop">
              <button className="btn-lulu-primary flex items-center text-lg group">
                Shop 24 Rolls
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </button>
            </Link>
            <Link to="/shop">
              <button className="btn-lulu-secondary text-lg">
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
