import EcoBadges from "../components/EcoBadges";
import { Leaf, TreePine, Recycle, Factory } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const Sustainability = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-success/20 to-primary-light/20 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
            Our Commitment to the Planet
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto">
            Every LULU product is designed with the environment in mind. We believe that caring 
            for our planet and caring for our customers go hand in hand.
          </p>
        </div>
      </section>

      {/* Eco Certifications */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Our Eco Certifications
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">
              Independently verified commitments to sustainability
            </p>
          </div>
          <EcoBadges />
        </div>
      </section>

      {/* Environmental Impact */}
      <section className="py-8 sm:py-12 lg:py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
              Our Environmental Impact
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              {
                icon: TreePine,
                title: "Trees Saved",
                value: "500+",
                description: "Through responsible sourcing",
                color: "text-success"
              },
              {
                icon: Factory,
                title: "Carbon Reduced",
                value: "2 Tonnes",
                description: "CO2 equivalent per month",
                color: "text-primary" 
              },
              {
                icon: Recycle,
                title: "Plastic Eliminated",
                value: "100%",
                description: "Zero plastic in packaging",
                color: "text-secondary"
              },
              {
                icon: Leaf,
                title: "Chemicals Avoided",
                value: "Zero",
                description: "Harmful chemicals used",
                color: "text-accent"
              }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card key={index} className="mosaic-border text-center hover:shadow-lg transition-all duration-300">
                  <CardContent className="p-4 sm:p-6">
                    <div className={`inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-muted mb-4 ${stat.color}`}>
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
                      {stat.value}
                    </h3>
                    <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                      {stat.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Sustainability Journey */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                Our Sustainability Journey
              </h2>
              <p className="text-base sm:text-lg text-muted-foreground">
                From raw materials to your doorstep, every step is designed with the planet in mind
              </p>
            </div>
            
            <div className="space-y-6 sm:space-y-8">
              {[
                {
                  step: "1",
                  title: "Responsible Sourcing",
                  description: "All our paper comes from FSC-certified forests, ensuring responsible forest management and biodiversity protection."
                },
                {
                  step: "2", 
                  title: "Clean Production",
                  description: "Our manufacturing process uses renewable energy and eliminates harmful chemicals, creating products that are safe for you and the environment."
                },
                {
                  step: "3",
                  title: "Plastic-Free Packaging",
                  description: "Every package is completely plastic-free, using biodegradable and recyclable materials that won't harm marine life."
                },
                {
                  step: "4",
                  title: "Carbon-Neutral Delivery",
                  description: "We offset all delivery emissions and use local distribution to minimize our carbon footprint."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4 sm:space-x-6">
                  <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-base sm:text-lg">
                    {item.step}
                  </div>
                  <div className="flex-1 pt-1">
                    <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Sustainability;