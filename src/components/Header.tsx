import { useState } from "react";
import { Menu, X, User, Search, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Link } from "react-router-dom";
import { CartSheet } from "./CartSheet";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [{
    name: "Home",
    href: "/",
    color: "primary"
  }, {
    name: "Shop",
    href: "/shop",
    color: "vibrant-green"
  }, {
    name: "About",
    href: "/about",
    color: "secondary"
  }, {
    name: "Sustainability",
    href: "/sustainability",
    color: "accent"
  }, {
    name: "Business",
    href: "/business",
    color: "vibrant-blue"
  }, {
    name: "Blog",
    href: "/blog",
    color: "vibrant-orange"
  }, {
    name: "Contact",
    href: "/contact",
    color: "vibrant-purple"
  }];
  return <>
      {/* Header with curved mosaic border */}
      <header className="relative sticky top-0 z-50 backdrop-blur">
        <div className="mosaic-border-curved-top bg-white relative">
          <div className="container px-4 pt-3 pb-0 mx-0 my-0 py-0">
            <div className="flex items-center justify-between h-20">
              <Link to="/" className="flex items-center space-x-2">
                <div className="mosaic-border-thick rounded-lg p-4 bg-white">
                  <span className="text-6xl font-bold logo-mosaic">LULU
                </span>
                </div>
              </Link>

              <nav className="hidden md:flex items-center space-x-8">
                {navItems.map(item => <Link key={item.name} to={item.href} className="text-foreground hover:text-primary transition-colors font-bold text-lg border-b-4 border-transparent hover:border-current relative group" style={{
                ['--hover-color' as any]: `hsl(var(--${item.color}))`
              }} onMouseEnter={e => {
                e.currentTarget.style.borderBottomColor = `hsl(var(--${item.color}))`;
                e.currentTarget.style.color = `hsl(var(--${item.color}))`;
              }} onMouseLeave={e => {
                e.currentTarget.style.borderBottomColor = 'transparent';
                e.currentTarget.style.color = 'hsl(var(--foreground))';
              }}>
                    {item.name}
                  </Link>)}
              </nav>

              <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="mosaic-border p-3">
                  <Search className="h-6 w-6" />
                </Button>
                <CartSheet />
                <Button variant="ghost" size="icon" className="mosaic-border p-3">
                  <User className="h-6 w-6" />
                </Button>

                {/* Mobile menu trigger */}
                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                  <SheetTrigger asChild className="md:hidden">
                    <Button variant="ghost" size="icon" className="mosaic-border p-3">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-[300px] sm:w-[400px] bg-white border-l-8 border-mosaic">
                    <div className="flex flex-col space-y-4 mt-8">
                      {navItems.map(item => <Link key={item.name} to={item.href} className="text-lg font-bold text-foreground hover:text-primary transition-colors p-4 mosaic-border rounded-lg hover:shadow-vibrant" onClick={() => setIsMenuOpen(false)} style={{
                      borderLeftColor: `hsl(var(--${item.color}))`
                    }}>
                          {item.name}
                        </Link>)}
                      <div className="mosaic-border-thick pt-4 mt-4 space-y-2 rounded-xl bg-white">
                        <Button className="w-full justify-start btn-hero" variant="ghost">
                          <User className="h-5 w-5 mr-2" />
                          My Account
                        </Button>
                        <Button className="w-full justify-start btn-secondary" variant="ghost">
                          <ShoppingCart className="h-5 w-5 mr-2" />
                          Cart (0)
                        </Button>
                      </div>
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>
            
            {/* Call to Action Section - positioned directly below navigation */}
            <div className="mosaic-border-thick bg-white rounded-2xl p-3 flex flex-col md:flex-row items-center justify-between gap-3 -mt-8 mb-2">
              <div className="flex items-center gap-4">
                <video 
                  src="/lulu-video-website.mp4" 
                  autoPlay 
                  muted 
                  playsInline
                  className="w-24 h-24 object-contain rounded-lg"
                  onEnded={(e) => {
                    const video = e.currentTarget;
                    const img = document.createElement('img');
                    img.src = '/src/assets/lulu-mascot-bird.png';
                    img.className = 'w-24 h-24 object-contain rounded-lg';
                    img.alt = 'Lulu mascot bird';
                    video.parentNode?.replaceChild(img, video);
                  }}
                />
                <div>
                  <h2 className="text-2xl font-bold lulu-font text-foreground">Ready to go LULU?</h2>
                  <p className="text-muted-foreground">Gentle on you, kind to the Earth</p>
                </div>
              </div>
              <div className="flex gap-4">
                <Button className="btn-hero px-8 py-3 text-lg font-bold" asChild>
                  <Link to="/shop">Shop Now</Link>
                </Button>
                <Button variant="outline" className="mosaic-border px-8 py-3 text-lg font-bold" asChild>
                  <Link to="/business">For Business</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>;
};
export default Header;