import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
const Footer = () => {
  const linkColors = ['vibrant-green', 'secondary', 'accent', 'vibrant-blue', 'vibrant-orange', 'vibrant-purple', 'vibrant-lime', 'vibrant-coral'];
  return <footer className="relative mt-8 sm:mt-16">
      <div className="mosaic-border-curved-bottom bg-white relative">
        <div className="container mx-auto px-4 pt-8 sm:pt-12 pb-12 sm:pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center sm:text-left">
              <div className="flex items-center justify-center sm:justify-start space-x-2 mb-4">
                <div className="mosaic-border-thick rounded-lg p-2 sm:p-4 bg-white">
                  <span className="text-lg sm:text-2xl font-bold logo-mosaic">LULU</span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4 font-medium text-sm sm:text-base">
                Welsh sustainable paper products that are gentle on you and kind to the Earth.
              </p>
              <div className="flex justify-center sm:justify-start space-x-2 sm:space-x-4">
                <Button variant="ghost" size="icon" className="mosaic-border bg-vibrant-green text-white hover:bg-vibrant-green/90 h-9 w-9 sm:h-10 sm:w-10">
                  <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="mosaic-border bg-secondary text-white hover:bg-secondary/90 h-9 w-9 sm:h-10 sm:w-10">
                  <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
                <Button variant="ghost" size="icon" className="mosaic-border bg-accent text-white hover:bg-accent/90 h-9 w-9 sm:h-10 sm:w-10">
                  <Twitter className="h-4 w-4 sm:h-5 sm:w-5" />
                </Button>
              </div>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="font-bold text-foreground mb-4 text-base sm:text-lg">Shop</h4>
              <ul className="space-y-3">
                {[{
                name: "Toilet Tissue",
                href: "/shop",
                colorIndex: 0
              }, {
                name: "Kitchen Rolls",
                href: "/shop",
                colorIndex: 1
              }, {
                name: "Facial Tissues",
                href: "/shop",
                colorIndex: 2
              }, {
                name: "Bulk Orders",
                href: "/shop",
                colorIndex: 3
              }].map((item, index) => <li key={item.name}>
                    <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors font-medium border-l-4 border-transparent hover:border-current pl-2 text-sm sm:text-base inline-block" style={{
                  ['--hover-border-color' as any]: `hsl(var(--${linkColors[item.colorIndex]}))`
                }} onMouseEnter={e => {
                  e.currentTarget.style.borderLeftColor = `hsl(var(--${linkColors[item.colorIndex]}))`;
                  e.currentTarget.style.color = `hsl(var(--${linkColors[item.colorIndex]}))`;
                }} onMouseLeave={e => {
                  e.currentTarget.style.borderLeftColor = 'transparent';
                  e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
                }}>
                      {item.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="font-bold text-foreground mb-4 text-base sm:text-lg">Company</h4>
              <ul className="space-y-3">
                {[{
                name: "About Us",
                href: "/about",
                colorIndex: 4
              }, {
                name: "Sustainability",
                href: "/sustainability",
                colorIndex: 5
              }, {
                name: "Business",
                href: "/business",
                colorIndex: 6
              }, {
                name: "Blog",
                href: "/blog",
                colorIndex: 7
              }].map(item => <li key={item.name}>
                    <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors font-medium border-l-4 border-transparent hover:border-current pl-2 text-sm sm:text-base inline-block" onMouseEnter={e => {
                  e.currentTarget.style.borderLeftColor = `hsl(var(--${linkColors[item.colorIndex]}))`;
                  e.currentTarget.style.color = `hsl(var(--${linkColors[item.colorIndex]}))`;
                }} onMouseLeave={e => {
                  e.currentTarget.style.borderLeftColor = 'transparent';
                  e.currentTarget.style.color = 'hsl(var(--muted-foreground))';
                }}>
                      {item.name}
                    </Link>
                  </li>)}
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <h4 className="font-bold text-foreground mb-4 text-base sm:text-lg">Join the Flock</h4>
              <p className="text-muted-foreground mb-4 font-medium text-sm sm:text-base">
                Get the latest updates on new products and sustainability tips from Lulu!
              </p>
              <div className="space-y-3">
                <Input type="email" placeholder="Your email" className="mosaic-border bg-white h-11" />
                <Button className="btn-hero w-full h-11 text-sm sm:text-base">
                  Subscribe
                </Button>
              </div>
              <div className="mt-4 space-y-2 text-xs sm:text-sm">
                <Link to="/contact" className="block text-muted-foreground hover:text-vibrant-turquoise transition-colors font-medium">
                  <Mail className="h-3 w-3 sm:h-4 sm:w-4 inline mr-2" />
                  hello@lulu.earth
                </Link>
                <div className="text-muted-foreground">
                  <MapPin className="h-3 w-3 sm:h-4 sm:w-4 inline mr-2" />
                  Wales, UK
                </div>
              </div>
            </div>
          </div>

          <div className="mosaic-border-thick mt-6 sm:mt-8 pt-6 sm:pt-8 text-center bg-white rounded-xl">
            <p className="text-muted-foreground font-medium text-sm sm:text-base lg:text-lg">© 2024 LULU. All rights reserved. Made with ❤️ for People & Planet.</p>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;