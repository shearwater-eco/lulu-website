import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Recycle, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RainbowBorder, RainbowStripeBar } from '@/components/storefront/RainbowBorder';
import luluBoxMockup from '@/assets/lulu-box-mockup.png';

export function HeroSection() {
  return (
    <section className="relative py-12 md:py-20">
      {/* Animated rainbow stripe bar */}
      <RainbowStripeBar className="mb-8" />
      
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-6">
            {/* Main headline - clear value proposition */}
            <div className="space-y-2">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif tracking-wide leading-tight">
                Premium Toilet Tissue
                <span className="block text-primary">at Supermarket Prices</span>
              </h1>
            </div>

            {/* Eco credentials - quick scannable badges */}
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full border border-foreground/20">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Tree-Free</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full border border-foreground/20">
                <Recycle className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Plastic-Free</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 bg-secondary/50 rounded-full border border-foreground/20">
                <MapPin className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">Made in Wales</span>
              </div>
            </div>

            {/* Supporting text */}
            <p className="text-lg text-muted-foreground max-w-lg">
              Soft, strong, and sustainable. LULU toilet tissue gives you the quality you expect without harming the planet.
            </p>

            {/* Primary CTA - single focused action */}
            <div className="flex flex-col sm:flex-row gap-4 items-start">
              <Button 
                size="lg" 
                asChild
                className="rounded-xl border-2 border-foreground bg-primary text-primary-foreground text-lg font-bold px-10 py-7 shadow-brutal hover:shadow-brutal-lg transition-all hover:-translate-y-0.5"
              >
                <Link to="/shop">
                  SHOP NOW
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Link 
                to="/business" 
                className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors py-2"
              >
                Ordering for a business?
              </Link>
            </div>

            {/* Aspirational social proof */}
            <p className="text-sm text-muted-foreground italic">
              Join thousands making the switch to sustainable
            </p>
          </div>

          {/* Right side - Product + Video showcase */}
          <div className="relative">
            <RainbowBorder animated>
              <div className="p-6 md:p-8 bg-background">
                {/* Product box image - prominent */}
                <img 
                  src={luluBoxMockup} 
                  alt="LULU sustainable toilet tissue box - 9 rolls, tree-free"
                  className="w-full max-w-sm mx-auto h-auto object-contain mb-4"
                />
                
                {/* Video below - supporting content */}
                <div className="rounded-lg overflow-hidden border-2 border-foreground/10">
                  <video 
                    src="/lulu-video-website-2.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </RainbowBorder>
            
            {/* "Meet Lulu" badge */}
            <div className="absolute -bottom-3 -right-3 md:bottom-4 md:right-4 bg-background rounded-full px-4 py-2 border-2 border-foreground shadow-brutal-sm flex items-center gap-2">
              <span className="text-sm font-semibold">Meet Lulu! 🐦</span>
            </div>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mt-12 md:mt-16">
          <p className="text-xl md:text-2xl font-serif italic text-muted-foreground">
            Gentle on you, kind to the Earth
          </p>
        </div>
      </div>
    </section>
  );
}
