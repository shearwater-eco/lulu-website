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
        <div className="container px-4 pt-3 pb-0 mx-0 my-0 py-0">
          <div className="flex items-center justify-between h-16">
            {/* THE BEST TP IN THE UNIVERSE - now in header */}
            <Link to="/" className="flex items-center">
              <span 
                className="font-black uppercase tracking-wider animate-pulse flex-1 text-center"
                style={{ 
                  fontSize: 'clamp(1rem, 3.5vw, 2.2rem)',
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
                }}
              >
                THE BEST TP IN THE UNIVERSE
              </span>
            </Link>

            {/* Right actions */}
            <div className="flex items-center space-x-3">
              <Button variant="ghost" size="icon" className="mosaic-border p-2">
                <Search className="h-5 w-5" />
              </Button>
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
        </div>
      </div>
    </header>
  );
};

export default Header;
