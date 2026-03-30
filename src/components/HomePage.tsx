import { ArrowRight, Truck, Shield, Package, Star, Leaf, Recycle, TreePine, Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import luluMascotThumbsUp from "@/assets/lulu-mascot-thumbs-up.png";
import ziggyAlien from "@/assets/ziggy-alien.png";
import HeroSection from "@/components/home/HeroSection";
import ProductShowcase from "@/components/home/ProductShowcase";
import SecondaryProduct from "@/components/home/SecondaryProduct";
import MeetLulu from "@/components/home/MeetLulu";
import ZiggyCampaign from "@/components/home/ZiggyCampaign";
import ValueStrip from "@/components/home/ValueStrip";
import EcoSection from "@/components/home/EcoSection";

const HomePage = () => {
  return (
    <div className="lulu-frame">
      <div className="lulu-package">
        <div className="right-border"></div>
        <div className="bottom-border"></div>
        
        {/* NAV BAR */}
        <div className="flex items-center justify-end gap-3 md:gap-5 px-4 py-3 my-2">
          <nav className="flex items-center gap-2 md:gap-3">
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
                className="font-bold text-xs md:text-sm uppercase whitespace-nowrap px-3 py-1.5 rounded-md border-2 border-black transition-all text-white hover:scale-105"
                style={{ backgroundColor: `hsl(var(--${item.color}))` }}
              >
                {item.name}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2 ml-2">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Facebook className="h-4 w-4" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Instagram className="h-4 w-4" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Twitter className="h-4 w-4" />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-foreground hover:text-primary transition-colors">
              <Youtube className="h-4 w-4" />
            </a>
          </div>
        </div>
        
        <div className="lulu-content">
          <HeroSection />
          <ValueStrip />
          <ProductShowcase />
          <SecondaryProduct />
          <MeetLulu />
          <ZiggyCampaign />
          <EcoSection />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
