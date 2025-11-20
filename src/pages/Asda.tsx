import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import luluBoxMockup from "@/assets/lulu-product-box.jpg";
import luluFrontBox from "@/assets/lulu-box-hero.jpg";
import luluMascot from "@/assets/lulu-mascot-thumbs-up-new.png";
import luluBoxOpen from "@/assets/lulu-box-open.jpg";
import luluBoxFront from "@/assets/lulu-box-front.jpg";
import luluBoxAngle from "@/assets/lulu-box-angle.jpg";
import badgeLowerCarbon from "@/assets/badge-lower-carbon.png";
import badgeDignity from "@/assets/badge-dignity.png";
import badgeTreeFree from "@/assets/badge-tree-free.png";
import { EcoConsumerChart } from "@/components/EcoConsumerChart";
const Asda = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "ASDAXLULU_2026") {
      setIsAuthenticated(true);
      toast.success("Access granted");
    } else {
      toast.error("Incorrect password");
      setPassword("");
    }
  };

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

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-background p-8 rounded-lg shadow-2xl border border-border">
          <h1 className="text-3xl font-bold text-foreground mb-6 text-center">Protected Content</h1>
          <form onSubmit={handlePasswordSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">Enter Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full"
                required
              />
            </div>
            <Button type="submit" size="lg" className="w-full">
              Access Page
            </Button>
          </form>
        </div>
      </div>
    );
  }
  return <div className="lulu-frame">
      <div className="lulu-package">
        <div className="right-border"></div>
        <div className="bottom-border"></div>
        <div className="lulu-content">

      {/* NEW SECTION - WELCOME VIDEO */}
      <section className="relative py-12 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground text-center mb-8">
            A WARM WELCOME FROM LULU
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="mosaic-border-small inline-block w-full">
              <video className="w-full rounded-lg shadow-2xl" controls poster="/lulu-box-hero.jpg">
                <source src="/lulu-welcome-video.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1 - HERO */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-primary/10 via-background to-secondary/10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,hsl(var(--primary)/0.1),transparent)]" />
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="mosaic-border-small inline-block mb-12 mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground bg-background/80 backdrop-blur-sm px-8 py-4">​LULU FOR ASDA</h1>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 text-center bg-background/60 backdrop-blur-sm p-8 rounded-lg">
              <p className="text-2xl text-foreground font-semibold">Affordable. Eco. Distinctive. Retail Ready!</p>
              <p className="text-lg text-foreground/80 font-medium">
                A modern, family-friendly toilet tissue brand designed for everyday shoppers.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="mosaic-border-small inline-block">
                <img src={luluFrontBox} alt="Lulu 24-roll box" className="w-full max-w-md rounded-lg shadow-2xl" />
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
          <div className="max-w-3xl mx-auto space-y-6 text-lg text-center mb-12">
            <p className="text-foreground/90 font-medium">Sustainability matters to most families, but premium eco brands remain out of reach. </p>
            <p className="text-xl font-semibold text-foreground bg-primary/10 p-6 rounded-lg">
              Lulu fills the gap — a bold, warm, low-carbon toilet paper brand that delivers eco credentials without the premium price tag.
            </p>
          </div>
          
          {/* Interactive Data Chart */}
          <div className="max-w-6xl mx-auto">
            <EcoConsumerChart />
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
            <div className="space-y-6 text-lg">
              <p className="text-foreground/90 font-medium text-center">Born in Pembrokeshire, Wales, Lulu brings warmth and personality to the toilet paper aisle — while staying completely plastic-free and low-carbon.</p>
              <p className="text-foreground/90 font-medium text-center">
                Our brand is inclusive, ethical, and designed to stand out.
                Lulu connects with shoppers emotionally while delivering strong everyday value.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="mosaic-border-small inline-block">
                <img src={luluMascot} alt="Lulu mascot" className="w-full max-w-sm" />
              </div>
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
                  <span className="text-foreground/90 font-medium">2-ply | 200 sheets</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground/90 font-medium">Direct alternative to Andrex Standard 24</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground/90 font-medium">Paper-based, plastic-free box</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground/90 font-medium">Natural fibre, low-carbon production</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground/90 font-medium">Strong 360gsm structure with top carry handle</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-bold">•</span>
                  <span className="text-foreground/90 font-medium">Bright, distinctive mosaic design</span>
                </li>
              </ul>
              <p className="text-xl font-semibold text-foreground bg-primary/10 p-4 rounded-lg pt-4">
                Mid-tier quality at a value-led price point.
              </p>
            </div>
            <div className="flex justify-center">
              <div className="mosaic-border-small inline-block bg-transparent">
                <img src={luluBoxMockup} alt="Val-U-Smart 24 roll box" className="w-full max-w-md rounded-lg shadow-xl bg-white" />
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
                    <span className="text-muted-foreground">Strong brand blocking -elegant and appealing design
                      </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">✓</span>
                    <span className="text-muted-foreground">​strong packaging, less waste/breakage</span>
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
                <div className="mosaic-border-small inline-block mt-6">
                  <img src={luluBoxAngle} alt="Val-U-Smart packaging" className="w-full max-w-sm rounded-lg shadow-lg" />
                </div>
              </div>
              <div className="flex flex-col gap-6 justify-center items-center">
                <div className="mosaic-border-small inline-block">
                  <img src={luluBoxOpen} alt="Lulu box open with rolls inside" className="w-full max-w-sm rounded-lg shadow-lg" />
                </div>
                <div className="mosaic-border-small inline-block">
                  <img src={luluBoxFront} alt="Lulu box front packaging" className="w-full max-w-sm rounded-lg shadow-lg" />
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
          
          {/* Eco Badges */}
          <div className="flex justify-center gap-8 mb-12 flex-wrap">
            <img src={badgeLowerCarbon} alt="Lower Carbon Footprint" className="w-32 h-32 object-contain" />
            <img src={badgeDignity} alt="Dignity for People and Planet" className="w-64 h-64 object-contain" />
            <img src={badgeTreeFree} alt="Tree Free" className="w-32 h-32 object-contain" />
          </div>
          
          <div className="max-w-3xl mx-auto">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                <span className="text-primary font-bold text-2xl">🌿</span>
                <span className="text-foreground/90 font-medium">Plastic-free</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                <span className="text-primary font-bold text-2xl">🌍</span>
                <span className="text-foreground/90 font-medium">Low-carbon natural fibre</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                <span className="text-primary font-bold text-2xl">✨</span>
                <span className="text-foreground/90 font-medium">Chemical-free (no bleach, dyes, or harsh additives)</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                <span className="text-primary font-bold text-2xl">♻️</span>
                <span className="text-foreground/90 font-medium">Fully recyclable packaging</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                <span className="text-primary font-bold text-2xl">❤️</span>
                <span className="text-foreground/90 font-medium">Ethically positioned brand story</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-secondary/20 rounded-lg">
                <span className="text-primary font-bold text-2xl">📋</span>
                <span className="text-foreground/90 font-medium">Clear back-of-pack educational panel</span>
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
          <p className="text-lg text-foreground/90 font-medium text-center max-w-3xl mx-auto mb-12">Lulu offers multiple variants to support different shopper missions. For this pitch, we're presenting  the Val-U-Smart as our hero SKU, with future expansion available as needed, tissues, kitchen rolls, etc</p>
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <div className="bg-background p-8 rounded-lg shadow-lg border-2 border-primary">
              <h3 className="text-2xl font-bold text-foreground mb-4">Val-U-Smart (Hero)</h3>
              <p className="text-foreground/90 font-medium mb-4">Mid-tier quality | 200 sheets, 2-ply</p>
              <p className="text-sm text-foreground/80">Comparable to Andrex Standard</p>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-lg border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">Val-U-Wise</h3>
              <p className="text-foreground/90 font-medium mb-4">Value tier | 180 sheets, 2-ply</p>
              <p className="text-sm text-foreground/80">Comparable to Andrex Family Pack</p>
            </div>
            <div className="bg-background p-8 rounded-lg shadow-lg border border-border">
              <h3 className="text-2xl font-bold text-foreground mb-4">Eco-Smart</h3>
              <p className="text-foreground/90 font-medium mb-4">Premium eco | 3-ply, 200 sheets</p>
              <p className="text-sm text-foreground/80">Natural colour, silky soft, extra long</p>
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
            <p className="text-lg text-foreground/90 font-medium">
              We provide competitive wholesale pricing (dependent on supply chain and MOQs), flexible production, and zero constraints on capacity.
            </p>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground/90 font-medium">Scalable from regional to national</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground/90 font-medium">Predictable lead times</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground/90 font-medium">Strong cost-per-sheet value</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground/90 font-medium">24-roll family format increases basket spend</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground/90 font-medium">Promotional flexibility</span>
              </li>
            </ul>
            <p className="text-sm text-foreground/80 italic bg-muted/30 p-4 rounded-lg">
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
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">✓</span>
                <span className="text-foreground/90 font-medium">No production limits</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">✓</span>
                <span className="text-foreground/90 font-medium">Simple onboarding</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">✓</span>
                <span className="text-foreground/90 font-medium">UK-based team</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">✓</span>
                <span className="text-foreground/90 font-medium">Fully developed dielines</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">✓</span>
                <span className="text-foreground/90 font-medium">Ready for print run</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">✓</span>
                <span className="text-foreground/90 font-medium">Box and 24-roll format fully tested</span>
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
            <p className="text-lg text-foreground/90 font-medium">
              We'd welcome ASDA's view on the best route:
              whether Lulu should begin as a regional listing, national rollout, or phased trial.
            </p>
            <p className="text-lg text-foreground/90 font-medium">
              We're able to support whichever path fits your category strategy.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="p-6 bg-secondary/20 rounded-lg shadow">
                <h3 className="text-xl font-bold text-foreground mb-3">Options:</h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-foreground/90 font-medium">Regional trial (Wales, Midlands, value regions)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-foreground/90 font-medium">National family rollout</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-foreground/90 font-medium">Hero SKU only, with future variants ready</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">•</span>
                    <span className="text-foreground/90 font-medium">Promotional trials</span>
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
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">🎯</span>
                <span className="text-foreground/90 font-medium">Optional price-marked packs</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">📱</span>
                <span className="text-foreground/90 font-medium">Digital + social marketing from Lulu</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">🏴󠁧󠁢󠁷󠁬󠁳󠁿</span>
                <span className="text-foreground/90 font-medium">Welsh provenance story for PR</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">🎉</span>
                <span className="text-foreground/90 font-medium">Seasonal promotions</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">🌱</span>
                <span className="text-foreground/90 font-medium">Sustainability storytelling</span>
              </li>
              <li className="flex items-start gap-3 p-4 bg-background rounded-lg shadow">
                <span className="text-primary font-bold">💻</span>
                <span className="text-foreground/90 font-medium">Easy-to-share digital content</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 12.5 - RETAIL MARGIN BENCHMARK */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Retail Margin Analysis
          </h2>
          
          {/* First Table - Lulu Margin Outcomes */}
          <div className="max-w-5xl mx-auto mb-16">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Lulu Val-u-Smart Margin Outcomes (24-roll pack)
            </h3>
            <p className="text-sm text-foreground/80 mb-6">
              Wholesale cost to ASDA = £6.75 ex-VAT
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-background shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-primary text-primary-foreground">
                    <th className="p-4 text-left font-bold">Retail RRP (£)</th>
                    <th className="p-4 text-left font-bold">Cost to Retailer (£)</th>
                    <th className="p-4 text-left font-bold">Retailer Gross Margin (£)</th>
                    <th className="p-4 text-left font-bold">Retailer Gross Margin (%)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-secondary/10 transition-colors">
                    <td className="p-4 font-medium">8.99</td>
                    <td className="p-4">6.75</td>
                    <td className="p-4">2.24</td>
                    <td className="p-4 font-semibold text-primary">24.9%</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-secondary/10 transition-colors">
                    <td className="p-4 font-medium">9.99</td>
                    <td className="p-4">6.75</td>
                    <td className="p-4">3.24</td>
                    <td className="p-4 font-semibold text-primary">32.4%</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-secondary/10 transition-colors">
                    <td className="p-4 font-medium">10.99</td>
                    <td className="p-4">6.75</td>
                    <td className="p-4">4.24</td>
                    <td className="p-4 font-semibold text-primary">38.6%</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-secondary/10 transition-colors bg-primary/5">
                    <td className="p-4 font-medium">11.99</td>
                    <td className="p-4">6.75</td>
                    <td className="p-4">5.24</td>
                    <td className="p-4 font-bold text-primary">43.7%</td>
                  </tr>
                  <tr className="hover:bg-secondary/10 transition-colors">
                    <td className="p-4 font-medium">12.99</td>
                    <td className="p-4">6.75</td>
                    <td className="p-4">6.24</td>
                    <td className="p-4 font-semibold text-primary">48.0%</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Second Table - Competitive Comparison */}
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Competitive Margin Comparison
            </h3>
            <p className="text-sm text-foreground/80 mb-6">
              Estimated margins vs. comparable brands
            </p>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse bg-background shadow-lg rounded-lg overflow-hidden">
                <thead>
                  <tr className="bg-secondary text-secondary-foreground">
                    <th className="p-4 text-left font-bold">Brand & Pack</th>
                    <th className="p-4 text-left font-bold">Example Retail RRP (£)</th>
                    <th className="p-4 text-left font-bold">Cost to Retailer (£)</th>
                    <th className="p-4 text-left font-bold">Retailer Gross Margin (£)</th>
                    <th className="p-4 text-left font-bold">Margin %</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border hover:bg-secondary/10 transition-colors">
                    <td className="p-4 font-medium">Andrex (example 1)</td>
                    <td className="p-4">22.36</td>
                    <td className="p-4 text-muted-foreground">unknown</td>
                    <td className="p-4 text-muted-foreground">–</td>
                    <td className="p-4 text-muted-foreground">–</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-secondary/10 transition-colors">
                    <td className="p-4 font-medium">Andrex (example 2)</td>
                    <td className="p-4">16.68</td>
                    <td className="p-4 text-muted-foreground">unknown</td>
                    <td className="p-4 text-muted-foreground">–</td>
                    <td className="p-4 text-muted-foreground">–</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-secondary/10 transition-colors">
                    <td className="p-4 font-medium">Andrex (example 3)</td>
                    <td className="p-4 text-muted-foreground">(assume) £20.00</td>
                    <td className="p-4 text-muted-foreground">(assume ~£12)</td>
                    <td className="p-4 text-muted-foreground">~£8.00</td>
                    <td className="p-4 text-muted-foreground">~40%</td>
                  </tr>
                  <tr className="border-b border-border bg-primary/10 hover:bg-primary/20 transition-colors">
                    <td className="p-4 font-bold text-primary">Lulu*</td>
                    <td className="p-4 font-bold">11.99</td>
                    <td className="p-4 font-bold">6.75</td>
                    <td className="p-4 font-bold">5.24</td>
                    <td className="p-4 font-bold text-primary">43.7%</td>
                  </tr>
                  <tr className="border-b border-border hover:bg-secondary/10 transition-colors">
                    <td className="p-4 font-medium">Lulu</td>
                    <td className="p-4">10.99</td>
                    <td className="p-4">6.75</td>
                    <td className="p-4">4.24</td>
                    <td className="p-4 font-semibold">38.6%</td>
                  </tr>
                  <tr className="hover:bg-secondary/10 transition-colors">
                    <td className="p-4 font-medium">Lulu</td>
                    <td className="p-4">9.99</td>
                    <td className="p-4">6.75</td>
                    <td className="p-4">3.24</td>
                    <td className="p-4 font-semibold">32.4%</td>
                  </tr>
                </tbody>
              </table>
            </div>
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
          <p className="text-lg text-foreground/90 font-medium text-center max-w-2xl mx-auto mb-12">
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
        </div>
      </div>
    </div>;
};
export default Asda;