import { useState } from "react";
import { Menu, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { CartSheet } from "./CartSheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Shop", href: "/shop", primary: true },
    { name: "24 Rolls", href: "/shop" },
    { name: "48 Rolls", href: "/shop" },
    { name: "Watch the Ad", href: "/about" },
    { name: "About Lulu", href: "/about" },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b-4 border-foreground">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-3xl font-black logo-mosaic tracking-tight">LULU</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map(item => (
              <Link
                key={item.name}
                to={item.href}
                className={`font-bold text-sm transition-colors ${
                  item.primary
                    ? "bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-3">
            <CartSheet />

            {/* Mobile menu */}
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[280px] bg-white">
                <div className="flex flex-col gap-3 mt-8">
                  {navItems.map(item => (
                    <Link
                      key={item.name}
                      to={item.href}
                      className={`font-bold text-lg p-3 rounded-lg transition-colors ${
                        item.primary
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
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
    </header>
  );
};

export default Header;
