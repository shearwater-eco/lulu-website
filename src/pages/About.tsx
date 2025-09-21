import luluMascot from "@/assets/lulu-mascot.png";
import luluLandscape from "@/assets/lulu-mascot-landscape.png";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-light/20 to-accent/10 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Meet Lulu the Shearwater
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-4 sm:mb-6">
                Born from the rugged coastlines of Wales, Lulu represents everything we stand for: 
                resilience, sustainability, and a deep connection to nature.
              </p>
              <div className="mosaic-border rounded-lg p-3 sm:p-4 bg-card">
                <p className="text-sm sm:text-base text-foreground font-medium">
                  "I'm here to make sustainable living easy and joyful. Let's protect our planet together!"
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground mt-2">- Lulu 🐾</p>
              </div>
            </div>
            <div className="text-center mt-8 lg:mt-0">
              <img 
                src={luluMascot} 
                alt="Lulu the Shearwater mascot"
                className="w-full max-w-xs sm:max-w-md mx-auto animate-bounce-gentle"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="order-2 lg:order-1">
              <img 
                src={luluLandscape} 
                alt="Lulu in Welsh coastal landscape"
                className="w-full rounded-2xl shadow-lg"
              />
            </div>
            <div className="space-y-4 sm:space-y-6 order-1 lg:order-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-foreground text-center lg:text-left">
                Our Welsh Heritage
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground">
                LULU was born from a simple belief: you shouldn't have to choose between quality 
                and sustainability. Founded in the heart of Wales, we're inspired by the natural 
                beauty of our coastlines and the resilient spirit of the Shearwater bird.
              </p>
              <p className="text-sm sm:text-base text-muted-foreground">
                Every product we create reflects our commitment to Welsh craftsmanship and 
                environmental stewardship. From our plastic-free packaging to our FSC-certified 
                materials, we're proving that sustainable can be superb.
              </p>
              <div className="space-y-3 sm:space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    <strong className="text-foreground">2023:</strong> LULU founded with a mission to revolutionize paper products
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-secondary mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    <strong className="text-foreground">2024:</strong> Launched our full sustainable range across Wales
                  </p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                  <p className="text-sm sm:text-base text-muted-foreground">
                    <strong className="text-foreground">Today:</strong> Expanding UK-wide with our eco-friendly mission
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;