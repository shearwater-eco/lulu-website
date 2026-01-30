import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HeroSection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container max-w-4xl mx-auto text-center">
        {/* Headline - clear value prop */}
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif tracking-tight leading-tight mb-6">
          Premium Quality,
          <span className="block text-primary">Best Prices</span>
        </h1>

        {/* Eco credentials - single line, subtle */}
        <p className="text-sm md:text-base text-muted-foreground mb-10">
          Plastic free • Tree-free paper • Low carbon • Zero landfill
        </p>

        {/* Product showcase - centered, prominent */}
        <div className="relative max-w-md mx-auto mb-10">
          {/* Product box placeholder */}
          <div className="aspect-square bg-muted/30 rounded-2xl border-2 border-dashed border-foreground/20 flex items-center justify-center">
            <p className="text-muted-foreground text-sm">Product box image</p>
          </div>
          
          {/* Video beneath - supporting content */}
          <div className="mt-6 rounded-xl overflow-hidden border border-foreground/10">
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

        {/* Pricing callout */}
        <div className="mb-8">
          <p className="text-sm font-medium text-primary uppercase tracking-wider mb-1">
            Introductory Offer
          </p>
          <p className="text-3xl md:text-4xl font-bold">
            £12.99
          </p>
          <p className="text-sm text-muted-foreground">
            Free delivery included • VAT included
          </p>
        </div>

        {/* Primary CTA - single, prominent */}
        <div className="space-y-4">
          <Button 
            size="lg" 
            asChild
            className="rounded-full bg-primary text-primary-foreground text-lg font-bold px-12 py-7 shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5"
          >
            <Link to="/shop">
              CLAIM YOUR OFFER
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
          
          <p className="text-sm text-muted-foreground">
            <Link 
              to="/business" 
              className="underline underline-offset-4 hover:text-foreground transition-colors"
            >
              Ordering for a business?
            </Link>
          </p>
        </div>

        {/* Aspirational social proof */}
        <p className="mt-12 text-sm text-muted-foreground italic">
          Join thousands making the switch to sustainable
        </p>

        {/* Tagline */}
        <p className="mt-6 text-lg md:text-xl font-serif text-muted-foreground">
          Gentle on you, kind to the Earth
        </p>
      </div>
    </section>
  );
}
