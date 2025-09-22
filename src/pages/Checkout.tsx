import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useCart } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { Address } from "@/lib/ecommerce-types";

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  
  const [shippingAddress, setShippingAddress] = useState<Address>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "UK"
  });

  const [billingAddress, setBillingAddress] = useState<Address>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    country: "UK"
  });

  const [sameAsShipping, setSameAsShipping] = useState(true);

  const handleInputChange = (
    type: 'shipping' | 'billing',
    field: keyof Address,
    value: string
  ) => {
    if (type === 'shipping') {
      setShippingAddress(prev => ({ ...prev, [field]: value }));
      if (sameAsShipping) {
        setBillingAddress(prev => ({ ...prev, [field]: value }));
      }
    } else {
      setBillingAddress(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    if (checked) {
      setBillingAddress(shippingAddress);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (items.length === 0) {
      toast({
        title: "Error",
        description: "Your cart is empty",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Here you would integrate with your payment processor
      // For now, we'll just simulate a successful order
      
      clearCart();
      
      toast({
        title: "Order Placed Successfully!",
        description: "Thank you for your purchase. You'll receive a confirmation email shortly.",
      });
      
      navigate("/order-confirmation");
    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center p-8">
            <h2 className="text-2xl font-bold mb-4">Cart is Empty</h2>
            <p className="text-muted-foreground mb-6">Add some products to your cart before checking out.</p>
            <Button onClick={() => navigate("/shop")} className="w-full">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Checkout Form */}
            <div className="space-y-6">
              <form onSubmit={handleSubmit}>
                {/* Shipping Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="shipping-firstName">First Name</Label>
                        <Input
                          id="shipping-firstName"
                          value={shippingAddress.firstName}
                          onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="shipping-lastName">Last Name</Label>
                        <Input
                          id="shipping-lastName"
                          value={shippingAddress.lastName}
                          onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="shipping-email">Email</Label>
                      <Input
                        id="shipping-email"
                        type="email"
                        value={shippingAddress.email}
                        onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-phone">Phone</Label>
                      <Input
                        id="shipping-phone"
                        value={shippingAddress.phone}
                        onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-address1">Address Line 1</Label>
                      <Input
                        id="shipping-address1"
                        value={shippingAddress.addressLine1}
                        onChange={(e) => handleInputChange('shipping', 'addressLine1', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="shipping-address2">Address Line 2 (Optional)</Label>
                      <Input
                        id="shipping-address2"
                        value={shippingAddress.addressLine2}
                        onChange={(e) => handleInputChange('shipping', 'addressLine2', e.target.value)}
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="shipping-city">City</Label>
                        <Input
                          id="shipping-city"
                          value={shippingAddress.city}
                          onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="shipping-state">State/County</Label>
                        <Input
                          id="shipping-state"
                          value={shippingAddress.state}
                          onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="shipping-postal">Postal Code</Label>
                        <Input
                          id="shipping-postal"
                          value={shippingAddress.postalCode}
                          onChange={(e) => handleInputChange('shipping', 'postalCode', e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card>
                  <CardHeader>
                    <CardTitle>Billing Address</CardTitle>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="same-as-shipping"
                        checked={sameAsShipping}
                        onChange={(e) => handleSameAsShippingChange(e.target.checked)}
                      />
                      <Label htmlFor="same-as-shipping">Same as shipping address</Label>
                    </div>
                  </CardHeader>
                  {!sameAsShipping && (
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="billing-firstName">First Name</Label>
                          <Input
                            id="billing-firstName"
                            value={billingAddress.firstName}
                            onChange={(e) => handleInputChange('billing', 'firstName', e.target.value)}
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="billing-lastName">Last Name</Label>
                          <Input
                            id="billing-lastName"
                            value={billingAddress.lastName}
                            onChange={(e) => handleInputChange('billing', 'lastName', e.target.value)}
                            required
                          />
                        </div>
                      </div>
                      {/* ... similar fields as shipping address ... */}
                    </CardContent>
                  )}
                </Card>

                <Button 
                  type="submit" 
                  className="w-full" 
                  size="lg"
                  disabled={isProcessing}
                >
                  {isProcessing ? "Processing..." : `Place Order - £${total.toFixed(2)}`}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex justify-between items-start">
                        <div className="flex space-x-3">
                          <div className="text-xl">{item.product.image}</div>
                          <div>
                            <p className="font-medium">{item.product.name}</p>
                            <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="font-medium">£{(item.product.price * item.quantity).toFixed(2)}</p>
                      </div>
                    ))}
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>£{total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Shipping</span>
                        <span>£4.99</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-bold text-lg">
                        <span>Total</span>
                        <span>£{(total + 4.99).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;