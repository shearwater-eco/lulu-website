import { Link } from 'react-router-dom';
import { Heart, Award, Truck, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import luluHero from '@/assets/lulu-mascot-welsh-coast.png';

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: 'pink' | 'purple' | 'teal';
}

const features: Feature[] = [
  {
    icon: <Heart className="h-5 w-5" />,
    title: 'WELSH WILDLIFE PROTECTION',
    description: 'Supporting Welsh seabird conservation with every purchase. Lulu represents our commitment to protecting coastal wildlife.',
    color: 'pink',
  },
  {
    icon: <Award className="h-5 w-5" />,
    title: 'SUPERMARKET QUALITY',
    description: 'Premium quality that matches leading brands, without the environmental cost.',
    color: 'purple',
  },
  {
    icon: <Truck className="h-5 w-5" />,
    title: 'CONVENIENT DELIVERY',
    description: 'Subscribe and never run out. Delivered right to your door.',
    color: 'teal',
  },
];

const colorMap = {
  pink: 'bg-[#FF4D8D]',
  purple: 'bg-[#9B59B6]',
  teal: 'bg-[#00C1B0]',
};

export function WhyChooseSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - LULU image with dashed border */}
          <div className="relative">
            <div className="border-2 border-dashed border-foreground rounded-2xl p-2">
              <img 
                src={luluHero}
                alt="LULU the bird standing on coastal rocks"
                className="w-full h-auto rounded-xl"
              />
            </div>
          </div>

          {/* Right side - Features */}
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold font-serif">
              WHY CHOOSE LULU?
            </h2>

            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.title} className="flex gap-4">
                  <div 
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white border-2 border-foreground ${colorMap[feature.color]}`}
                  >
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Button 
              size="lg" 
              asChild
              className="rounded-xl border-2 border-foreground bg-primary text-primary-foreground text-base font-bold px-8 py-6 shadow-brutal hover:shadow-brutal-lg transition-all"
            >
              <Link to="/subscribe">
                START YOUR SUBSCRIPTION
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
