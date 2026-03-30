import { ArrowRight, Truck, Shield, Lock, Package, Star, Leaf, Recycle, Droplets, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import luluMascotThumbsUp from "@/assets/lulu-mascot-thumbs-up.png";
import ziggyAlien from "@/assets/ziggy-alien.png";

const HomePage = () => {
  return (
    <div className="bg-background">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="text-center lg:text-left space-y-6">
              <h1 className="text-5xl lg:text-7xl font-black text-foreground leading-tight">
                The Best TP<br />in the Universe
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground font-medium">
                Big value loo roll for everyday homes
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button className="btn-hero text-xl px-10 py-7 font-bold rounded-xl" asChild>
                  <Link to="/shop">
                    Shop 24 Rolls
                    <ArrowRight className="ml-2 h-6 w-6" />
                  </Link>
                </Button>
                <Button variant="outline" className="mosaic-border text-lg px-8 py-6 font-bold rounded-xl" asChild>
                  <Link to="/shop">See 48 Rolls</Link>
                </Button>
              </div>
              <p className="text-lg text-muted-foreground font-semibold">
                Soft. Strong. Smart value.
              </p>
            </div>

            <div className="relative flex items-center justify-center">
              {/* Lulu mascot */}
              <img 
                src={luluMascotThumbsUp} 
                alt="Lulu the mascot"
                className="w-40 lg:w-56 absolute -left-4 lg:left-0 bottom-0 z-10 drop-shadow-lg"
                width={224}
                height={224}
              />
              {/* Product placeholder */}
              <div className="mosaic-border-thick rounded-3xl bg-muted w-64 h-72 lg:w-80 lg:h-96 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Package className="h-16 w-16 mx-auto mb-3 opacity-40" />
                  <p className="text-sm font-medium opacity-60">Product image</p>
                </div>
              </div>
              {/* Ziggy */}
              <img 
                src={ziggyAlien} 
                alt="Ziggy the friendly alien"
                className="w-32 lg:w-44 absolute -right-2 lg:right-0 bottom-0 z-10 drop-shadow-lg"
                width={176}
                height={176}
              />
            </div>
          </div>
        </div>
      </section>

      {/* QUICK VALUE STRIP */}
      <section className="mosaic-border-thick bg-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: Package, text: "24 Rolls. No nonsense." },
              { icon: Star, text: "Great everyday value" },
              { icon: Truck, text: "Delivered to your door" },
              { icon: Shield, text: "Soft & strong" },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <item.icon className="h-8 w-8 text-primary" />
                <p className="font-bold text-foreground text-sm lg:text-base">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCT SECTION - 24 ROLLS */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-5 gap-8">
            {/* Main product - 24 rolls */}
            <div className="lg:col-span-3 mosaic-border-thick rounded-3xl bg-white p-8">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="bg-muted rounded-2xl h-72 flex items-center justify-center">
                  <div className="text-center text-muted-foreground">
                    <Package className="h-16 w-16 mx-auto mb-3 opacity-40" />
                    <p className="text-sm font-medium opacity-60">Product image</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-foreground">Val-U-Smart 24 Rolls</h2>
                  <p className="text-4xl font-black text-primary">£11.99</p>
                  
                  <div className="mosaic-border rounded-xl p-4 bg-accent/10">
                    <p className="font-bold text-foreground text-sm">🎉 Subscribe & Save</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      10% off + 11th box FREE + no price increases for your next 10 boxes
                    </p>
                  </div>

                  <ul className="space-y-2">
                    <li className="flex items-center gap-2 text-foreground font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" /> Big value pack
                    </li>
                    <li className="flex items-center gap-2 text-foreground font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" /> Soft & strong
                    </li>
                    <li className="flex items-center gap-2 text-foreground font-medium">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" /> Made for everyday homes
                    </li>
                  </ul>

                  <Button className="btn-hero w-full text-lg py-6 font-bold rounded-xl" asChild>
                    <Link to="/shop">
                      Buy Now – Free Delivery
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Secondary product - 48 rolls */}
            <div className="lg:col-span-2 mosaic-border rounded-3xl bg-white p-6 flex flex-col justify-between">
              <div>
                <div className="bg-muted rounded-2xl h-48 flex items-center justify-center mb-4">
                  <div className="text-center text-muted-foreground">
                    <Package className="h-12 w-12 mx-auto mb-2 opacity-40" />
                    <p className="text-sm font-medium opacity-60">Product image</p>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">48 Rolls – Stock Up</h3>
                <p className="text-muted-foreground text-sm">
                  The bigger box for bigger families. Even better value per roll.
                </p>
              </div>
              <Button variant="outline" className="mosaic-border w-full mt-4 font-bold rounded-xl" asChild>
                <Link to="/shop">View Option</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* MEET LULU SECTION */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <h2 className="text-4xl font-black text-foreground">Meet Lulu</h2>
            <img 
              src={luluMascotThumbsUp} 
              alt="Lulu the mascot"
              className="w-40 h-40 mx-auto object-contain"
              loading="lazy"
              width={160}
              height={160}
            />
            <p className="text-xl text-muted-foreground font-medium">
              Fun, lovable, and here to make everyday essentials better value for everyone.
            </p>
            <p className="text-lg text-foreground font-bold">
              No fuss. No nonsense. Just a smart buy.
            </p>
          </div>
        </div>
      </section>

      {/* CAMPAIGN STRIP - ZIGGY */}
      <section className="py-12 mosaic-border-thick bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8 max-w-4xl mx-auto">
            <img 
              src={ziggyAlien} 
              alt="Ziggy the alien"
              className="w-32 h-32 object-contain flex-shrink-0"
              loading="lazy"
              width={128}
              height={128}
            />
            <div className="text-center md:text-left space-y-3">
              <h2 className="text-2xl lg:text-3xl font-black text-foreground">
                Why is an alien coming to Earth for loo roll?
              </h2>
              <p className="text-lg text-muted-foreground">
                Ziggy's flying saucer loo blocked up. Lulu sorted it.
              </p>
            </div>
            <Button className="btn-hero flex-shrink-0 font-bold rounded-xl px-8 py-5 text-lg" asChild>
              <Link to="/about">Watch the Ad</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* TRUST / SOCIAL PROOF */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-foreground text-center mb-8">
            Loved by everyday households
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
            {[
              { icon: Truck, title: "Free Delivery", desc: "Straight to your door, no fuss" },
              { icon: Lock, title: "Secure Checkout", desc: "Safe and simple payments" },
              { icon: Shield, title: "Quality Guaranteed", desc: "Soft, strong, reliable" },
            ].map((item, i) => (
              <div key={i} className="mosaic-border rounded-xl p-6 text-center bg-white">
                <item.icon className="h-10 w-10 mx-auto mb-3 text-primary" />
                <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ECO / BRAND VALUES - BOTTOM */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-black text-foreground text-center mb-10">
            Gentle on you, kind to the planet
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { icon: Recycle, text: "Plastic-free packaging" },
              { icon: TreePine, text: "100% soft Bamboo – responsibly sourced" },
              { icon: Droplets, text: "4D super absorbent technology" },
              { icon: Leaf, text: "Zero waste to landfill packaging" },
            ].map((item, i) => (
              <div key={i} className="text-center space-y-3">
                <item.icon className="h-10 w-10 mx-auto text-primary" />
                <p className="font-bold text-foreground text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
