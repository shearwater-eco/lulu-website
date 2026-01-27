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
import { addressSchema } from "@/lib/validations/checkout";
import { z } from "zod";

type FieldErrors = Partial<Record<keyof Address, string>>;

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isProcessing, setIsProcessing] = useState(false);
  const [shippingErrors, setShippingErrors] = useState<FieldErrors>({});
  const [billingErrors, setBillingErrors] = useState<FieldErrors>({});
  
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
      // Clear error when user starts typing
      if (shippingErrors[field]) {
        setShippingErrors(prev => ({ ...prev, [field]: undefined }));
      }
      if (sameAsShipping) {
        setBillingAddress(prev => ({ ...prev, [field]: value }));
      }
    } else {
      setBillingAddress(prev => ({ ...prev, [field]: value }));
      if (billingErrors[field]) {
        setBillingErrors(prev => ({ ...prev, [field]: undefined }));
      }
    }
  };

  const handleSameAsShippingChange = (checked: boolean) => {
    setSameAsShipping(checked);
    if (checked) {
      setBillingAddress(shippingAddress);
      setBillingErrors({});
    }
  };

  const validateAddress = (address: Address, setErrors: (errors: FieldErrors) => void): boolean => {
    try {
      addressSchema.parse(address);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: FieldErrors = {};
        error.errors.forEach((err) => {
          const field = err.path[0] as keyof Address;
          fieldErrors[field] = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
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

    // Validate shipping address
    const isShippingValid = validateAddress(shippingAddress, setShippingErrors);
    
    // Validate billing address (only if not same as shipping)
    const actualBillingAddress = sameAsShipping ? shippingAddress : billingAddress;
    const isBillingValid = sameAsShipping 
      ? true 
      : validateAddress(billingAddress, setBillingErrors);

    if (!isShippingValid || !isBillingValid) {
      toast({
        title: "Validation Error",
        description: "Please correct the errors in the form before submitting.",
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

  const renderInputField = (
    type: 'shipping' | 'billing',
    field: keyof Address,
    label: string,
    address: Address,
    errors: FieldErrors,
    inputType: string = 'text',
    required: boolean = true
  ) => {
    const id = `${type}-${field}`;
    const error = errors[field];
    
    return (
      <div>
        <Label htmlFor={id}>{label}{!required && ' (Optional)'}</Label>
        <Input
          id={id}
          type={inputType}
          value={address[field]}
          onChange={(e) => handleInputChange(type, field, e.target.value)}
          className={error ? 'border-destructive' : ''}
          required={required}
        />
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>
    );
  };

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
                      {renderInputField('shipping', 'firstName', 'First Name', shippingAddress, shippingErrors)}
                      {renderInputField('shipping', 'lastName', 'Last Name', shippingAddress, shippingErrors)}
                    </div>
                    {renderInputField('shipping', 'email', 'Email', shippingAddress, shippingErrors, 'email')}
                    {renderInputField('shipping', 'phone', 'Phone', shippingAddress, shippingErrors, 'tel', false)}
                    {renderInputField('shipping', 'addressLine1', 'Address Line 1', shippingAddress, shippingErrors)}
                    {renderInputField('shipping', 'addressLine2', 'Address Line 2', shippingAddress, shippingErrors, 'text', false)}
                    <div className="grid md:grid-cols-3 gap-4">
                      {renderInputField('shipping', 'city', 'City', shippingAddress, shippingErrors)}
                      {renderInputField('shipping', 'state', 'State/County', shippingAddress, shippingErrors)}
                      {renderInputField('shipping', 'postalCode', 'Postal Code', shippingAddress, shippingErrors)}
                    </div>
                  </CardContent>
                </Card>

                {/* Billing Address */}
                <Card className="mt-6">
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
                        {renderInputField('billing', 'firstName', 'First Name', billingAddress, billingErrors)}
                        {renderInputField('billing', 'lastName', 'Last Name', billingAddress, billingErrors)}
                      </div>
                      {renderInputField('billing', 'email', 'Email', billingAddress, billingErrors, 'email')}
                      {renderInputField('billing', 'phone', 'Phone', billingAddress, billingErrors, 'tel', false)}
                      {renderInputField('billing', 'addressLine1', 'Address Line 1', billingAddress, billingErrors)}
                      {renderInputField('billing', 'addressLine2', 'Address Line 2', billingAddress, billingErrors, 'text', false)}
                      <div className="grid md:grid-cols-3 gap-4">
                        {renderInputField('billing', 'city', 'City', billingAddress, billingErrors)}
                        {renderInputField('billing', 'state', 'State/County', billingAddress, billingErrors)}
                        {renderInputField('billing', 'postalCode', 'Postal Code', billingAddress, billingErrors)}
                      </div>
                    </CardContent>
                  )}
                </Card>

                <Button 
                  type="submit" 
                  className="w-full mt-6" 
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
