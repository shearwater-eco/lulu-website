import { useState, useEffect } from "react";
import { Menu, User, Search, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link, useLocation } from "react-router-dom";
import { CartSheet } from "./CartSheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isAsdaPage = location.pathname === "/asda";

  useEffect(() => {
    if (!isAsdaPage) return;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, isAsdaPage]);

  const navItems = [
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Business", href: "/business" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className={`sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-foreground/10 transition-transform duration-300 ${isAsdaPage && !isVisible ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="container px-4">
        <div className="flex items-center justify-between h-14">
          {/* Logo - compact */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold font-serif tracking-tight">LULU</span>
          </Link>

          {/* Desktop nav - minimal */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link 
                key={item.name} 
                to={item.href} 
                className="text-sm font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" className="hidden sm:flex h-8 w-8 p-0">
              <Search className="h-4 w-4" />
            </Button>
            <CartSheet />
            <Link to="/account">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <User className="h-4 w-4" />
              </Button>
            </Link>
            <Link to="/admin" className="hidden sm:block">
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Settings className="h-4 w-4" />
              </Button>
            </Link>

            {/* Mobile menu trigger */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-background">
                <div className="flex flex-col gap-4 mt-8">
                  {navItems.map(item => (
                    <Link 
                      key={item.name} 
                      to={item.href} 
                      className="text-lg font-medium text-foreground hover:text-primary transition-colors py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>
                  ))}
                  <div className="border-t pt-4 mt-4 space-y-2">
                    <Link 
                      to="/account" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User className="h-4 w-4" />
                      Account
                    </Link>
                    <Link 
                      to="/admin" 
                      className="flex items-center gap-2 text-muted-foreground hover:text-foreground py-2"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <Settings className="h-4 w-4" />
                      Admin
                    </Link>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;