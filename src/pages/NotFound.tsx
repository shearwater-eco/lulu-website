import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import luluMascot from "@/assets/lulu-mascot.png";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-light/20 via-background to-accent/10">
      <div className="container mx-auto px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <img 
              src={luluMascot} 
              alt="Lulu the Shearwater looking confused"
              className="w-48 mx-auto mb-6 animate-bounce-gentle"
            />
          </div>
          
          <div className="mosaic-border rounded-2xl bg-card/80 backdrop-blur p-8 mb-8">
            <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Oops! Lulu Can't Find This Page
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Looks like this page flew away! Don't worry, Lulu will help you get back on track.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => window.history.back()}
              variant="outline"
              size="lg"
              className="text-lg px-6 py-3"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
            <a href="/">
              <Button 
                size="lg"
                className="btn-hero text-lg px-6 py-3"
              >
                <Home className="mr-2 h-5 w-5" />
                Return Home
              </Button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
