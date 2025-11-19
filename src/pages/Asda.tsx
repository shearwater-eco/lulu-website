import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import luluMascot from "@/assets/lulu-mascot-thumbs-up-new.png";
import luluFrontPanel from "@/assets/lulu-front-panel.png";
import luluBackPanel from "@/assets/lulu-back-panel.png";
import luluSidePanel from "@/assets/lulu-side-panel.png";
import valUSmartLogo from "@/assets/val-u-smart-logo.png";
import dignityBadge from "@/assets/dignity-badge.png";
import { Lock } from "lucide-react";
const Asda = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
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
    return <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
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
              <Input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" required className="w-full" />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Verifying..." : "Access Retailer Portal"}
            </Button>
          </form>
          <p className="text-xs text-muted-foreground text-center mt-6">
            For access, please contact the Lulu team
          </p>
        </div>
      </div>;
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for your interest! We'll be in touch soon.");
    setFormData({
      name: "",
      email: "",
      phone: "",
      message: ""
    });
  };
  return <div className="min-h-screen bg-background">
      {/* SECTION 1 - HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.1),transparent)]" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl font-bold text-foreground">
                Lulu in Asda
              </h1>
              <p className="text-2xl text-muted-foreground font-medium">Meet Lulu - finanlly a challenge                </p>
              <p className="text-lg text-muted-foreground">
                A modern, family-friendly eco toilet tissue brand designed for everyday shoppers that offers price point with all the flu                           
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="mosaic-border-small rounded-3xl bg-white p-6">
                  <div className="grid grid-cols-3 gap-4 items-start">
                    <img src={luluFrontPanel} alt="Lulu front packaging" className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform" />
                    <img src={luluBackPanel} alt="Lulu back packaging with mascot" className="w-full rounded-lg shadow-xl transform scale-110 hover:scale-115 transition-transform ring-4 ring-primary/30" />
                    <img src={luluSidePanel} alt="Lulu side packaging" className="w-full rounded-lg shadow-lg transform hover:scale-105 transition-transform" />
                  </div>
                  <div className="flex justify-center gap-4 mt-6">
                    <img src={valUSmartLogo} alt="Val-U-Smart logo" className="w-20 h-20 object-contain" />
                    <img src={dignityBadge} alt="Dignity badge" className="w-20 h-20 object-contain" />
                  </div>
                </div>
                <div className="absolute -bottom-4 -right-4 card-lulu px-6 py-3 rounded-full font-bold text-lg animate-pulse">
                  Meet Lulu! 👋
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2 - THE OPPORTUNITY */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Shoppers Want Eco — But They Need It to Be Affordable.
          </h2>
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-muted-foreground">
            <p>
              Sustainability matters to most families, but premium eco brands remain out of reach.
              Own-label provides value, but lacks a strong consumer-facing brand.
            </p>
            <p className="text-xl font-semibold text-foreground">
              Lulu fills the gap — a bold, warm, low-carbon toilet paper brand that delivers eco credentials without the premium price tag.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 3 - INTRODUCING LULU */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            A Fresh, Friendly Approach to Toilet Paper
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6 text-lg text-muted-foreground">
              <p>
                Born in Pembrokeshire, Wales, Lulu brings warmth and personality to the bathroom aisle — while staying completely plastic-free and low-carbon.
              </p>
              <p>
                Our brand is inclusive, ethical, and designed to stand out.
                Lulu connects with shoppers emotionally while delivering strong everyday value.
              </p>
            </div>
            <div className="flex justify-center">
              <img src={luluMascot} alt="Lulu mascot" className="w-full max-w-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4 - HERO SKU */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Toilet Tissue by Lulu — Val-U-Smart (24 Rolls)
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            <div className="space-y-6">
              <ul className="space-y-4 text-lg">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">2-ply | 200 sheets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Direct alternative to Andrex Standard 24</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Paper-based, plastic-free box</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Natural fibre, low-carbon production</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Strong 360gsm structure with top carry handle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-muted-foreground">Bright, distinctive mosaic design</span>
                </li>
              </ul>
              <p className="text-xl font-semibold text-foreground pt-4">
                Mid-tier quality at a value-led price point.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="relative w-full max-w-lg">
                <div className="mosaic-border-small rounded-3xl bg-white p-6">
                  <div className="grid grid-cols-2 gap-6 items-center">
                    <img src={luluFrontPanel} alt="Lulu front packaging" className="w-full rounded-lg shadow-lg hover:scale-105 transition-transform" />
                    <img src={luluBackPanel} alt="Lulu back packaging with bird mascot" className="w-full rounded-lg shadow-xl ring-4 ring-primary/40 hover:ring-primary/60 transition-all" />
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-muted-foreground font-medium">Featuring Lulu the Shearwater</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5 - PACKAGING */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Designed for Shelf Impact
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg text-muted-foreground">
              The Val-U-Smart 24-roll box uses a clean white centre panel framed by a brightly coloured mosaic design that jumps off the shelf.
              The curved side panels add visual interest and help the range stand out in crowded aisles.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold text-foreground">Features:</h3>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">Highly visible from 5+ metres</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">Strong brand blocking</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">Clear format navigation</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">Carry handle for easy shopping</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">Box format = reduced shrink and enhanced hygiene perception</span>
                  </li>
                </ul>
              </div>
              <div className="flex justify-center items-center">
                <div className="relative">
                  <div className="mosaic-border-small rounded-2xl bg-white p-4">
                    <div className="space-y-4">
                      <img src={luluBackPanel} alt="Back panel with Lulu mascot" className="w-full max-w-xs mx-auto rounded-lg shadow-xl ring-4 ring-primary/30" />
                      <div className="flex justify-center gap-3">
                        <img src={luluFrontPanel} alt="Front panel" className="w-24 rounded shadow-md" />
                        <img src={luluSidePanel} alt="Side panel" className="w-24 rounded shadow-md" />
                      </div>
                    </div>
                  </div>
                  <div className="absolute -top-3 -right-3 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                    Stand Out!
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 6 - SUSTAINABILITY */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Eco Credentials Shoppers Understand
          </h2>
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                <span className="text-primary font-bold text-2xl">🌿</span>
                <span className="text-muted-foreground">Plastic-free</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                <span className="text-primary font-bold text-2xl">🌍</span>
                <span className="text-muted-foreground">Low-carbon natural fibre</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                <span className="text-primary font-bold text-2xl">✨</span>
                <span className="text-muted-foreground">Chemical-free (no bleach, dyes, or harsh additives)</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                <span className="text-primary font-bold text-2xl">♻️</span>
                <span className="text-muted-foreground">Fully recyclable packaging</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                <span className="text-primary font-bold text-2xl">❤️</span>
                <span className="text-muted-foreground">Ethically positioned brand story</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-secondary/10 rounded-lg">
                <span className="text-primary font-bold text-2xl">📋</span>
                <span className="text-muted-foreground">Clear back-of-pack educational panel</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 7 - RANGE ARCHITECTURE */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            A Range Built for Flexibility
          </h2>
          <p className="text-lg text-muted-foreground text-center max-w-3xl mx-auto mb-12">
            Lulu offers multiple variants to support different shopper missions.
            For this pitch, we're presenting the hero SKU, with future expansion available as needed.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-background p-8 rounded-lg shadow-lg border-2 border-primary">
              <h3 className="text-2xl font-bold text-foreground mb-4">Val-U-Smart (Hero)</h3>
              <p className="text-muted-foreground mb-4">Mid-tier quality | 200 sheets, 2-ply</p>
              <p className="text-sm text-muted-foreground">Comparable to Andrex Standard</p>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-lg border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">Val-U-Wise</h3>
              <p className="text-muted-foreground mb-4">Value tier | 180 sheets, 2-ply</p>
              <p className="text-sm text-muted-foreground">Comparable to Andrex Family Pack</p>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-lg border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">Eco-Smart</h3>
              <p className="text-muted-foreground mb-4">Premium eco | 3-ply, 200 sheets</p>
              <p className="text-sm text-muted-foreground">Natural colour, silky soft, extra long</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 8 - COMMERCIAL OVERVIEW */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Commercial Strength
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg text-muted-foreground">
              We provide competitive wholesale pricing (dependent on supply chain and MOQs), flexible production, and zero constraints on capacity.
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Scalable from regional to national</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Predictable lead times</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Strong cost-per-sheet value</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">24-roll family format increases basket spend</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-muted-foreground">Promotional flexibility</span>
              </li>
            </ul>
            <p className="text-sm text-muted-foreground italic">
              Pricing will be finalised once retailer chain is confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 9 - SUPPLY & CAPACITY */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Reliable, Scalable Supply
          </h2>
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">No production limits</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Simple onboarding</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">UK-based team</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Fully developed dielines</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Ready for print run</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">✓</span>
                <span className="text-muted-foreground">Box and 24-roll format fully tested</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 10 - ROUTE TO LAUNCH */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Flexible Launch Options
          </h2>
          <div className="max-w-4xl mx-auto space-y-8">
            <p className="text-lg text-muted-foreground">
              We'd welcome ASDA's view on the best route:
              whether Lulu should begin as a regional listing, national rollout, or phased trial.
            </p>
            <p className="text-lg text-muted-foreground">
              We're able to support whichever path fits your category strategy.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary/10 rounded-lg">
                <h3 className="text-xl font-bold text-foreground mb-3">Options:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Regional trial (Wales, Midlands, value regions)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">National family rollout</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Hero SKU only, with future variants ready</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-muted-foreground">Promotional trials</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 11 - SUPPORT */}
      <section className="py-20 bg-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Launch Support & Marketing
          </h2>
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">🎯</span>
                <span className="text-muted-foreground">Optional price-marked packs</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">📱</span>
                <span className="text-muted-foreground">Digital + social marketing from Lulu</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
                <span className="text-muted-foreground">Welsh provenance story for PR</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">🎉</span>
                <span className="text-muted-foreground">Seasonal promotions</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">🌱</span>
                <span className="text-muted-foreground">Sustainability storytelling</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg">
                <span className="text-primary font-bold">💻</span>
                <span className="text-muted-foreground">Easy-to-share digital content</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 12 - AUDIO/VIDEO */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            A Warm Welcome from Lulu
          </h2>
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <p className="text-lg text-muted-foreground">
              A short 20–30 second introduction from Lulu — soft Welsh tone, friendly, light, warm.
            </p>
            <Button size="lg" className="gap-2">
              <span>▶</span> Play Audio
            </Button>
          </div>
        </div>
      </section>

      {/* SECTION 13 - CONTACT */}
      <section className="py-20 bg-primary/10">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-4 text-center">
            Let's Work Together to save the world one wipe at a time!
          </h2>
          <p className="text-2xl text-center text-primary font-semibold mb-8">
            Reaching our 1 billion tree target!
          </p>
          <p className="text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-12">
            Thank you for reviewing the Lulu range.
            We'd love to explore how Lulu can support ASDA's tissue category.
          </p>
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-background p-8 rounded-lg shadow-xl">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Your Name</label>
              <Input required value={formData.name} onChange={e => setFormData({
              ...formData,
              name: e.target.value
            })} placeholder="Enter your name" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Email</label>
              <Input required type="email" value={formData.email} onChange={e => setFormData({
              ...formData,
              email: e.target.value
            })} placeholder="your.email@asda.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
              <Input required type="tel" value={formData.phone} onChange={e => setFormData({
              ...formData,
              phone: e.target.value
            })} placeholder="+44 ..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Message</label>
              <Textarea value={formData.message} onChange={e => setFormData({
              ...formData,
              message: e.target.value
            })} placeholder="Optional message..." rows={4} />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Send Enquiry
            </Button>
          </form>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 bg-background border-t border-border">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">© Lulu. All rights reserved.</p>
        </div>
      </footer>
    </div>;
};
export default Asda;