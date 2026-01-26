import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { RainbowBorder } from '../RainbowBorder';

export function CTASection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <RainbowBorder>
          <div className="p-8 md:p-12 lg:p-16 text-center space-y-8">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif tracking-wide">
              READY TO JOIN THE ECO-REVOLUTION?
            </h2>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto font-serif italic">
              Make the switch to sustainable paper products without compromising on quality. 
              Lulu and the planet will thank you!
            </p>

            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                size="lg" 
                asChild
                className="rounded-xl border-2 border-foreground bg-primary text-primary-foreground text-base font-bold px-10 py-6 shadow-brutal hover:shadow-brutal-lg transition-all"
              >
                <Link to="/shop">
                  SHOP NOW
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                size="lg" 
                asChild
                className="rounded-xl border-2 border-foreground bg-secondary text-secondary-foreground text-base font-bold px-10 py-6 shadow-brutal hover:shadow-brutal-lg transition-all"
              >
                <Link to="/about">LEARN MORE ABOUT US</Link>
              </Button>
            </div>
          </div>
        </RainbowBorder>
      </div>
    </section>
  );
}
