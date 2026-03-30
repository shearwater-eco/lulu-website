import { ArrowRight, Truck, Shield, Lock, Package, Star, Leaf, Recycle, Droplets, TreePine } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import luluMascotThumbsUp from "@/assets/lulu-mascot-thumbs-up.png";
import ziggyAlien from "@/assets/ziggy-alien.png";

const HomePage = () => {
  return (
    <div className="lulu-frame">
      <div className="lulu-package">
        <div className="right-border"></div>
        <div className="bottom-border"></div>
        <div className="lulu-content">

          {/* HERO SECTION */}
          <section className="relative pt-0 pb-12 lg:pb-20">
            {/* Full-width headline banner - flush to top */}
            <div className="mosaic-border-small rounded-2xl p-4 bg-white mb-8 -mt-4 text-center">
              <h1 className="lulu-title text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black leading-tight whitespace-nowrap">
                THE BEST TP IN THE UNIVERSE
              </h1>
            </div>

            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <div className="text-center lg:text-left space-y-6">
                  <p className="text-xl lg:text-2xl text-muted-foreground font-medium lulu-subtitle">
                    Big value loo roll for everyday homes
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Link to="/shop">
                      <button className="btn-lulu-primary flex items-center">
                        Shop 24 Rolls
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </button>
                    </Link>
                    <Link to="/shop">
                      <button className="btn-lulu-secondary">
                        See 48 Rolls
                      </button>
                    </Link>
                  </div>
                  <p className="text-lg text-foreground font-semibold lulu-subtitle">
                    Soft. Strong. Smart value.
                  </p>
                </div>

                <div className="relative flex items-center justify-center min-h-[300px]">
                  <img 
                    src={luluMascotThumbsUp} 
                    alt="Lulu the mascot"
                    className="w-36 lg:w-48 absolute left-0 lg:left-4 bottom-0 z-10 drop-shadow-lg"
                    width={192}
                    height={192}
                  />
                  <div className="mosaic-border-small rounded-3xl bg-white w-56 h-64 lg:w-72 lg:h-80 flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <Package className="h-16 w-16 mx-auto mb-3 opacity-40" />
                      <p className="text-sm font-medium opacity-60">Product image</p>
                    </div>
                  </div>
                  <img 
                    src={ziggyAlien} 
                    alt="Ziggy the friendly alien"
                    className="w-28 lg:w-40 absolute right-0 lg:right-4 bottom-0 z-10 drop-shadow-lg"
                    width={160}
                    height={160}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* QUICK VALUE STRIP */}
          <section className="py-6 my-8">
            <div className="mosaic-border-small rounded-2xl bg-white p-6 mx-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                {[
                  { icon: Package, text: "24 Rolls. No nonsense." },
                  { icon: Star, text: "Great everyday value" },
                  { icon: Truck, text: "Delivered to your door" },
                  { icon: Shield, text: "Soft & strong" },
                ].map((item, i) => (
                  <div key={i} className="flex flex-col items-center gap-2">
                    <div className="p-3 rounded-lg text-white border-2 border-black" style={{ backgroundColor: `hsl(var(--tile-teal))` }}>
                      <item.icon className="h-6 w-6" />
                    </div>
                    <p className="font-bold text-foreground text-sm lulu-title text-xs">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* PRODUCT SECTION */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="grid lg:grid-cols-5 gap-8">
                {/* Main product - 24 rolls */}
                <div className="lg:col-span-3 card-lulu">
                  <div className="grid md:grid-cols-2 gap-6 items-center">
                    <div className="bg-muted rounded-xl h-64 flex items-center justify-center border-2 border-black">
                      <div className="text-center text-muted-foreground">
                        <Package className="h-16 w-16 mx-auto mb-3 opacity-40" />
                        <p className="text-sm font-medium opacity-60">Product image</p>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h2 className="lulu-title text-2xl">Val-U-Smart 24 Rolls</h2>
                      <p className="text-3xl font-black" style={{ color: 'hsl(var(--tile-teal))' }}>£11.99</p>
                      
                      <div className="border-2 border-black rounded-xl p-3" style={{ backgroundColor: 'hsl(var(--tile-yellow) / 0.15)' }}>
                        <p className="font-bold text-foreground text-sm">🎉 Subscribe & Save</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          10% off + 11th box FREE + no price increases for your next 10 boxes
                        </p>
                      </div>

                      <ul className="space-y-2">
                        {["Big value pack", "Soft & strong", "Made for everyday homes"].map((item, i) => (
                          <li key={i} className="flex items-center gap-2 text-foreground font-medium text-sm">
                            <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: 'hsl(var(--tile-teal))' }} />
                            {item}
                          </li>
                        ))}
                      </ul>

                      <Link to="/shop">
                        <button className="btn-lulu-primary w-full flex items-center justify-center text-base">
                          Buy Now – Free Delivery
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Secondary product - 48 rolls */}
                <div className="lg:col-span-2 card-lulu flex flex-col justify-between">
                  <div>
                    <div className="bg-muted rounded-xl h-44 flex items-center justify-center mb-4 border-2 border-black">
                      <div className="text-center text-muted-foreground">
                        <Package className="h-12 w-12 mx-auto mb-2 opacity-40" />
                        <p className="text-sm font-medium opacity-60">Product image</p>
                      </div>
                    </div>
                    <h3 className="lulu-title text-lg mb-2">48 Rolls – Stock Up</h3>
                    <p className="text-muted-foreground text-sm lulu-subtitle">
                      The bigger box for bigger families. Even better value per roll.
                    </p>
                  </div>
                  <Link to="/shop">
                    <button className="btn-lulu-secondary w-full mt-4 text-base">
                      View Option
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* MEET LULU */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mosaic-border-small rounded-2xl bg-white p-8 max-w-3xl mx-auto text-center space-y-6">
                <h2 className="lulu-title text-3xl">Meet Lulu</h2>
                <img 
                  src={luluMascotThumbsUp} 
                  alt="Lulu the mascot"
                  className="w-36 h-36 mx-auto object-contain"
                  loading="lazy"
                  width={144}
                  height={144}
                />
                <p className="text-lg text-muted-foreground lulu-subtitle">
                  Fun, lovable, and here to make everyday essentials better value for everyone.
                </p>
                <p className="text-lg text-foreground font-bold lulu-title text-base">
                  No fuss. No nonsense. Just a smart buy.
                </p>
              </div>
            </div>
          </section>

          {/* ZIGGY CAMPAIGN */}
          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="card-lulu">
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <img 
                    src={ziggyAlien} 
                    alt="Ziggy the alien"
                    className="w-28 h-28 object-contain flex-shrink-0"
                    loading="lazy"
                    width={112}
                    height={112}
                  />
                  <div className="text-center md:text-left space-y-2 flex-1">
                    <h2 className="lulu-title text-xl lg:text-2xl">
                      Why is an alien coming to Earth for loo roll?
                    </h2>
                    <p className="text-lg text-muted-foreground lulu-subtitle">
                      Ziggy's flying saucer loo blocked up. Lulu sorted it.
                    </p>
                  </div>
                  <Link to="/about" className="flex-shrink-0">
                    <button className="btn-lulu-primary">
                      Watch the Ad
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          </section>

          {/* TRUST / SOCIAL PROOF */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <h2 className="lulu-title text-2xl text-center mb-8">
                Loved by everyday households
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
                {[
                  { icon: Truck, title: "Free Delivery", desc: "Straight to your door, no fuss", color: "tile-teal" },
                  { icon: Lock, title: "Secure Checkout", desc: "Safe and simple payments", color: "tile-blue" },
                  { icon: Shield, title: "Quality Guaranteed", desc: "Soft, strong, reliable", color: "tile-green" },
                ].map((item, i) => (
                  <div key={i} className="card-lulu text-center">
                    <div className="p-3 rounded-lg text-white border-2 border-black inline-block mb-3" style={{ backgroundColor: `hsl(var(--${item.color}))` }}>
                      <item.icon className="h-8 w-8" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1 lulu-title text-sm">{item.title}</h3>
                    <p className="text-sm text-muted-foreground lulu-subtitle">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ECO VALUES - BOTTOM */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="mosaic-border-small rounded-2xl bg-white p-8">
                <h2 className="lulu-title text-2xl text-center mb-8">
                  Gentle on you, kind to the planet
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                    { icon: Recycle, text: "Plastic-free packaging", color: "tile-green" },
                    { icon: TreePine, text: "100% soft Bamboo – responsibly sourced", color: "tile-teal" },
                    { icon: Droplets, text: "4D super absorbent technology", color: "tile-blue" },
                    { icon: Leaf, text: "Zero waste to landfill packaging", color: "tile-lime" },
                  ].map((item, i) => (
                    <div key={i} className="text-center space-y-3">
                      <div className="p-3 rounded-lg text-white border-2 border-black inline-block" style={{ backgroundColor: `hsl(var(--${item.color}))` }}>
                        <item.icon className="h-8 w-8" />
                      </div>
                      <p className="font-bold text-foreground text-sm lulu-title text-xs">{item.text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default HomePage;
