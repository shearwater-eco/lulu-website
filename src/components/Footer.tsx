import { Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 mt-0">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <span className="text-2xl font-black">LULU</span>
            <p className="text-background/70 mt-3 text-sm">
              The best TP in the universe. Simple, fun, and smart value for everyday homes.
            </p>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="font-bold mb-3">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/shop" className="text-background/70 hover:text-background transition-colors">24 Rolls</Link></li>
              <li><Link to="/shop" className="text-background/70 hover:text-background transition-colors">48 Rolls</Link></li>
              <li><Link to="/shop" className="text-background/70 hover:text-background transition-colors">Subscribe & Save</Link></li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="font-bold mb-3">Help</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/contact" className="text-background/70 hover:text-background transition-colors">Delivery & Returns</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-background transition-colors">FAQs</Link></li>
              <li><Link to="/contact" className="text-background/70 hover:text-background transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* About & Social */}
          <div>
            <h4 className="font-bold mb-3">About</h4>
            <ul className="space-y-2 text-sm mb-4">
              <li><Link to="/about" className="text-background/70 hover:text-background transition-colors">About Lulu</Link></li>
              <li><Link to="/sustainability" className="text-background/70 hover:text-background transition-colors">Sustainability</Link></li>
            </ul>
            <div className="flex gap-3">
              <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-background/70 hover:text-background hover:bg-background/10">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6 text-center text-sm text-background/50">
          © 2026 LULU. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
