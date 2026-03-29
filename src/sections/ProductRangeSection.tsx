import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import luluBoxFront from '@/assets/lulu-box-front.jpg';
import luluBoxMockup from '@/assets/lulu-box-mockup.png';
import luluRealBox from '@/assets/lulu-real-box.jpg';

interface ProductCategory {
  title: string;
  description: string;
  price: string;
  image: string;
  features: string[];
  href: string;
}

const products: ProductCategory[] = [
  {
    title: 'TOILET TISSUE',
    description: 'Soft, strong, and sustainable. Perfect for everyday use.',
    price: 'From £8.99',
    image: luluBoxFront,
    features: ['24 Rolls', '3-Ply', 'FSC Certified'],
    href: '/shop?category=toilet-tissue',
  },
  {
    title: 'KITCHEN ROLLS',
    description: 'Absorbent and eco-friendly for all your kitchen needs.',
    price: 'From £6.99',
    image: luluBoxMockup,
    features: ['6 Rolls', '2-Ply', 'Plastic-Free'],
    href: '/shop?category=kitchen-rolls',
  },
  {
    title: 'FACIAL TISSUES',
    description: 'Gentle on your skin, gentle on the environment.',
    price: 'From £3.99',
    image: luluRealBox,
    features: ['Box of 150', 'Ultra Soft', 'Chemical-Free'],
    href: '/shop?category=facial-tissues',
  },
];

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
            <div
              key={product.title}
              className="group rounded-xl border-2 border-foreground/10 bg-card overflow-hidden hover:border-primary/50 transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              {/* Product image */}
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-6 space-y-4">
                {/* Title + Price */}
                <div className="flex items-start justify-between gap-2">
                  <h3 className="text-lg md:text-xl font-bold font-serif tracking-wide">
                    {product.title}
                  </h3>
                  <span className="text-lg font-bold text-primary whitespace-nowrap">
                    {product.price}
                  </span>
                </div>

                {/* Description */}
                <p className="text-sm text-muted-foreground">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="px-2.5 py-0.5 text-xs rounded-full border border-foreground/20 bg-muted font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Add to Cart */}
                <Button
                  asChild
                  className="w-full rounded-xl border-2 border-foreground bg-primary text-primary-foreground font-bold py-5 shadow-brutal hover:shadow-brutal-lg transition-all"
                >
                  <Link to={product.href}>
                    <ShoppingCart className="mr-2 h-4 w-4" />
                    ADD TO CART
                  </Link>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
