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
        
        {/* NAV buttons embedded directly in the top border tiles */}
        <div className="absolute -top-[15px] sm:-top-[25px] lg:-top-[35px] left-[-15px] sm:left-[-25px] lg:left-[-35px] right-[-15px] sm:right-[-25px] lg:right-[-35px] h-[15px] sm:h-[25px] lg:h-[35px] z-30 flex items-center">
          {[
            { name: "SHOP", href: "/shop", color: "tile-teal", left: "42.5%" },
            { name: "24 ROLLS", href: "/shop", color: "tile-green", left: "0%" },
            { name: "48 ROLLS", href: "/shop", color: "tile-pink", left: "8.5%" },
            { name: "WATCH THE AD", href: "/about", color: "tile-orange", left: "17%" },
            { name: "ABOUT LULU", href: "/about", color: "tile-blue", left: "34%" },
          ].map(item => (
            <Link
              key={item.name}
              to={item.href}
              className="absolute font-bold text-[6px] sm:text-[8px] lg:text-[11px] uppercase whitespace-nowrap h-full flex items-center justify-center text-white hover:brightness-110 transition-all border-r border-black/30"
              style={{
                backgroundColor: `hsl(var(--${item.color}))`,
                left: item.left,
                width: '7.5%',
              }}
            >
              {item.name}
            </Link>
          ))}
          {/* Social icons in remaining tiles on the right */}
          <div className="absolute right-0 top-0 h-full flex items-center gap-0">
            {[
              { icon: Facebook, href: "https://facebook.com", left: "76.5%", color: "tile-turquoise" },
              { icon: Instagram, href: "https://instagram.com", left: "84%", color: "tile-mint" },
              { icon: Twitter, href: "https://twitter.com", left: "85%", color: "tile-mint" },
              { icon: Youtube, href: "https://youtube.com", left: "93.5%", color: "tile-magenta" },
            ].map((item, i) => (
              <a
                key={i}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute h-full flex items-center justify-center text-white hover:brightness-110 transition-all"
                style={{ left: item.left, width: '7.5%' }}
              >
                <item.icon className="h-2 w-2 sm:h-3 sm:w-3 lg:h-4 lg:w-4" />
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
