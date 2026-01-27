import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface LastOrder {
  orderNumber: string;
  orderId: string;
  total: number;
  itemCount: number;
}

const OrderConfirmation = () => {
  const navigate = useNavigate();
  const [lastOrder, setLastOrder] = useState<LastOrder | null>(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('lastOrder');
    if (stored) {
      setLastOrder(JSON.parse(stored));
      // Clear it so refreshing doesn't show stale data
      sessionStorage.removeItem('lastOrder');
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
          
          {lastOrder ? (
            <>
              <div className="bg-muted rounded-lg p-4 mb-6">
                <p className="text-sm text-muted-foreground mb-1">Order Number</p>
                <p className="text-lg font-mono font-bold">{lastOrder.orderNumber}</p>
              </div>
              
              <div className="flex justify-center gap-8 mb-6">
                <div className="text-center">
                  <Package className="h-8 w-8 mx-auto text-muted-foreground mb-1" />
                  <p className="text-sm text-muted-foreground">Items</p>
                  <p className="font-bold">{lastOrder.itemCount}</p>
                </div>
                <div className="text-center">
                  <p className="text-sm text-muted-foreground">Total</p>
                  <p className="text-xl font-bold text-primary">£{lastOrder.total.toFixed(2)}</p>
                </div>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground mb-6">
              Thank you for your order! We've received your payment and will begin processing your order shortly.
            </p>
          )}
          
          <p className="text-sm text-muted-foreground mb-8">
            You'll receive an email confirmation with tracking details once your order ships.
          </p>
          
          <div className="space-y-3">
            <Button 
              onClick={() => navigate("/shop")} 
              className="w-full"
            >
              Continue Shopping
            </Button>
            <Button 
              onClick={() => navigate("/")} 
              variant="outline" 
              className="w-full"
            >
              Back to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OrderConfirmation;