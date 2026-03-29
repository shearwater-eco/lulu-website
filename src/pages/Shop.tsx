import { Search, Filter, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useCart } from "@/hooks/useCart";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/lib/ecommerce-types";

const Shop = () => {
  const { addItem } = useCart();
  const { toast } = useToast();
  
  const products: Product[] = [
    {
      id: "1",
      name: "LULU Toilet Tissue",
      description: "9 rolls of 3-ply sustainable toilet tissue",
      price: 12.99,
      image: "🧻",
      category: "toilet-tissue",
      stock: 50,
      sku: "LLU-TT-001"
    },
    {
      id: "2",
      name: "LULU Kitchen Rolls", 
      description: "6 rolls of absorbent kitchen paper",
      price: 9.99,
      image: "🧽",
      category: "kitchen-rolls",
      stock: 30,
      sku: "LLU-KR-001"
    },
    {
      id: "3",
      name: "LULU Facial Tissues",
      description: "Box of 150 ultra-soft facial tissues",
      price: 4.99,
      image: "🤧",
      category: "facial-tissues",
      stock: 75,
      sku: "LLU-FT-001"
    }
  ];

  const handleAddToCart = (product: Product) => {
    addItem(product);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light/20 to-accent/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Shop LULU Products
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our full range of sustainable paper products. Gentle on you, kind to the Earth.
          </p>
        </div>
      </section>

      {/* Filters and Search */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center space-x-4 flex-1">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search products..." 
                  className="pl-10"
                />
              </div>
              <Button variant="outline" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span>Filters</span>
              </Button>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" size="icon">
                <Grid className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon">
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product) => (
              <Card key={product.id} className="mosaic-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="text-6xl text-center mb-4">
                    {product.image}
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {product.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-primary">
                      £{product.price.toFixed(2)}
                    </span>
                    <Button 
                      className="btn-hero"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;