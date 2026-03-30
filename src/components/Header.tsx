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
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <div className="mosaic-border-thick rounded-lg p-3 bg-white">
                <span className="text-4xl font-bold logo-mosaic">LULU</span>
              </div>
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center space-x-6">
              {navItems.map(item => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`font-bold text-sm transition-all border-b-3 border-transparent hover:border-current ${
                    item.primary
                      ? "px-4 py-2 rounded-lg text-white border-2 border-black"
                      : "text-foreground"
                  }`}
                  style={item.primary ? { backgroundColor: `hsl(var(--${item.color}))` } : undefined}
                  onMouseEnter={e => {
                    if (!item.primary) {
                      e.currentTarget.style.color = `hsl(var(--${item.color}))`;
                      e.currentTarget.style.borderBottomColor = `hsl(var(--${item.color}))`;
                    }
                  }}
                  onMouseLeave={e => {
                    if (!item.primary) {
                      e.currentTarget.style.color = 'hsl(var(--foreground))';
                      e.currentTarget.style.borderBottomColor = 'transparent';
                    }
                  }}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

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
