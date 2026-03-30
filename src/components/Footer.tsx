import { Mail, MapPin, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  const linkColors = ['tile-green', 'tile-pink', 'tile-orange', 'tile-blue', 'tile-teal', 'tile-purple'];

  return (
    <footer className="relative mt-16">
      <div className="mosaic-border-curved-bottom bg-white relative">
        <div className="container mx-auto px-4 pt-12 pb-20">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div>
              <div className="mosaic-border-thick rounded-lg p-3 bg-white inline-block mb-4">
                <span className="text-2xl font-bold logo-mosaic">LULU</span>
              </div>
              <p className="text-muted-foreground mb-4 font-medium text-sm">
                The best TP in the universe. Simple, fun, and smart value for everyday homes.
              </p>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="mosaic-border text-white" style={{ backgroundColor: 'hsl(var(--tile-green))' }}>
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="mosaic-border text-white" style={{ backgroundColor: 'hsl(var(--tile-pink))' }}>
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="mosaic-border text-white" style={{ backgroundColor: 'hsl(var(--tile-blue))' }}>
                  <Twitter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Shop */}
            <div>
              <h4 className="font-bold text-foreground mb-4 text-lg">Shop</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { name: "24 Rolls", href: "/shop", ci: 0 },
                  { name: "48 Rolls", href: "/shop", ci: 1 },
                  { name: "Subscribe & Save", href: "/shop", ci: 2 },
                ].map(item => (
                  <li key={item.name}>
                    <Link 
                      to={item.href} 
                      className="text-muted-foreground hover:text-primary transition-colors font-medium border-l-4 border-transparent hover:border-current pl-2"
                      onMouseEnter={e => {
                        e.currentTarget.style.borderLeftColor = `hsl(var(--${linkColors[item.ci]}))`;
                        e.currentTarget.style.color = `hsl(var(--${linkColors[item.ci]}))`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderLeftColor = 'transparent';
                        e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Help */}
            <div>
              <h4 className="font-bold text-foreground mb-4 text-lg">Help</h4>
              <ul className="space-y-2 text-sm">
                {[
                  { name: "Delivery & Returns", href: "/contact", ci: 3 },
                  { name: "FAQs", href: "/contact", ci: 4 },
                  { name: "Contact", href: "/contact", ci: 5 },
                ].map(item => (
                  <li key={item.name}>
                    <Link 
                      to={item.href} 
                      className="text-muted-foreground hover:text-primary transition-colors font-medium border-l-4 border-transparent hover:border-current pl-2"
                      onMouseEnter={e => {
                        e.currentTarget.style.borderLeftColor = `hsl(var(--${linkColors[item.ci]}))`;
                        e.currentTarget.style.color = `hsl(var(--${linkColors[item.ci]}))`;
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.borderLeftColor = 'transparent';
                        e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
                      }}
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About & Newsletter */}
            <div>
              <h4 className="font-bold text-foreground mb-4 text-lg">About</h4>
              <ul className="space-y-2 text-sm mb-4">
                <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors font-medium">About Lulu</Link></li>
                <li><Link to="/sustainability" className="text-muted-foreground hover:text-primary transition-colors font-medium">Sustainability</Link></li>
              </ul>
              <div className="space-y-3">
                <Input type="email" placeholder="Your email" className="mosaic-border bg-white" />
                <Button className="btn-hero w-full">Subscribe</Button>
              </div>
              <div className="mt-4 text-sm">
                <Link to="/contact" className="block text-muted-foreground hover:text-primary transition-colors font-medium">
                  <Mail className="h-4 w-4 inline mr-2" />
                  hello@lulu.earth
                </Link>
              </div>
            </div>
          </div>

          <div className="mosaic-border-thick mt-8 pt-6 text-center bg-white rounded-xl">
            <p className="text-muted-foreground font-medium">© 2026 LULU. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
