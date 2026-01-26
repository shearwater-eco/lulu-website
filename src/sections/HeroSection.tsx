import { Link } from 'react-router-dom';
import { ArrowRight, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RainbowBorder, RainbowStripeBar } from '@/components/storefront/RainbowBorder';
import luluHero from '@/assets/lulu-mascot-welsh-coast.png';

export function HeroSection() {
  return (
    <section className="relative py-12 md:py-20">
      {/* Animated rainbow stripe bar */}
      <RainbowStripeBar className="mb-12" />
      
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Text content */}
          <div className="space-y-8">
            {/* Product label with rainbow border */}
            <RainbowBorder className="inline-block">
              <div className="px-8 py-6 text-center">
                <h2 className="text-2xl md:text-3xl font-bold font-serif tracking-wide">
                  TOILET TISSUE
                </h2>
                <p className="text-sm italic text-muted-foreground mt-1">by</p>
                <p className="text-2xl font-bold font-serif">LULU</p>
              </div>
            </RainbowBorder>

            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              Sustainable paper products that don't compromise on quality. 
              Join the eco-revolution with Lulu the Shearwater!
            </p>

            {/* CTA Buttons - EXACT lulu.earth style */}
            <div className="flex flex-wrap gap-4">
              <Button 
                size="lg" 
                asChild
                className="rounded-xl border-2 border-foreground bg-primary text-primary-foreground text-base font-bold px-8 py-6 shadow-brutal hover:shadow-brutal-lg transition-all hover:-translate-y-0.5"
              >
                <Link to="/shop">
                  SHOP NOW
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                asChild
                className="rounded-xl border-2 border-foreground bg-secondary text-secondary-foreground text-base font-bold px-8 py-6 shadow-brutal hover:shadow-brutal-lg transition-all hover:-translate-y-0.5"
              >
                <Link to="/business">
                  FOR BUSINESSES
                  <Users className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Right side - LULU hero image with rainbow border */}
          <div className="relative">
            <RainbowBorder animated>
              <div className="overflow-hidden rounded-lg">
                <img 
                  src={luluHero} 
                  alt="LULU the bird on a beautiful beach with dolphins"
                  className="w-full h-auto object-cover"
                />
              </div>
              {/* "Meet Lulu" badge */}
              <div className="absolute bottom-4 right-4 bg-background rounded-full px-4 py-2 border-2 border-foreground shadow-brutal-sm flex items-center gap-2">
                <span className="text-sm font-semibold">Meet Lulu!</span>
                <div className="w-6 h-1 bg-gradient-to-r from-rainbow-teal via-rainbow-pink to-rainbow-yellow rounded-full" />
              </div>
            </RainbowBorder>
          </div>
        </div>

        {/* Tagline */}
        <div className="text-center mt-16">
          <p className="text-xl md:text-2xl font-serif italic text-muted-foreground">
            Gentle on you, kind to the Earth
          </p>
        </div>
      </div>
    </section>
  );
}
