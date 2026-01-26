import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { RainbowBorder } from '../RainbowBorder';

interface ProductCategory {
  number: number;
  title: string;
  description: string;
  features: string[];
  color: 'green' | 'teal' | 'orange';
}

const products: ProductCategory[] = [
  {
    number: 1,
    title: 'TOILET TISSUE',
    description: 'Soft, strong, and sustainable. Perfect for everyday use.',
    features: ['9 Rolls', '3-Ply', 'FSC Certified'],
    color: 'green',
  },
  {
    number: 2,
    title: 'KITCHEN ROLLS',
    description: 'Absorbent and eco-friendly for all your kitchen needs.',
    features: ['6 Rolls', '2-Ply', 'Plastic-Free'],
    color: 'teal',
  },
  {
    number: 3,
    title: 'FACIAL TISSUES',
    description: 'Gentle on your skin, gentle on the environment.',
    features: ['Box of 150', 'Ultra Soft', 'Chemical-Free'],
    color: 'orange',
  },
];

const colorMap = {
  green: { bg: 'bg-[#4ADE80]', text: 'text-white' },
  teal: { bg: 'bg-[#00C1B0]', text: 'text-white' },
  orange: { bg: 'bg-[#FF8B4D]', text: 'text-white' },
};

export function ProductRangeSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif tracking-wide">
            OUR SUSTAINABLE RANGE
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 font-serif italic">
            Premium quality without compromising the planet
          </p>
        </div>

        {/* Product cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {products.map((product) => (
            <RainbowBorder key={product.number}>
              <div className="p-6 md:p-8 text-center space-y-6">
                {/* Number circle */}
                <div 
                  className={`w-16 h-16 rounded-full mx-auto flex items-center justify-center text-2xl font-bold ${colorMap[product.color].bg} ${colorMap[product.color].text}`}
                >
                  {product.number}
                </div>

                {/* Title */}
                <h3 className="text-xl md:text-2xl font-bold font-serif tracking-wide">
                  {product.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap justify-center gap-2">
                  {product.features.map((feature) => (
                    <span 
                      key={feature}
                      className="px-3 py-1 text-sm rounded-full border border-foreground bg-muted"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* CTA Button */}
                <Button 
                  asChild
                  className="w-full rounded-xl border-2 border-foreground bg-primary text-primary-foreground font-bold py-6 shadow-brutal hover:shadow-brutal-lg transition-all"
                >
                  <Link to="/shop">LEARN MORE</Link>
                </Button>
              </div>
            </RainbowBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
