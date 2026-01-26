import { Link } from 'react-router-dom';
import { Minus, Plus, Trash2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/useCart';

export function CartDrawer() {
  const { cart, itemCount, subtotal, updateQuantity, removeFromCart } = useCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <Package className="h-16 w-16 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium mb-2">Your cart is empty</h3>
        <p className="text-muted-foreground mb-6">
          Add some items to get started
        </p>
        <Button asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto py-4">
        <div className="space-y-4">
          {cart.items.map((item) => (
            <div key={item.id} className="flex gap-4">
              {/* Image */}
              <div className="w-20 h-20 rounded-md overflow-hidden bg-muted shrink-0">
                {item.product.image_url ? (
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <Package className="h-8 w-8 text-muted-foreground/50" />
                  </div>
                )}
              </div>

              {/* Details */}
              <div className="flex-1 min-w-0">
                <Link 
                  to={`/product/${item.product.id}`}
                  className="font-medium text-sm hover:text-primary line-clamp-2"
                >
                  {item.product.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  ${Number(item.product.unit_price).toFixed(2)}
                </p>

                {/* Quantity controls */}
                <div className="flex items-center gap-2 mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() =>
                      updateQuantity.mutate({
                        itemId: item.id,
                        quantity: item.quantity - 1,
                      })
                    }
                    disabled={updateQuantity.isPending}
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-7 w-7"
                    onClick={() =>
                      updateQuantity.mutate({
                        itemId: item.id,
                        quantity: item.quantity + 1,
                      })
                    }
                    disabled={updateQuantity.isPending}
                  >
                    <Plus className="h-3 w-3" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 ml-auto text-muted-foreground hover:text-destructive"
                    onClick={() => removeFromCart.mutate(item.id)}
                    disabled={removeFromCart.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-4 space-y-4">
        <div className="flex justify-between text-sm">
          <span className="text-muted-foreground">Subtotal ({itemCount} items)</span>
          <span className="font-medium">${subtotal.toFixed(2)}</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Shipping and taxes calculated at checkout
        </p>
        <Button className="w-full" size="lg" asChild>
          <Link to="/checkout">Proceed to Checkout</Link>
        </Button>
        <Button variant="outline" className="w-full" asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
      </div>
    </div>
  );
}
