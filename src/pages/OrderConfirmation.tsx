import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          
          <h1 className="text-2xl font-bold mb-4">Order Confirmed!</h1>
          
          <p className="text-muted-foreground mb-6">
            Thank you for your order! We've received your payment and will begin processing your order shortly.
          </p>
          
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