import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Plus, Minus, X } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const CartSheet = () => {
  const { items, total, itemCount, updateQuantity, removeItem } = useCart();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleCheckout = () => {
    setOpen(false);
    navigate("/checkout");
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="mosaic-border p-3 relative">
          <ShoppingCart className="h-6 w-6" />
          {itemCount > 0 && (
            <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-secondary text-white text-xs flex items-center justify-center font-bold">
              {itemCount}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md bg-white border-l-8 border-mosaic flex flex-col">
        <SheetHeader className="flex-shrink-0">
          <SheetTitle className="text-lg sm:text-xl">Shopping Cart</SheetTitle>
        </SheetHeader>
        
        <div className="flex flex-col h-full min-h-0">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center p-4">
              <div className="text-center">
                <div className="text-4xl mb-4">🛒</div>
                <p className="text-muted-foreground text-center text-sm sm:text-base">
                  Your cart is empty.<br />
                  Add some products to get started!
                </p>
              </div>
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 py-4 sm:py-6 overflow-auto min-h-0">
                {items.map((item) => (
                  <div key={item.product.id} className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50">
                    <div className="text-xl sm:text-2xl flex-shrink-0">{item.product.image}</div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium text-xs sm:text-sm truncate">{item.product.name}</h4>
                      <p className="text-xs sm:text-sm text-muted-foreground">
                        £{item.product.price.toFixed(2)} each
                      </p>
                    </div>
                    <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-6 sm:w-8 text-center text-xs sm:text-sm font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 sm:h-8 sm:w-8 text-destructive ml-1"
                        onClick={() => removeItem(item.product.id)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex-shrink-0 space-y-4 border-t pt-4">
                <Separator />
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-sm sm:text-base">Total:</span>
                  <span className="font-bold text-base sm:text-lg text-primary">£{total.toFixed(2)}</span>
                </div>
                <Button 
                  className="w-full h-11 text-sm sm:text-base font-semibold" 
                  onClick={handleCheckout}
                  disabled={items.length === 0}
                >
                  Proceed to Checkout
                </Button>
                <p className="text-xs text-muted-foreground text-center">
                  🔒 Secure checkout with free UK delivery
                </p>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};