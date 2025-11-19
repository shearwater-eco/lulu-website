import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { Lock, CheckCircle, TrendingUp, Package, ShoppingCart, Mail, Download } from "lucide-react";
import ImageWithBackgroundRemoval from "@/components/ImageWithBackgroundRemoval";
import luluMascot from "@/assets/lulu-mascot-thumbs-up-new.png";
import packagingFront from "@/assets/packaging-front-angle.jpg";
import packagingBack from "@/assets/packaging-back-angle.jpg";
import packagingSide from "@/assets/packaging-side-view.jpg";
import luluCoast from "@/assets/lulu-mascot-welsh-coast.png";

const Asda = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const auth = sessionStorage.getItem("retailerAuth");
    if (auth === "true") {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Password: ASDA_2026
    if (password === "ASDA_2026") {
      sessionStorage.setItem("retailerAuth", "true");
      setIsAuthenticated(true);
      toast.success("Access granted!");
    } else {
      toast.error("Incorrect password");
    }
    setIsLoading(false);
    setPassword("");
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-background p-8 rounded-lg shadow-2xl border border-border">
          <div className="flex flex-col items-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <Lock className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Retailers Access</h1>
            <p className="text-muted-foreground text-center">
              This page is password protected. Please enter the retailer password to continue.
            </p>
          </div>
          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                required
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Access Retailer Portal"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-6">
            For access, please contact the Lulu team
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* SECTION 1 — INTRODUCTION: MEET LULU */}
      <section className="relative bg-gradient-to-b from-primary/5 to-background overflow-hidden">
        {/* Subtle background image */}
        <div className="absolute inset-0 opacity-5">
          <img src={luluCoast} alt="" className="w-full h-full object-cover" />
        </div>
        
        <div className="container mx-auto px-4 py-24 relative z-10">
          <div className="max-w-6xl mx-auto">
            {/* Two-column hero */}
            <div className="grid md:grid-cols-2 gap-12 mb-16">
              {/* Left: Mascot */}
              <div className="flex items-center justify-center">
                <img 
                  src={luluMascot} 
                  alt="Lulu the Shearwater mascot" 
                  className="w-full max-w-md animate-fade-in"
                />
              </div>

              {/* Right: Packaging */}
              <div className="flex items-center justify-center">
                <ImageWithBackgroundRemoval 
                  src={packagingFront} 
                  alt="LULU packaging" 
                  className="w-full max-w-md rounded-lg shadow-2xl animate-fade-in"
                />
              </div>
            </div>

            {/* Introduction text */}
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl md:text-5xl font-bold text-foreground">
                  Meet Lulu — your Welsh guide to greener value
                </h1>
                <p className="text-xl text-muted-foreground">
                  Say hello to Lulu — a cheerful Shearwater from the wild Pembrokeshire cliffs, here to help families choose household paper products that are gentle on you and kind to the Earth.
                </p>
              </div>

              <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <p className="text-lg text-foreground mb-6">
                  <strong>LULU</strong> is a Welsh-born eco value brand created to make sustainable living easy, affordable, and joyful. Every pack delivers real value without compromise — soft, strong, responsibly sourced, and wrapped in fully recyclable paperboard packaging.
                </p>

                <div className="grid md:grid-cols-2 gap-6 mt-8">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Low carbon, plastic-free, chemical-free production</h3>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Made with 100% natural fibre</h3>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Fully recyclable paperboard packaging</h3>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-primary shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-foreground">Softness and strength without compromise</h3>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground mt-8 italic">
                  Lulu leads the way with pride, weaving ethics and affordability into every roll.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — WHY LULU WORKS FOR ASDA */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
              A value-eco brand built for supermarket success
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              LULU meets the sweet spot where shopper expectations, sustainability goals and commercial performance align.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: Bullet points */}
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <ShoppingCart className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Meets shopper demand for affordable sustainability</h3>
                    <p className="text-muted-foreground">Shoppers no longer have to choose between ethics and affordability.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <Package className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Shelf-ready packaging with strong vertical blocking</h3>
                    <p className="text-muted-foreground">GS1UK barcoding ensures seamless inventory management and checkout.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <TrendingUp className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Eye-catching colour accents support faster aisle navigation</h3>
                    <p className="text-muted-foreground">Bold, colourful design stands out naturally in crowded aisles.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Suitable for price-fighting without compromising on ethics</h3>
                    <p className="text-muted-foreground">Competitive pricing structure that protects your margins.</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg">
                  <CheckCircle className="w-8 h-8 text-primary shrink-0 mt-1" />
                  <div>
                    <h3 className="font-bold text-lg text-foreground mb-2">Proven consumer resonance: simple, bright, honest</h3>
                    <p className="text-muted-foreground">Clear messaging that builds trust and loyalty.</p>
                  </div>
                </div>
              </div>

              {/* Right: Chart */}
              <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-6 text-center">
                  Rising Consumer Interest in Eco-Value Household Paper
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">2021</span>
                      <span className="font-semibold text-foreground">32%</span>
                    </div>
                    <div className="h-8 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full" style={{ width: '32%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">2022</span>
                      <span className="font-semibold text-foreground">48%</span>
                    </div>
                    <div className="h-8 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full" style={{ width: '48%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">2023</span>
                      <span className="font-semibold text-foreground">61%</span>
                    </div>
                    <div className="h-8 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full" style={{ width: '61%' }}></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">2024</span>
                      <span className="font-semibold text-foreground">73%</span>
                    </div>
                    <div className="h-8 bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-primary to-primary/80 rounded-full" style={{ width: '73%' }}></div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground text-center mt-6 italic">
                  Eco-value is rising fast — shoppers are actively trading towards products that "do the right thing" without costing more. LULU fits perfectly into this new expectation.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3 — PACKAGING & SUSTAINABILITY LEADERSHIP */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/5">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
              Packaging & Sustainability Leadership
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              Packaging that works hard on shelf — and even harder for the planet
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              {/* Left: Images */}
              <div className="space-y-6">
                <img 
                  src={packagingSide} 
                  alt="LULU packaging side view" 
                  className="w-full rounded-lg shadow-2xl"
                />
                <img 
                  src={packagingBack} 
                  alt="LULU packaging back panel" 
                  className="w-full rounded-lg shadow-2xl"
                />
              </div>

              {/* Right: Features */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-4">Technical Specifications</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Dimensions</span>
                      <span className="font-semibold text-foreground">27 × 36 × 18 cm</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Material</span>
                      <span className="font-semibold text-foreground">360gsm paperboard</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Design</span>
                      <span className="font-semibold text-foreground">Colourful, eye-catching</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-border">
                      <span className="text-muted-foreground">Opening</span>
                      <span className="font-semibold text-foreground">Top flap</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-muted-foreground">Handle</span>
                      <span className="font-semibold text-foreground">Fold-down top handle</span>
                    </div>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Consumer Benefit</h3>
                  <p className="text-lg text-foreground font-semibold italic">
                    "Easy to grab, easy to carry, easy to pack."
                  </p>
                  <p className="text-muted-foreground mt-3">
                    The fold-down top handle is unique in the toilet paper category, providing unmatched convenience for shoppers.
                  </p>
                </div>

                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-3">Designed for Retail</h3>
                  <p className="text-muted-foreground">
                    Engineered for strength, stackability, and clear front-of-pack identity. LULU stands out naturally in today's crowded aisle.
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p className="text-foreground"><strong>Front panel:</strong> Bold "LULU" wordmark with feather accents (no mascot)</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-primary shrink-0 mt-1" />
                    <p className="text-foreground"><strong>Back panel:</strong> Full brand story and mascot with eco credentials</p>
                  </div>
                </div>

                <p className="text-lg text-foreground font-semibold text-center mt-6 p-4 bg-accent rounded-lg">
                  Sustainability is built into every panel — not just printed on it.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 — MARKET OPPORTUNITY */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-center text-foreground mb-6">
              The missing middle: where value meets responsibility
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-16 max-w-3xl mx-auto">
              Shoppers today want both: the price of a value brand and the integrity of an eco brand.
            </p>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Left: Copy */}
              <div className="space-y-6">
                <div className="bg-card border border-border rounded-lg p-6">
                  <h3 className="text-xl font-bold text-foreground mb-4">The Problem</h3>
                  <div className="space-y-4 text-muted-foreground">
                    <p>
                      <strong className="text-foreground">Traditional brands</strong> like Andrex and Cushelle continue to rely on trees, petroleum by-products, bleach and complex single-use packaging systems that are difficult to green at an affordable price point.
                    </p>
                    <p>
                      <strong className="text-foreground">Eco-premium brands</strong> offer sustainability but remain out of reach for many households.
                    </p>
                    <p>
                      <strong className="text-foreground">Budget brands</strong> strip back cost — and with it, ethics.
                    </p>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
                  <h3 className="text-2xl font-bold text-foreground mb-3">LULU fills the sustainable sweet spot</h3>
                  <p className="text-lg text-foreground">
                    <strong>Value + Eco Impact</strong>
                  </p>
                  <p className="text-muted-foreground mt-3">
                    Lulu helps families buy responsibly without paying more, offering dignity and pride for people and planet — right where it matters most.
                  </p>
                </div>

                <div className="bg-accent rounded-lg p-6">
                  <p className="text-lg text-foreground italic font-semibold">
                    "Consumers are demanding both value and responsibility."
                  </p>
                  <p className="text-muted-foreground mt-3">
                    LULU is positioned perfectly to capture this growing market segment that traditional brands struggle to serve.
                  </p>
                </div>
              </div>

              {/* Right: Positioning Chart */}
              <div className="bg-card border border-border rounded-lg p-8 shadow-lg">
                <h3 className="text-xl font-bold text-foreground mb-8 text-center">
                  Market Positioning Map
                </h3>
                
                <div className="relative aspect-square">
                  {/* Y-axis label */}
                  <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90">
                    <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                      Eco Impact →
                    </span>
                  </div>

                  {/* X-axis label */}
                  <div className="absolute -bottom-8 left-1/2 -translate-x-1/2">
                    <span className="text-sm font-semibold text-muted-foreground whitespace-nowrap">
                      Price →
                    </span>
                  </div>

                  {/* Chart area */}
                  <div className="w-full h-full border-l-2 border-b-2 border-border relative">
                    {/* Grid lines */}
                    <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
                      {[...Array(16)].map((_, i) => (
                        <div key={i} className="border-r border-t border-border/30"></div>
                      ))}
                    </div>

                    {/* Budget brands (low price, low eco) */}
                    <div className="absolute left-[15%] bottom-[20%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-muted border border-border rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground">
                        Budget Brands
                      </div>
                    </div>

                    {/* Traditional brands (mid-high price, low eco) */}
                    <div className="absolute left-[65%] bottom-[25%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-muted border border-border rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground">
                        Andrex / Cushelle
                      </div>
                    </div>

                    {/* Eco-premium (high price, high eco) */}
                    <div className="absolute left-[80%] top-[15%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="bg-muted border border-border rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground">
                        Eco-Premium
                      </div>
                    </div>

                    {/* LULU (sweet spot: low-mid price, high eco) */}
                    <div className="absolute left-[40%] top-[25%] transform -translate-x-1/2 -translate-y-1/2">
                      <div className="relative">
                        <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl"></div>
                        <div className="relative bg-primary border-2 border-primary rounded-lg px-4 py-3 shadow-lg">
                          <div className="text-lg font-bold text-primary-foreground">LULU</div>
                          <div className="text-xs text-primary-foreground/90">Value + Eco Sweet Spot</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground text-center mt-8 italic">
                  Lulu offers eco-friendly dignity and pride for people and planet — at a competitive price point.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 — NEXT STEPS FOR ASDA */}
      <section className="py-24 bg-gradient-to-b from-background to-primary/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Let's bring LULU to your value tissue aisle — sustainably
            </h2>
            <p className="text-xl text-muted-foreground mb-12">
              We'd love to share samples, pricing and our full retail proposal.
            </p>

            <div className="bg-card border border-border rounded-lg p-8 shadow-2xl space-y-8">
              <Button 
                size="lg" 
                className="text-lg px-8 py-6 h-auto"
                onClick={() => {
                  toast.success("Thank you for your interest! We'll be in touch soon.");
                }}
              >
                Request Samples & Pricing
              </Button>

              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3 text-muted-foreground">
                  <Mail className="w-5 h-5" />
                  <a href="mailto:retailers@lulu.earth" className="hover:text-primary transition-colors">
                    retailers@lulu.earth
                  </a>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Download Retailer Deck (PDF)
                  </Button>
                  <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" />
                    Technical Data Sheets
                  </Button>
                </div>
              </div>

              <div className="border-t border-border pt-6 mt-6">
                <p className="text-sm text-muted-foreground">
                  For more information or to arrange a meeting, please contact our retail partnerships team.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Asda;
