import { useState } from "react";
import { Menu, X, ShoppingCart, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: "Shop", href: "/shop" },
    { name: "About", href: "/about" },
    { name: "Sustainability", href: "/sustainability" },
    { name: "For Businesses", href: "/business" },
    { name: "Blog", href: "/blog" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-2">
          <div className="mosaic-border rounded-lg">
            <h1 className="text-2xl font-bold text-primary px-3 py-1">LULU</h1>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-foreground hover:text-primary transition-colors font-medium"
            >
              {item.name}
            </a>
          ))}
        </nav>

        {/* Right side actions */}
        <div className="flex items-center space-x-4">
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="relative">
            <ShoppingCart className="h-5 w-5" />
            <span className="absolute -top-2 -right-2 h-4 w-4 rounded-full bg-secondary text-secondary-foreground text-xs flex items-center justify-center">
              0
            </span>
          </Button>

          {/* Mobile menu trigger */}
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-8">
                {navItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="text-lg font-medium text-foreground hover:text-primary transition-colors p-2"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                ))}
                <div className="border-t pt-4 space-y-2">
                  <Button className="w-full justify-start" variant="ghost">
                    <User className="h-5 w-5 mr-2" />
                    My Account
                  </Button>
                  <Button className="w-full justify-start" variant="ghost">
                    <ShoppingCart className="h-5 w-5 mr-2" />
                    Cart (0)
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;