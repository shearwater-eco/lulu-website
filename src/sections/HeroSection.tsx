import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Recycle, Factory, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RainbowBorder, RainbowStripeBar } from '@/components/storefront/RainbowBorder';

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
                Premium Quality,
                <span className="block text-primary">Best Prices</span>
              </h1>
            </div>

            {/* Eco credentials - quick scannable badges */}
            <div className="flex flex-wrap gap-2 md:gap-3">
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/50 rounded-full border border-foreground/20">
                <Recycle className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs md:text-sm font-medium">Plastic Free</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/50 rounded-full border border-foreground/20">
                <Leaf className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs md:text-sm font-medium">Tree-Free Paper</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/50 rounded-full border border-foreground/20">
                <Factory className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs md:text-sm font-medium">Low Carbon</span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1 bg-secondary/50 rounded-full border border-foreground/20">
                <Trash2 className="h-3.5 w-3.5 text-primary" />
                <span className="text-xs md:text-sm font-medium">Zero Landfill</span>
              </div>
            </div>

            {/* Pricing callout */}
            <div className="bg-primary/10 border-2 border-primary rounded-xl p-4 inline-block">
              <p className="text-sm font-medium text-primary uppercase tracking-wide">Introductory Offer</p>
              <p className="text-2xl md:text-3xl font-bold text-foreground">
                £12.99 <span className="text-base font-normal text-muted-foreground">inc. free delivery & VAT</span>
              </p>
            </div>

            {/* Primary CTA - single focused action */}
            <div className="space-y-3">
              <Button 
                size="lg" 
                asChild
                className="rounded-xl border-2 border-foreground bg-primary text-primary-foreground text-lg font-bold px-10 py-7 shadow-brutal hover:shadow-brutal-lg transition-all hover:-translate-y-0.5"
              >
                <Link to="/shop">
                  CLAIM YOUR OFFER
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <div>
                <Link 
                  to="/business" 
                  className="text-sm font-medium text-muted-foreground hover:text-foreground underline underline-offset-4 transition-colors"
                >
                  Ordering for a business?
                </Link>
              </div>
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
                {/* Product box placeholder - awaiting image upload */}
                <div className="w-full max-w-sm mx-auto aspect-square bg-muted/50 rounded-lg border-2 border-dashed border-foreground/20 flex items-center justify-center mb-4">
                  <p className="text-muted-foreground text-sm text-center px-4">Product box image<br />coming soon</p>
                </div>
                
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
