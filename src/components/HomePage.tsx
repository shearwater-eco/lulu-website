import { ArrowRight, Star, Truck, Shield, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EcoBadges from "./EcoBadges";
import luluMascot from "@/assets/lulu-mascot.png";
import luluLandscape from "@/assets/lulu-mascot-landscape.png";

const HomePage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary-light/20 via-background to-accent/10">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 text-center lg:text-left">
              <div className="mosaic-border rounded-2xl inline-block p-6 bg-background/80 backdrop-blur">
                <h1 className="text-5xl lg:text-7xl font-bold text-primary tracking-tight">
                  LULU
                </h1>
                <p className="text-xl lg:text-2xl text-foreground/80 mt-2">
                  TOILET TISSUE by
                </p>
              </div>
              
              <h2 className="text-2xl lg:text-3xl font-bold text-foreground leading-tight">
                Gentle on you, kind to the Earth
              </h2>
              
              <p className="text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Welsh sustainable paper products that don't compromise on quality. 
                Join the eco-revolution with Lulu the Shearwater!
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  size="lg" 
                  className="btn-hero text-lg px-8 py-4 rounded-xl shadow-brand hover:shadow-lg transition-all duration-300"
                >
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="btn-secondary text-lg px-8 py-4 rounded-xl border-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground transition-all duration-300"
                >
                  For Businesses
                  <Users className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            <div className="relative">
              <div className="mosaic-border rounded-3xl bg-gradient-to-br from-primary-light/30 to-accent/20 p-8">
                <img 
                  src={luluMascot} 
                  alt="Lulu the Shearwater mascot giving thumbs up"
                  className="w-full max-w-md mx-auto drop-shadow-2xl animate-bounce-gentle"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 rounded-full font-bold text-sm shadow-lg animate-pulse">
                Meet Lulu! 👋
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Eco Certifications */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Trusted by Nature, Loved by You
            </h3>
            <p className="text-lg text-muted-foreground">
              Our eco-certifications speak for themselves
            </p>
          </div>
          <EcoBadges />
        </div>
      </section>

      {/* Product Highlights */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              Our Sustainable Range
            </h3>
            <p className="text-lg text-muted-foreground">
              Premium quality without compromising the planet
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Toilet Tissue",
                description: "Soft, strong, and sustainable. Perfect for everyday use.",
                features: ["9 Rolls", "3-Ply", "FSC Certified"],
                color: "bg-primary/10 border-primary/20"
              },
              {
                title: "Kitchen Rolls",
                description: "Absorbent and eco-friendly for all your kitchen needs.",
                features: ["6 Rolls", "2-Ply", "Plastic-Free"],
                color: "bg-secondary/10 border-secondary/20"
              },
              {
                title: "Facial Tissues",
                description: "Gentle on your skin, gentle on the environment.",
                features: ["Box of 150", "Ultra Soft", "Chemical-Free"],
                color: "bg-accent/10 border-accent/20"
              }
            ].map((product, index) => (
              <Card key={index} className={`mosaic-border ${product.color} hover:shadow-lg transition-all duration-300`}>
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center">
                    <span className="text-2xl font-bold text-white">{index + 1}</span>
                  </div>
                  <h4 className="text-xl font-bold text-foreground mb-2">
                    {product.title}
                  </h4>
                  <p className="text-muted-foreground mb-4">
                    {product.description}
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {product.features.map((feature, idx) => (
                      <span 
                        key={idx}
                        className="px-3 py-1 bg-primary/10 text-primary text-sm rounded-full font-medium"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose LULU */}
      <section className="py-16 bg-gradient-to-r from-primary-light/10 via-accent/5 to-secondary/10">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={luluLandscape} 
                alt="Lulu the Shearwater in Welsh coastal landscape"
                className="w-full rounded-2xl shadow-2xl"
              />
            </div>
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-foreground">
                Why Choose LULU?
              </h3>
              <div className="space-y-4">
                {[
                  {
                    icon: Heart,
                    title: "Welsh Heritage",
                    description: "Proudly made in Wales with local craftsmanship and care."
                  },
                  {
                    icon: Shield,
                    title: "Supermarket Quality",
                    description: "Premium quality that matches leading brands, without the environmental cost."
                  },
                  {
                    icon: Truck,
                    title: "Convenient Delivery",
                    description: "Subscribe and never run out. Delivered right to your door."
                  }
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={index} className="flex items-start space-x-4">
                      <div className="flex-shrink-0 p-2 rounded-lg bg-primary/10">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-foreground mb-1">
                          {item.title}
                        </h4>
                        <p className="text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
              <Button className="btn-hero">
                Start Your Subscription
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Customer Reviews */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-foreground mb-4">
              What Our Customers Say
            </h3>
            <p className="text-lg text-muted-foreground">
              Join thousands of happy customers making the switch to sustainable
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah M.",
                location: "Cardiff",
                rating: 5,
                review: "Love the quality and knowing I'm helping the environment. Lulu is adorable too!"
              },
              {
                name: "James T.",
                location: "London",
                rating: 5,
                review: "Switched our office to LULU. Great quality, competitive pricing, and sustainable!"
              },
              {
                name: "Emma W.",
                location: "Edinburgh",
                rating: 5,
                review: "The subscription service is perfect - never run out and delivered on time."
              }
            ].map((review, index) => (
              <Card key={index} className="mosaic-border hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 italic">
                    "{review.review}"
                  </p>
                  <div className="text-sm">
                    <p className="font-semibold text-foreground">{review.name}</p>
                    <p className="text-muted-foreground">{review.location}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary/20 to-primary opacity-90"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center space-y-6">
            <h3 className="text-3xl lg:text-4xl font-bold">
              Ready to Join the Eco-Revolution?
            </h3>
            <p className="text-xl text-primary-foreground/90 max-w-2xl mx-auto">
              Make the switch to sustainable paper products without compromising on quality. 
              Lulu and the planet will thank you!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                variant="secondary"
                className="text-lg px-8 py-4 bg-background text-foreground hover:bg-background/90"
              >
                Shop Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="text-lg px-8 py-4 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
              >
                Learn More About Us
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;