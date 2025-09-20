import { ArrowRight, Star, Truck, Shield, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EcoBadges from "./EcoBadges";
import luluMascot from "@/assets/lulu-mascot.png";
import luluLandscape from "@/assets/lulu-mascot-landscape.png";

const HomePage = () => {
  return (
    <div className="page-frame">
      <div className="page-content">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <div className="mosaic-border-thick rounded-2xl inline-block p-8 bg-white">
                  <h1 className="text-6xl lg:text-8xl font-bold logo-mosaic tracking-tight mb-4">
                    LULU
                  </h1>
                  <p className="text-xl lg:text-2xl text-foreground font-bold">
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
                  <Button className="btn-hero text-lg">
                    Shop Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                  <Button className="btn-secondary text-lg">
                    For Businesses
                    <Users className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </div>

              <div className="relative">
                <div className="mosaic-border-thick rounded-3xl bg-white p-8">
                  <img 
                    src={luluMascot} 
                    alt="Lulu the Shearwater mascot holding LULU toilet paper box"
                    className="w-full max-w-md mx-auto drop-shadow-2xl animate-bounce-gentle"
                  />
                </div>
                <div className="absolute -bottom-4 -right-4 mosaic-border bg-white px-6 py-3 rounded-full font-bold text-lg shadow-vibrant animate-pulse">
                  Meet Lulu! 👋
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Eco Certifications */}
        <section className="section-mosaic py-16">
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
                  bgColor: "vibrant-green"
                },
                {
                  title: "Kitchen Rolls",
                  description: "Absorbent and eco-friendly for all your kitchen needs.",
                  features: ["6 Rolls", "2-Ply", "Plastic-Free"],
                  bgColor: "vibrant-blue"
                },
                {
                  title: "Facial Tissues",
                  description: "Gentle on your skin, gentle on the environment.",
                  features: ["Box of 150", "Ultra Soft", "Chemical-Free"],
                  bgColor: "vibrant-orange"
                }
              ].map((product, index) => (
                <Card key={index} className="card-vibrant hover:shadow-vibrant transition-all duration-300">
                  <CardContent className="p-6 text-center">
                    <div 
                      className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold"
                      style={{ backgroundColor: `hsl(var(--${product.bgColor}))` }}
                    >
                      {index + 1}
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
                          className="px-3 py-1 rounded-full font-medium text-sm text-white"
                          style={{ backgroundColor: `hsl(var(--${product.bgColor}))` }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <Button variant="outline" className="w-full mosaic-border">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose LULU */}
        <section className="section-mosaic py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mosaic-border-thick rounded-2xl overflow-hidden">
                  <img 
                    src={luluLandscape} 
                    alt="Lulu the Shearwater in Welsh coastal landscape"
                    className="w-full"
                  />
                </div>
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
                      description: "Proudly made in Wales with local craftsmanship and care.",
                      color: "vibrant-coral"
                    },
                    {
                      icon: Shield,
                      title: "Supermarket Quality",
                      description: "Premium quality that matches leading brands, without the environmental cost.",
                      color: "vibrant-purple"
                    },
                    {
                      icon: Truck,
                      title: "Convenient Delivery",
                      description: "Subscribe and never run out. Delivered right to your door.",
                      color: "vibrant-turquoise"
                    }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div 
                          className="flex-shrink-0 p-3 rounded-lg text-white"
                          style={{ backgroundColor: `hsl(var(--${item.color}))` }}
                        >
                          <Icon className="h-6 w-6" />
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
                  review: "Love the quality and knowing I'm helping the environment. Lulu is adorable too!",
                  color: "vibrant-green"
                },
                {
                  name: "James T.",
                  location: "London",
                  rating: 5,
                  review: "Switched our office to LULU. Great quality, competitive pricing, and sustainable!",
                  color: "secondary"
                },
                {
                  name: "Emma W.",
                  location: "Edinburgh",
                  rating: 5,
                  review: "The subscription service is perfect - never run out and delivered on time.",
                  color: "accent"
                }
              ].map((review, index) => (
                <Card key={index} className="card-vibrant hover:shadow-vibrant transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-current text-accent" />
                      ))}
                    </div>
                    <p className="text-muted-foreground mb-4 italic">
                      "{review.review}"
                    </p>
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">{review.name}</p>
                      <p className="text-muted-foreground">{review.location}</p>
                    </div>
                    <div 
                      className="absolute top-4 right-4 w-4 h-4 rounded-full"
                      style={{ backgroundColor: `hsl(var(--${review.color}))` }}
                    ></div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="section-mosaic py-16 relative">
          <div className="absolute inset-0 bg-mosaic opacity-10"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center space-y-6">
              <h3 className="text-4xl lg:text-5xl font-bold text-foreground">
                Ready to Join the Eco-Revolution?
              </h3>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Make the switch to sustainable paper products without compromising on quality. 
                Lulu and the planet will thank you!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button className="btn-hero text-xl px-12 py-6">
                  Shop Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button className="btn-secondary text-xl px-12 py-6">
                  Learn More About Us
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;