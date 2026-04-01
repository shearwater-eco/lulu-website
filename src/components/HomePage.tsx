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
        
        {/* NAV buttons on top border - right aligned */}
        <div className="absolute -top-[15px] sm:-top-[25px] lg:-top-[35px] right-[-15px] sm:right-[-25px] lg:right-[-35px] h-[15px] sm:h-[25px] lg:h-[35px] z-30 flex items-center justify-end gap-0">
          {[
            { name: "SHOP", href: "/shop" },
            { name: "24 ROLLS", href: "/shop" },
            { name: "48 ROLLS", href: "/shop" },
            { name: "WATCH THE AD", href: "/about" },
            { name: "ABOUT LULU", href: "/about" },
          ].map(item => (
            <Link
              key={item.name}
              to={item.href}
              className="h-full flex items-center justify-center px-2 sm:px-3 lg:px-5 font-black text-[7px] sm:text-[10px] lg:text-sm uppercase whitespace-nowrap text-white tracking-wider hover:brightness-125 transition-all"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              {item.name}
            </Link>
          ))}
          <div className="h-full flex items-center gap-0">
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
                className="h-full flex items-center justify-center px-1 sm:px-2 text-white hover:brightness-125 transition-all"
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
