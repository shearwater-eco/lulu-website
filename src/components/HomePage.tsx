import { ArrowRight, Truck, Shield, Package, Star, Leaf, Recycle, TreePine, Facebook, Instagram } from "lucide-react";
import { Link } from "react-router-dom";
import luluMascotThumbsUp from "@/assets/lulu-mascot-thumbs-up.png";
import pluAlien from "@/assets/plu-alien.png";
import HeroSection from "@/components/home/HeroSection";
import ProductShowcase from "@/components/home/ProductShowcase";
import SecondaryProduct from "@/components/home/SecondaryProduct";
import MeetLulu from "@/components/home/MeetLulu";
import PLUCampaign from "@/components/home/ZiggyCampaign";
import ValueStrip from "@/components/home/ValueStrip";
import EcoSection from "@/components/home/EcoSection";

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.87a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.01-.3z"/>
  </svg>
);

const HomePage = () => {
  return (
    <div className="lulu-frame">
      <div className="lulu-package">
        <div className="right-border">
          {/* Social media icons running down the right border */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 flex flex-col items-center gap-0 z-10">
            {[
              { icon: Instagram, href: "https://instagram.com", color: "tile-pink" },
              { icon: Facebook, href: "https://facebook.com", color: "tile-blue" },
              { icon: TikTokIcon, href: "https://tiktok.com", color: "tile-teal" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[calc(100%+8px)] sm:w-[calc(100%+10px)] lg:w-[calc(100%+14px)] h-[50px] sm:h-[65px] lg:h-[75px] flex items-center justify-center text-white hover:scale-105 hover:brightness-110 transition-all border-y border-black/40 rounded-l-md"
                style={{
                  backgroundColor: `hsl(var(--${item.color}))`,
                  boxShadow: '-3px 0 6px rgba(0,0,0,0.25)',
                }}
              >
                <item.icon className="h-3 w-3 sm:h-4 sm:w-4 lg:h-5 lg:w-5 drop-shadow-md" />
              </a>
            ))}
          </div>
        </div>
        <div className="bottom-border"></div>
        
        {/* NAV buttons on top border - right aligned, popping out */}
        <div className="absolute -top-[15px] sm:-top-[25px] lg:-top-[35px] left-[-15px] sm:left-[-25px] lg:left-[-35px] right-[-15px] sm:right-[-25px] lg:right-[-35px] h-[15px] sm:h-[25px] lg:h-[35px] z-30 flex items-center justify-end">
          {[
            { name: "SHOP", href: "/shop", color: "tile-teal", width: "lg:w-[100px] sm:w-[65px] w-[42px]" },
            { name: "24 ROLLS", href: "/shop", color: "tile-green", width: "lg:w-[110px] sm:w-[72px] w-[48px]" },
            { name: "48 ROLLS", href: "/shop", color: "tile-pink", width: "lg:w-[110px] sm:w-[72px] w-[48px]" },
            { name: "WATCH THE AD", href: "/about", color: "tile-orange", width: "lg:w-[140px] sm:w-[90px] w-[58px]" },
            { name: "ABOUT LULU", href: "/about", color: "tile-blue", width: "lg:w-[130px] sm:w-[85px] w-[55px]" },
          ].map(item => (
            <Link
              key={item.name}
              to={item.href}
              className={`h-[calc(100%+8px)] sm:h-[calc(100%+10px)] lg:h-[calc(100%+14px)] -mt-[1px] flex items-center justify-center font-black text-[7px] sm:text-[9px] lg:text-[13px] uppercase whitespace-nowrap text-white tracking-wide hover:scale-105 hover:brightness-110 transition-all border-x border-black/40 rounded-b-md ${item.width}`}
              style={{
                backgroundColor: `hsl(var(--${item.color}))`,
                textShadow: '1px 1px 3px rgba(0,0,0,0.6)',
                boxShadow: '0 3px 6px rgba(0,0,0,0.25)',
              }}
            >
              {item.name}
            </Link>
          ))}
        </div>
        
        <div className="lulu-content pt-2">
          <HeroSection />
          <ValueStrip />
          <ProductShowcase />
          <SecondaryProduct />
          <MeetLulu />
          <PLUCampaign />
          <EcoSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
