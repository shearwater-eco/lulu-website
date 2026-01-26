import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import luluBox from '@/assets/lulu-box-front.jpg';

export function ProductRangeSection() {
  const products = [
    {
      name: 'Toilet Tissue',
      description: 'Soft, strong, and sustainable',
      image: luluBox,
      href: '/shop?category=toilet-tissue',
    },
    {
      name: 'Kitchen Rolls',
      description: 'Absorbent and eco-friendly',
      image: luluBox,
      href: '/shop?category=kitchen-rolls',
    },
    {
      name: 'Facial Tissues',
      description: 'Gentle on sensitive skin',
      image: luluBox,
      href: '/shop?category=facial-tissues',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Our Product Range
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Every LULU product is made with care, using 100% recycled materials and sustainable practices.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link
              key={product.name}
              to={product.href}
              className="group block"
            >
              <div className="aspect-square rounded-lg overflow-hidden bg-muted mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                {product.name}
              </h3>
              <p className="text-muted-foreground">{product.description}</p>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" asChild className="rounded-full px-8">
            <Link to="/shop">View All Products</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
