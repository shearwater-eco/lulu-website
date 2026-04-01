import { ArrowRight, Truck, Shield, Package, Star, Leaf, Recycle, TreePine, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
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

const HomePage = () => {
  return (
    <div className="lulu-frame">
      <div className="lulu-package">
        <div className="right-border"></div>
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
          <div className="flex items-center h-full">
            {[
              { icon: Facebook, href: "https://facebook.com" },
              { icon: Instagram, href: "https://instagram.com" },
              { icon: Twitter, href: "https://twitter.com" },
              { icon: Youtube, href: "https://youtube.com" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="h-full flex items-center justify-center px-1 sm:px-1.5 lg:px-2 text-white hover:scale-110 transition-all"
              >
                <item.icon className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4 drop-shadow-md" />
              </a>
            ))}
          </div>
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
