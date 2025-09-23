import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, FileText } from "lucide-react";

const Catalog = () => {
  const valURange = [
    {
      name: "VAL-U-WISE",
      type: "Toilet Tissue",
      ply: "2-ply",
      sheets: "180 sheets",
      length: "22M",
      size: "11×10cm",
      color: "Bleached"
    },
    {
      name: "VAL-SMART",
      type: "Toilet Tissue", 
      ply: "2-ply",
      sheets: "200 sheets",
      length: "24M",
      size: "12×10cm",
      color: "Bleached"
    },
    {
      name: "VAL-U-SMART",
      type: "Kitchen Rolls",
      ply: "2-ply", 
      sheets: "100 sheets",
      length: "22.5M",
      size: "22.5×21.5cm",
      color: "Bleached"
    },
    {
      name: "VAL-U-SMART",
      type: "Facial Tissue",
      ply: "2-ply",
      sheets: "Various",
      length: "-",
      size: "Standard",
      color: "Bleached"
    }
  ];

  const ecoRange = [
    {
      name: "FAMILY ECO",
      type: "Toilet Tissue",
      ply: "3-ply",
      sheets: "200 sheets", 
      length: "24M",
      size: "12×10cm",
      color: "Unbleached"
    },
    {
      name: "EXCEPTIONAL", 
      type: "Toilet Tissue",
      ply: "3-ply",
      sheets: "300 sheets",
      length: "36M", 
      size: "12×10cm",
      color: "Unbleached"
    },
    {
      name: "KITCHECO SUPER",
      type: "Kitchen Rolls",
      ply: "3-ply",
      sheets: "200 sheets",
      length: "45M",
      size: "22.5×21.5cm", 
      color: "Unbleached"
    },
    {
      name: "ECO HAND TOWEL",
      type: "Hand Towel",
      ply: "Multi-ply", 
      sheets: "Various",
      length: "-",
      size: "Standard",
      color: "Unbleached"
    }
  ];

  const additionalProducts = [
    "Facial Tissues (Various formats)",
    "Hand Towels (Multiple sizes)",
    "Jumbo Toilet Tissue Rolls", 
    "Regular Toilet Tissue (Naked packaging)",
    "Boxed Toilet Tissue Rolls"
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="bg-gradient-to-br from-primary/20 to-secondary/10 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            LULU Product Catalogue
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            Discover our complete range of sustainable paper products designed for businesses and wholesale customers.
          </p>
          <Button 
            className="btn-hero"
            onClick={() => window.open('/LULU_Product_Catalogue.xlsx', '_blank')}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Full Catalogue (Excel)
          </Button>
        </div>
      </section>

      {/* VAL-U Range */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="secondary" className="text-lg px-4 py-2 mb-4">
              VAL-U Range
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Value Without Compromise
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our budget-friendly line that doesn't sacrifice quality. Perfect for high-volume commercial use.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valURange.map((product, index) => (
              <Card key={index} className="mosaic-border hover:shadow-lg transition-all duration-300">
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="outline">{product.type}</Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ply:</span>
                    <span className="font-medium">{product.ply}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sheets:</span>
                    <span className="font-medium">{product.sheets}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Length:</span>
                    <span className="font-medium">{product.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium">{product.color}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ECO Range */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge variant="default" className="text-lg px-4 py-2 mb-4 bg-success text-white">
              ECO Range
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Premium Sustainable Solutions
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our flagship eco-friendly range. Unbleached, higher ply count, and superior performance for environmentally conscious businesses.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ecoRange.map((product, index) => (
              <Card key={index} className="mosaic-border hover:shadow-lg transition-all duration-300 border-success/30">
                <CardHeader>
                  <CardTitle className="text-lg">{product.name}</CardTitle>
                  <Badge variant="default" className="bg-success text-white">{product.type}</Badge>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Ply:</span>
                    <span className="font-medium">{product.ply}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Sheets:</span>
                    <span className="font-medium">{product.sheets}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Length:</span>
                    <span className="font-medium">{product.length}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Size:</span>
                    <span className="font-medium">{product.size}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Type:</span>
                    <span className="font-medium text-success">{product.color}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Products */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Additional Products Available
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We also offer a wide range of specialized products to meet all your business needs.
            </p>
          </div>

          <div className="max-w-2xl mx-auto">
            <Card className="mosaic-border">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <FileText className="h-5 w-5 mr-2" />
                  Extended Product Range
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {additionalProducts.map((product, index) => (
                    <li key={index} className="flex items-center text-muted-foreground">
                      <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                      {product}
                    </li>
                  ))}
                </ul>
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground text-center">
                    Contact our sales team for MOQ, custom specifications, and pricing details for all products.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-primary/10 to-secondary/5">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Ready to Place an Order?
          </h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Get in touch with our business team for custom pricing, MOQ details, and delivery schedules.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="btn-hero text-lg px-8 py-3">
              Request Quote
            </Button>
            <Button 
              variant="outline" 
              className="text-lg px-8 py-3"
              onClick={() => window.open('/LULU_Product_Catalogue.xlsx', '_blank')}
            >
              <Download className="h-4 w-4 mr-2" />
              Download Catalogue
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Catalog;