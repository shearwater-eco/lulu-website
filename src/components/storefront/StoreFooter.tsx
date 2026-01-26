import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Mail, MapPin, Heart } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { RainbowWaveFooter } from './sections/RainbowWaveFooter';

export const StoreFooter = forwardRef<HTMLElement>(function StoreFooter(_, ref) {
  return (
    <footer ref={ref} className="bg-background">
      {/* Rainbow wave divider */}
      <RainbowWaveFooter />

      <div className="container py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="text-3xl font-bold font-serif">
              LULU
            </Link>
            <p className="text-muted-foreground text-sm">
              Welsh sustainable paper products that are gentle on you and kind to the Earth.
            </p>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              <a 
                href="https://instagram.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors"
              >
                <Instagram className="h-5 w-5 text-primary-foreground" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center hover:bg-secondary/80 transition-colors"
              >
                <Twitter className="h-5 w-5 text-secondary-foreground" />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div className="space-y-4">
            <h4 className="font-bold">Shop</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/shop?category=toilet-tissue" className="text-muted-foreground hover:text-foreground transition-colors">
                Toilet Tissue
              </Link>
              <Link to="/shop?category=kitchen-rolls" className="text-muted-foreground hover:text-foreground transition-colors">
                Kitchen Rolls
              </Link>
              <Link to="/shop?category=facial-tissues" className="text-muted-foreground hover:text-foreground transition-colors">
                Facial Tissues
              </Link>
              <Link to="/business" className="text-muted-foreground hover:text-foreground transition-colors">
                Bulk Orders
              </Link>
            </nav>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h4 className="font-bold">Company</h4>
            <nav className="flex flex-col gap-2 text-sm">
              <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </Link>
              <Link to="/sustainability" className="text-muted-foreground hover:text-foreground transition-colors">
                Sustainability
              </Link>
              <Link to="/business" className="text-muted-foreground hover:text-foreground transition-colors">
                Business
              </Link>
              <Link to="/blog" className="text-muted-foreground hover:text-foreground transition-colors">
                Blog
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h4 className="font-bold">Join the Flock</h4>
            <p className="text-sm text-muted-foreground">
              Get the latest updates on new products and sustainability tips from Lulu!
            </p>
            <div className="space-y-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="rounded-lg border-foreground/20"
              />
              <Button className="w-full rounded-lg bg-primary text-primary-foreground font-semibold">
                Subscribe
              </Button>
            </div>

            {/* Contact info */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <a href="mailto:hello@lulu.earth" className="flex items-center gap-2 hover:text-foreground transition-colors">
                <Mail className="h-4 w-4" />
                hello@lulu.earth
              </a>
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                Wales, UK
              </p>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-foreground/10 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} LULU. All rights reserved. Made with{' '}
            <Heart className="inline h-4 w-4 text-secondary fill-secondary" />{' '}
            for People & Planet.
          </p>
        </div>
      </div>
    </footer>
  );
});
