import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Footer = () => {
  const linkColors = [
    'vibrant-green', 'secondary', 'accent', 'vibrant-blue', 
    'vibrant-orange', 'vibrant-purple', 'vibrant-lime', 'vibrant-coral'
  ];

  return (
    <footer className="section-mosaic border-t-8 border-mosaic mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="mosaic-border-thick rounded-lg p-4 bg-white">
                <span className="text-2xl font-bold logo-mosaic">LULU</span>
              </div>
            </div>
            <p className="text-muted-foreground mb-4 font-medium">
              Welsh sustainable paper products that are gentle on you and kind to the Earth.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="mosaic-border bg-vibrant-green text-white hover:bg-vibrant-green/90">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="mosaic-border bg-secondary text-white hover:bg-secondary/90">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="mosaic-border bg-accent text-white hover:bg-accent/90">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h4 className="font-bold text-foreground mb-4 text-lg">Shop</h4>
            <ul className="space-y-3">
              {[
                { name: "Toilet Tissue", href: "/shop", colorIndex: 0 },
                { name: "Kitchen Rolls", href: "/shop", colorIndex: 1 },
                { name: "Facial Tissues", href: "/shop", colorIndex: 2 },
                { name: "Bulk Orders", href: "/shop", colorIndex: 3 }
              ].map((item, index) => (
                <li key={item.name}>
                  <Link 
                    to={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors font-medium border-l-4 border-transparent hover:border-current pl-2"
                    style={{ ['--hover-border-color' as any]: `hsl(var(--${linkColors[item.colorIndex]}))` }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderLeftColor = `hsl(var(--${linkColors[item.colorIndex]}))`;
                      e.currentTarget.style.color = `hsl(var(--${linkColors[item.colorIndex]}))`;
                    }}
                    onMouseLeave={(e) => {
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

          <div>
            <h4 className="font-bold text-foreground mb-4 text-lg">Company</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", href: "/about", colorIndex: 4 },
                { name: "Sustainability", href: "/sustainability", colorIndex: 5 },
                { name: "Business", href: "/business", colorIndex: 6 },
                { name: "Blog", href: "/blog", colorIndex: 7 }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    to={item.href} 
                    className="text-muted-foreground hover:text-primary transition-colors font-medium border-l-4 border-transparent hover:border-current pl-2"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderLeftColor = `hsl(var(--${linkColors[item.colorIndex]}))`;
                      e.currentTarget.style.color = `hsl(var(--${linkColors[item.colorIndex]}))`;
                    }}
                    onMouseLeave={(e) => {
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

          <div>
            <h4 className="font-bold text-foreground mb-4 text-lg">Join the Flock</h4>
            <p className="text-muted-foreground mb-4 font-medium">
              Get the latest updates on new products and sustainability tips from Lulu!
            </p>
            <div className="space-y-3">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="mosaic-border bg-white"
              />
              <Button className="btn-hero w-full">
                Subscribe
              </Button>
            </div>
            <div className="mt-4 space-y-2 text-sm">
              <Link to="/contact" className="block text-muted-foreground hover:text-vibrant-turquoise transition-colors font-medium">
                <Mail className="h-4 w-4 inline mr-2" />
                hello@lulu.earth
              </Link>
              <div className="text-muted-foreground">
                <MapPin className="h-4 w-4 inline mr-2" />
                Made in Wales, UK
              </div>
            </div>
          </div>
        </div>

        <div className="mosaic-border-thick mt-8 pt-8 text-center bg-white rounded-xl">
          <p className="text-muted-foreground font-medium text-lg">
            © 2024 LULU. All rights reserved. Made with ❤️ in Wales.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;