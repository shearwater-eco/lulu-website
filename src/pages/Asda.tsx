import { useState } from "react";
import { Navigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useAuth } from "@/hooks/useAuth";
import { useUserRoles } from "@/hooks/useUserRoles";
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
import { Loader2 } from "lucide-react";

const Asda = () => {
  const { user, isLoading: authLoading } = useAuth();
  const { roles, isLoading: rolesLoading } = useUserRoles(user?.id);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

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

  // Show loading while checking auth
  if (authLoading || rolesLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="text-muted-foreground">Checking access...</p>
        </div>
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Check if user has admin or manager role
  const hasAccess = roles.some(r => r.role === 'admin' || r.role === 'manager');
  
  if (!hasAccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-background p-8 rounded-lg shadow-2xl border border-border text-center">
          <h1 className="text-3xl font-bold text-foreground mb-4">Access Denied</h1>
          <p className="text-muted-foreground mb-6">
            This page is restricted to authorized personnel only. Please contact an administrator if you need access.
          </p>
          <Button onClick={() => window.history.back()} variant="outline">
            Go Back
          </Button>
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
                <span className="text-foreground/90 font-medium">Full UK supply chain with redundancy</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground/90 font-medium">Competitive margins for retailer profitability</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-primary font-bold">•</span>
                <span className="text-foreground/90 font-medium">Strong promotional ROI potential</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 9 - PRICING */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Indicative Pricing – Val-U-Smart 24
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-background p-8 rounded-lg shadow-lg">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                    <span className="font-semibold text-foreground">Indicative RRP:</span>
                    <span className="text-2xl font-bold text-primary">£9.50</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                    <span className="font-semibold text-foreground">Cost to Retailer:</span>
                    <span className="text-2xl font-bold text-primary">£6.75</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-secondary/20 rounded-lg">
                    <span className="font-semibold text-foreground">Retailer Margin:</span>
                    <span className="text-2xl font-bold text-primary">~29%</span>
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-foreground">Competitive Comparison:</h3>
                  <ul className="space-y-2 text-foreground/90 font-medium">
                    <li>• Andrex Standard 24: £12–£14</li>
                    <li>• Who Gives A Crap 24: £24+</li>
                    <li>• Cushelle 24: £10–£12</li>
                    <li>• ASDA Own Label 24: £7–£8</li>
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    Lulu sits below mainstream brands while offering clear eco differentiation.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 10 - WHY ASDA */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Why Lulu for ASDA?
          </h2>
          <div className="max-w-4xl mx-auto">
            <ul className="space-y-4 text-lg">
              <li className="flex items-start gap-4 p-6 bg-secondary/20 rounded-lg">
                <span className="text-3xl">🎯</span>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Aligned with ASDA's values</h3>
                  <p className="text-foreground/90 font-medium">Sustainability, accessibility, and value for families</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-6 bg-secondary/20 rounded-lg">
                <span className="text-3xl">💰</span>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Strong margin opportunity</h3>
                  <p className="text-foreground/90 font-medium">Competitive cost structure with premium-like positioning</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-6 bg-secondary/20 rounded-lg">
                <span className="text-3xl">🌱</span>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Genuine eco credentials</h3>
                  <p className="text-foreground/90 font-medium">No greenwashing — authentic sustainability story</p>
                </div>
              </li>
              <li className="flex items-start gap-4 p-6 bg-secondary/20 rounded-lg">
                <span className="text-3xl">🎨</span>
                <div>
                  <h3 className="font-bold text-foreground mb-2">Distinctive shelf presence</h3>
                  <p className="text-foreground/90 font-medium">Stand out in a category dominated by sameness</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* SECTION 11 - NEXT STEPS */}
      <section className="py-20 bg-primary/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-foreground mb-8 text-center">
            Next Steps
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-background p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-6">We're ready to:</h3>
                <ul className="space-y-4 text-lg">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">1.</span>
                    <span className="text-foreground/90 font-medium">Provide samples for buyer review</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">2.</span>
                    <span className="text-foreground/90 font-medium">Present full range architecture</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">3.</span>
                    <span className="text-foreground/90 font-medium">Discuss regional or national rollout</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-bold">4.</span>
                    <span className="text-foreground/90 font-medium">Explore promotional calendar alignment</span>
                  </li>
                </ul>
              </div>
              <div className="bg-background p-8 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold text-foreground mb-6">Get in Touch</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                    <Input 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <Input 
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
                    <Input 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      placeholder="Your phone number"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Message</label>
                    <Textarea 
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      placeholder="How can we help?"
                      rows={4}
                    />
                  </div>
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 12 - CONTACT */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-foreground mb-8">
            Let's Build Something Great Together
          </h2>
          <p className="text-xl text-foreground/90 font-medium mb-8 max-w-2xl mx-auto">
            Lulu is more than toilet paper — it's a movement toward accessible sustainability. We'd love to explore how we can support ASDA's vision for a greener future.
          </p>
          <div className="space-y-4">
            <p className="text-lg text-foreground/90 font-medium">
              <strong>Email:</strong> paris@shearwatereco.com
            </p>
            <p className="text-lg text-foreground/90 font-medium">
              <strong>Phone:</strong> +44 (0) 7890 123456
            </p>
            <p className="text-lg text-foreground/90 font-medium">
              <strong>Website:</strong> lulu.earth
            </p>
          </div>
        </div>
      </section>

        </div>
      </div>
    </div>;
};

export default Asda;
