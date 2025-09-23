import { Building, Users, Truck, Calculator, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const Business = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/20 to-secondary/10 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content Side */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Business & Wholesale Solutions
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Join forward-thinking businesses making the switch to sustainable paper products. 
                Competitive pricing, reliable supply, and eco-credentials your customers will love.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="btn-hero text-lg px-8 py-3">
                  Request Quote
                </Button>
                <Button variant="outline" className="text-lg px-8 py-3">
                  View Catalog
                </Button>
              </div>
            </div>
            
            {/* Video Side */}
            <div className="relative max-w-md mx-auto lg:mx-0">
              <div className="aspect-video rounded-lg overflow-hidden shadow-2xl bg-muted/20">
                <video 
                  className="w-full h-full object-contain"
                  controls
                  poster="/lulu-mascot-landscape.png"
                >
                  <source src="/lulu-supermarket-video.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="absolute -bottom-3 -right-3 bg-primary/90 text-primary-foreground px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-sm">
                See LULU in Action
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Why Choose LULU for Business?
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {[
              {
                icon: Building,
                title: "Bulk Discounts",
                description: "Save up to 30% on wholesale orders",
                color: "text-primary"
              },
              {
                icon: Truck,
                title: "Reliable Supply",
                description: "Guaranteed stock and delivery schedules",
                color: "text-secondary"
              },
              {
                icon: Users,
                title: "Customer Appeal",
                description: "Boost your green credentials",
                color: "text-success"
              },
              {
                icon: Calculator,
                title: "Cost Savings",
                description: "Competitive pricing vs. traditional brands",
                color: "text-accent"
              }
            ].map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="mosaic-border text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-6">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4 ${benefit.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-foreground mb-2">
                      {benefit.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {benefit.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Wholesale Pricing Tiers
            </h2>
            <p className="text-muted-foreground">
              The more you order, the more you save
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Starter",
                minimum: "50+ units",
                discount: "10% off",
                features: ["Monthly delivery", "Standard support", "Invoice payment"]
              },
              {
                title: "Business",
                minimum: "200+ units", 
                discount: "20% off",
                features: ["Bi-weekly delivery", "Priority support", "30-day terms", "Custom packaging"],
                popular: true
              },
              {
                title: "Enterprise",
                minimum: "500+ units",
                discount: "30+ off",
                features: ["Weekly delivery", "Dedicated account manager", "60-day terms", "Custom branding", "Sustainability reporting"]
              }
            ].map((tier, index) => (
              <Card key={index} className={`mosaic-border relative ${tier.popular ? 'border-primary border-2' : ''}`}>
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-primary-foreground px-4 py-1 rounded-full text-sm font-bold">
                    Most Popular
                  </div>
                )}
                <CardContent className="p-6 text-center">
                  <h3 className="text-xl font-bold text-foreground mb-2">
                    {tier.title}
                  </h3>
                  <p className="text-muted-foreground mb-2">
                    {tier.minimum}
                  </p>
                  <p className="text-2xl font-bold text-primary mb-6">
                    {tier.discount}
                  </p>
                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-muted-foreground">
                        <CheckCircle className="h-4 w-4 text-success mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button className={`w-full ${tier.popular ? 'btn-hero' : ''}`}>
                    Get Quote
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Request a Quote
              </h2>
              <p className="text-muted-foreground">
                Get in touch with our business team for custom pricing and solutions
              </p>
            </div>
            
            <Card className="mosaic-border">
              <CardContent className="p-8">
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Company Name *
                      </label>
                      <Input placeholder="Your company name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Contact Name *
                      </label>
                      <Input placeholder="Your full name" />
                    </div>
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input type="email" placeholder="your@company.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Phone
                      </label>
                      <Input type="tel" placeholder="+44 xxx xxx xxxx" />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Monthly Volume Required
                    </label>
                    <Input placeholder="e.g., 100 toilet roll packs, 50 kitchen roll packs" />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Additional Requirements
                    </label>
                    <Textarea 
                      placeholder="Tell us about your specific needs, delivery requirements, or any questions..."
                      rows={4}
                    />
                  </div>
                  
                  <Button className="btn-hero w-full text-lg py-3">
                    Send Quote Request
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Business;