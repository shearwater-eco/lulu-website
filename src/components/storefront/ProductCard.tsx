import { Link } from 'react-router-dom';
import { ShoppingBag, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCart } from '@/hooks/useCart';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    sku: string;
    description: string | null;
    unit_price: number;
    image_url: string | null;
    category?: { name: string } | null;
    inStock: boolean;
    totalStock: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart.mutate({ productId: product.id, quantity: 1 });
  };

  return (
    <Link to={`/product/${product.id}`}>
      <div className="group lulu-card overflow-hidden">
        {/* Image */}
        <div className="aspect-square relative overflow-hidden bg-muted">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
              className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-secondary/10">
              <Package className="h-16 w-16 text-muted-foreground/50" />
            </div>
          )}
          
          {/* Out of stock overlay */}
          {!product.inStock && (
            <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
              <Badge className="bg-foreground text-background border-2 border-foreground rounded-full px-4 py-1 font-semibold">
                Out of Stock
              </Badge>
            </div>
          )}

          {/* Quick add button */}
          {product.inStock && (
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                size="icon"
                onClick={handleAddToCart}
                disabled={addToCart.isPending}
                className="rounded-full border-2 border-foreground bg-primary text-primary-foreground shadow-brutal-sm hover:shadow-brutal"
              >
                <ShoppingBag className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>

        <div className="p-4">
          {/* Category */}
          {product.category && (
            <p className="text-xs font-medium uppercase tracking-wide text-primary mb-1">
              {product.category.name}
            </p>
          )}

          {/* Name */}
          <h3 className="font-serif font-semibold text-base line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>

          {/* Price */}
          <p className="mt-2 text-lg font-bold">
            ${Number(product.unit_price).toFixed(2)}
          </p>
        </div>
      </div>
    </Link>
  );
}
