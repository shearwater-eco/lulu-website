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
        
        {/* NAV embedded in top border */}
        <div className="absolute top-0 left-0 right-0 z-30 -translate-y-1/2 flex items-center justify-end gap-2 md:gap-3 px-6 md:px-10">
          <nav className="flex items-center gap-1.5 md:gap-2">
            {[
              { name: "SHOP", href: "/shop", color: "tile-teal" },
              { name: "24 ROLLS", href: "/shop", color: "tile-green" },
              { name: "48 ROLLS", href: "/shop", color: "tile-pink" },
              { name: "WATCH THE AD", href: "/about", color: "tile-orange" },
              { name: "ABOUT LULU", href: "/about", color: "tile-blue" },
            ].map(item => (
              <Link
                key={item.name}
                to={item.href}
                className="font-bold text-[10px] md:text-xs uppercase whitespace-nowrap px-2 md:px-3 py-1 md:py-1.5 rounded-md border-2 border-black transition-all text-white hover:scale-105 shadow-sm"
                style={{ backgroundColor: `hsl(var(--${item.color}))` }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-1.5 ml-1">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-black rounded-full p-1 text-foreground hover:scale-110 transition-transform">
              <Facebook className="h-3 w-3" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-black rounded-full p-1 text-foreground hover:scale-110 transition-transform">
              <Instagram className="h-3 w-3" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-black rounded-full p-1 text-foreground hover:scale-110 transition-transform">
              <Twitter className="h-3 w-3" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="bg-white border-2 border-black rounded-full p-1 text-foreground hover:scale-110 transition-transform">
              <Youtube className="h-3 w-3" />
            </a>
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
