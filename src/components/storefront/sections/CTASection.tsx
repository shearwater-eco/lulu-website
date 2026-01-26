import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function CTASection() {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Ready to Go LULU?
          </h2>
          <p className="text-muted-foreground mb-8">
            Join the sustainable revolution. Every purchase helps protect our planet for future generations.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild className="rounded-full px-8">
              <Link to="/shop">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="rounded-full px-8">
              <Link to="/business">Business Orders</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
