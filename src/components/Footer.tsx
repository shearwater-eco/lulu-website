import { Mail, Phone, MapPin, Facebook, Twitter, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="mosaic-border rounded-lg inline-block">
              <h3 className="text-xl font-bold text-primary px-3 py-1">LULU</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              Welsh sustainable paper products that are gentle on you and kind to the Earth.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Twitter className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Instagram className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/shop" className="text-muted-foreground hover:text-primary transition-colors">Shop</a></li>
              <li><a href="/about" className="text-muted-foreground hover:text-primary transition-colors">About Us</a></li>
              <li><a href="/sustainability" className="text-muted-foreground hover:text-primary transition-colors">Sustainability</a></li>
              <li><a href="/business" className="text-muted-foreground hover:text-primary transition-colors">For Businesses</a></li>
              <li><a href="/blog" className="text-muted-foreground hover:text-primary transition-colors">Blog</a></li>
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="/faq" className="text-muted-foreground hover:text-primary transition-colors">FAQ</a></li>
              <li><a href="/shipping" className="text-muted-foreground hover:text-primary transition-colors">Shipping Info</a></li>
              <li><a href="/returns" className="text-muted-foreground hover:text-primary transition-colors">Returns</a></li>
              <li><a href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-foreground">Join the Flock</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on new products and sustainability tips.
            </p>
            <div className="flex space-x-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="flex-1"
              />
              <Button className="bg-primary hover:bg-primary/90">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">
            © 2024 LULU. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 md:mt-0 text-sm text-muted-foreground">
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              Wales, UK
            </span>
            <a href="mailto:hello@lulu.earth" className="flex items-center hover:text-primary transition-colors">
              <Mail className="h-4 w-4 mr-1" />
              hello@lulu.earth
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;