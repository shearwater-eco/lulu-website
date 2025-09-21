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
    <div className="min-h-screen bg-background py-4 sm:py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto">
          {/* Clean Header */}
          <div className="mb-6 sm:mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground">Checkout</h1>
            <p className="text-muted-foreground mt-2">Complete your order details below</p>
          </div>
          
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-8">
            {/* Left Column - Checkout Forms */}
            <div className="lg:col-span-2 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Address Card */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      📦 Shipping Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Name Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="shipping-firstName" className="text-sm font-medium">
                          First Name *
                        </Label>
                        <Input
                          id="shipping-firstName"
                          value={shippingAddress.firstName}
                          onChange={(e) => handleInputChange('shipping', 'firstName', e.target.value)}
                          placeholder="Enter first name"
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipping-lastName" className="text-sm font-medium">
                          Last Name *
                        </Label>
                        <Input
                          id="shipping-lastName"
                          value={shippingAddress.lastName}
                          onChange={(e) => handleInputChange('shipping', 'lastName', e.target.value)}
                          placeholder="Enter last name"
                          required
                          className="h-11"
                        />
                      </div>
                    </div>

                    {/* Contact Fields */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="shipping-email" className="text-sm font-medium">
                          Email Address *
                        </Label>
                        <Input
                          id="shipping-email"
                          type="email"
                          value={shippingAddress.email}
                          onChange={(e) => handleInputChange('shipping', 'email', e.target.value)}
                          placeholder="your.email@example.com"
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipping-phone" className="text-sm font-medium">
                          Phone Number
                        </Label>
                        <Input
                          id="shipping-phone"
                          value={shippingAddress.phone}
                          onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                          placeholder="+44 7XXX XXX XXX"
                          className="h-11"
                        />
                      </div>
                    </div>

                    {/* Address Fields */}
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="shipping-address1" className="text-sm font-medium">
                          Address Line 1 *
                        </Label>
                        <Input
                          id="shipping-address1"
                          value={shippingAddress.addressLine1}
                          onChange={(e) => handleInputChange('shipping', 'addressLine1', e.target.value)}
                          placeholder="123 Main Street"
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipping-address2" className="text-sm font-medium">
                          Address Line 2 <span className="text-muted-foreground">(Optional)</span>
                        </Label>
                        <Input
                          id="shipping-address2"
                          value={shippingAddress.addressLine2}
                          onChange={(e) => handleInputChange('shipping', 'addressLine2', e.target.value)}
                          placeholder="Apartment, suite, etc."
                          className="h-11"
                        />
                      </div>
                    </div>

                    {/* City, State, Postal */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="shipping-city" className="text-sm font-medium">
                          City *
                        </Label>
                        <Input
                          id="shipping-city"
                          value={shippingAddress.city}
                          onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                          placeholder="Cardiff"
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipping-state" className="text-sm font-medium">
                          County *
                        </Label>
                        <Input
                          id="shipping-state"
                          value={shippingAddress.state}
                          onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                          placeholder="Wales"
                          required
                          className="h-11"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="shipping-postal" className="text-sm font-medium">
                          Postcode *
                        </Label>
                        <Input
                          id="shipping-postal"
                          value={shippingAddress.postalCode}
                          onChange={(e) => handleInputChange('shipping', 'postalCode', e.target.value)}
                          placeholder="CF10 1AA"
                          required
                          className="h-11"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address Card */}
                <Card className="shadow-sm">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-lg font-semibold text-foreground">
                      💳 Billing Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-3 mb-4">
                      <input
                        type="checkbox"
                        id="same-as-shipping"
                        checked={sameAsShipping}
                        onChange={(e) => handleSameAsShippingChange(e.target.checked)}
                        className="h-4 w-4 rounded"
                      />
                      <Label htmlFor="same-as-shipping" className="text-sm font-medium cursor-pointer">
                        Same as shipping address
                      </Label>
                    </div>
                    
                    {!sameAsShipping && (
                      <div className="space-y-4 pt-4 border-t">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="billing-firstName" className="text-sm font-medium">
                              First Name *
                            </Label>
                            <Input
                              id="billing-firstName"
                              value={billingAddress.firstName}
                              onChange={(e) => handleInputChange('billing', 'firstName', e.target.value)}
                              placeholder="Enter first name"
                              required
                              className="h-11"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billing-lastName" className="text-sm font-medium">
                              Last Name *
                            </Label>
                            <Input
                              id="billing-lastName"
                              value={billingAddress.lastName}
                              onChange={(e) => handleInputChange('billing', 'lastName', e.target.value)}
                              placeholder="Enter last name"
                              required
                              className="h-11"
                            />
                          </div>
                        </div>
                        {/* Add remaining billing fields if needed */}
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Place Order Button */}
                <Card className="shadow-sm bg-primary/5">
                  <CardContent className="p-6">
                    <Button 
                      type="submit" 
                      className="w-full h-12 text-base font-semibold" 
                      disabled={isProcessing}
                    >
                      {isProcessing ? (
                        <span className="flex items-center">
                          <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                          Processing Order...
                        </span>
                      ) : (
                        `Complete Order - £${(total + 4.99).toFixed(2)}`
                      )}
                    </Button>
                    <p className="text-xs text-muted-foreground text-center mt-3">
                      🔒 Your payment information is secure and encrypted
                    </p>
                  </CardContent>
                </Card>
              </form>
            </div>

            {/* Right Column - Order Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-sm sticky top-4">
                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold text-foreground">
                    🛒 Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Items List */}
                  <div className="space-y-4">
                    {items.map((item) => (
                      <div key={item.product.id} className="flex items-start space-x-3 p-3 rounded-lg bg-background">
                        <div className="flex-shrink-0 text-2xl bg-primary/10 p-2 rounded-lg">
                          {item.product.image}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-sm text-foreground truncate">
                            {item.product.name}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold text-sm text-foreground">
                            £{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <Separator />
                  
                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-medium">£{total.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-medium">£4.99</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="font-semibold text-base">Total</span>
                      <span className="font-bold text-lg text-primary">
                        £{(total + 4.99).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  {/* Trust Indicators */}
                  <div className="pt-4 border-t space-y-2">
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-2">✅</span>
                      Free returns within 30 days
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-2">🚚</span>
                      Fast, eco-friendly delivery
                    </div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <span className="mr-2">🌱</span>
                      100% sustainable packaging
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