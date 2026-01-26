import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import luluMascot from '@/assets/lulu-mascot-thumbs-up-new.png';

export function HeroSection() {
  return (
    <section className="relative py-16 md:py-24 overflow-hidden">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          {/* Text content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-serif leading-tight">
              Sustainable Paper Products for a{' '}
              <span className="text-primary">Better World</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-lg">
              LULU creates tree-free, plastic-free paper products that are gentle on you and kind to the Earth. Made in Wales with 100% recycled materials.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild className="rounded-full px-8">
                <Link to="/shop">Shop Now</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="rounded-full px-8">
                <Link to="/about">Learn More</Link>
              </Button>
            </div>
          </div>

          {/* Image */}
          <div className="flex justify-center lg:justify-end">
            <img
              src={luluMascot}
              alt="LULU mascot"
              className="w-full max-w-md h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
