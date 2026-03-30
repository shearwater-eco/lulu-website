import { useState } from "react";
import { Menu, User, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { CartSheet } from "./CartSheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Shop", href: "/shop", color: "tile-teal", primary: true },
    { name: "24 Rolls", href: "/shop", color: "tile-green" },
    { name: "48 Rolls", href: "/shop", color: "tile-pink" },
    { name: "Watch the Ad", href: "/about", color: "tile-orange" },
    { name: "About Lulu", href: "/about", color: "tile-blue" },
  ];

  return (
    <header className="relative sticky top-0 z-50 backdrop-blur">
      <div className="mosaic-border-curved-top bg-white relative">
        <div className="container px-4 pt-1 pb-1 mx-0 my-0">
          <div className="flex flex-col relative">
            {/* Top row: search, main title, cart */}
            <div className="flex items-center justify-center relative">
              <div className="flex items-center space-x-3 absolute left-0">
                <Button variant="ghost" size="icon" className="mosaic-border p-2">
                  <Search className="h-5 w-5" />
                </Button>
              </div>

              <Link to="/" className="flex items-center flex-1 justify-center px-16">
                <span 
                  className="font-black uppercase tracking-wider animate-pulse text-center"
                  style={{ 
                    fontSize: 'clamp(1.2rem, 4vw, 2.8rem)',
                    background: `linear-gradient(90deg, 
                      hsl(var(--tile-green)), 
                      hsl(var(--tile-pink)), 
                      hsl(var(--tile-orange)), 
                      hsl(var(--tile-yellow)), 
                      hsl(var(--tile-blue)), 
                      hsl(var(--tile-teal)), 
                      hsl(var(--tile-lime)), 
                      hsl(var(--tile-coral)), 
                      hsl(var(--tile-purple)), 
                      hsl(var(--tile-turquoise))
                    )`,
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    WebkitTextStroke: '1px hsl(var(--foreground))',
                    fontFamily: "'Times', 'Times New Roman', serif",
                    letterSpacing: '0.05em',
                    lineHeight: 1.1,
                  }}
                >
                  THE BEST TP IN THE UNIVERSE
                </span>
              </Link>

              <div className="flex items-center space-x-3 absolute right-0">
                <CartSheet />
                
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon" className="mosaic-border p-2">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[280px] bg-white border-l-8 border-mosaic">
                    <div className="flex flex-col space-y-3 mt-8">
                      {navItems.map(item => (
                        <Link
                          key={item.name}
                          to={item.href}
                          className="text-lg font-bold text-foreground hover:text-primary transition-colors p-3 mosaic-border rounded-lg"
                          style={{ borderLeftColor: `hsl(var(--${item.color}))` }}
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Sub-header text */}
            <p 
              className="text-center font-bold uppercase w-full"
              style={{
                fontSize: 'clamp(0.55rem, 1.8vw, 1rem)',
                color: 'hsl(var(--foreground))',
                fontFamily: "'Times', 'Times New Roman', serif",
                letterSpacing: '0.08em',
                lineHeight: 1.2,
              }}
            >
              PRICE LOCK YOUR SAVINGS WITH A FURTHER 10% DISCOUNT, FREE TP AND FREE DELIVERY
            </p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
