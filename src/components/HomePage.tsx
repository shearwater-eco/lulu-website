import { ArrowRight, Star, Truck, Shield, Heart, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import EcoBadges from "./EcoBadges";
import luluMascotThumbsUp from "@/assets/lulu-mascot-thumbs-up.png";
import luluMascotCoast from "@/assets/lulu-mascot-welsh-coast.png";
import luluBoxMockup from "@/assets/lulu-box-mockup.png";
import { useEffect, useRef, useState } from "react";

const HomePage = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasPlayedWelcome, setHasPlayedWelcome] = useState(false);

  const playWelcomeMessage = async () => {
    if (hasPlayedWelcome) return;
    
    try {
      // This will be replaced with your actual ElevenLabs API key
      const ELEVENLABS_API_KEY = "your-api-key-here";
      
      if (!ELEVENLABS_API_KEY || ELEVENLABS_API_KEY === "your-api-key-here") {
        console.log("ElevenLabs API key needed for Welsh voice");
        return;
      }

      const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/CwhRBWXzGAHq8TQ4Fs17", {
        method: "POST",
        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": ELEVENLABS_API_KEY
        },
        body: JSON.stringify({
          text: "Helloooo lovely",
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.0,
            use_speaker_boost: true
          }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.volume = 0.7;
        audio.play();
        setHasPlayedWelcome(true);
      }
    } catch (error) {
      console.error("Error playing welcome message:", error);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Video is visible - play Welsh welcome message
            playWelcomeMessage();
          }
        });
      },
      { threshold: 0.5 } // Play when 50% of video is visible
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
    };
  }, [hasPlayedWelcome]);

  return (
    <div className="lulu-frame">
      <div className="lulu-package">
        <div className="right-border"></div>
        <div className="bottom-border"></div>
        <div className="lulu-content">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-8 sm:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
                <div className="mosaic-border-small rounded-2xl inline-block p-4 sm:p-8 bg-white">
                  <p className="text-lg sm:text-xl lg:text-2xl text-foreground font-bold mb-2">
                    TOILET TISSUE
                  </p>
                  <p className="text-base sm:text-lg lg:text-xl text-foreground mb-4 lulu-subtitle">
                    by
                  </p>
                  <h1 className="lulu-title text-2xl sm:text-3xl lg:text-4xl text-black mb-4">
                    LULU
                  </h1>
                </div>
                
                <div className="lulu-tagline">
                  Gentle on you, kind to the Earth
                </div>
                
                <p className="text-base sm:text-lg text-muted-foreground max-w-lg mx-auto lg:mx-0">
                  Welsh sustainable paper products that don't compromise on quality. 
                  Join the eco-revolution with Lulu the Shearwater!
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start">
                  <button className="btn-lulu-primary text-sm sm:text-base px-6 sm:px-8 py-3">
                    Shop Now
                    <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 inline" />
                  </button>
                  <button className="btn-lulu-secondary text-sm sm:text-base px-6 sm:px-8 py-3">
                    For Businesses
                    <Users className="ml-2 h-4 sm:h-5 w-4 sm:w-5 inline" />
                  </button>
                </div>
              </div>

              <div className="relative">
                <div className="mosaic-border-small rounded-3xl bg-white p-4 sm:p-8">
                  <video 
                    ref={videoRef}
                    src="/lulu-video-website-2.mp4" 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full max-w-sm sm:max-w-md mx-auto drop-shadow-2xl animate-bounce-gentle"
                  />
                </div>
                <div className="absolute -bottom-2 sm:-bottom-4 -right-2 sm:-right-4 card-lulu px-3 sm:px-6 py-2 sm:py-3 rounded-full font-bold text-sm sm:text-lg animate-pulse">
                  Meet Lulu! 👋
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Highlights */}
        <section className="py-8 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h3 className="lulu-title text-xl sm:text-2xl text-foreground mb-4">
                Our Sustainable Range
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground lulu-subtitle">
                Premium quality without compromising the planet
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[
                {
                  title: "Toilet Tissue",
                  description: "Soft, strong, and sustainable. Perfect for everyday use.",
                  features: ["9 Rolls", "3-Ply", "FSC Certified"],
                  bgColor: "tile-green"
                },
                {
                  title: "Kitchen Rolls",
                  description: "Absorbent and eco-friendly for all your kitchen needs.",
                  features: ["6 Rolls", "2-Ply", "Plastic-Free"],
                  bgColor: "tile-blue"
                },
                {
                  title: "Facial Tissues",
                  description: "Gentle on your skin, gentle on the environment.",
                  features: ["Box of 150", "Ultra Soft", "Chemical-Free"],
                  bgColor: "tile-orange"
                }
              ].map((product, index) => (
                <div key={index} className="card-lulu hover:transform hover:scale-105 transition-all duration-300">
                  <div className="text-center">
                    <div 
                      className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center text-white text-2xl font-bold border-2 border-black"
                      style={{ backgroundColor: `hsl(var(--${product.bgColor}))` }}
                    >
                      {index + 1}
                    </div>
                    <h4 className="text-xl font-bold text-foreground mb-2 lulu-title text-lg">
                      {product.title}
                    </h4>
                    <p className="text-muted-foreground mb-4">
                      {product.description}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2 mb-4">
                      {product.features.map((feature, idx) => (
                        <span 
                          key={idx}
                          className="px-3 py-1 rounded-full font-medium text-sm text-white border border-black"
                          style={{ backgroundColor: `hsl(var(--${product.bgColor}))` }}
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                    <button className="btn-lulu-primary w-full">
                      Learn More
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Eco Certifications */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold text-foreground mb-4 lulu-title text-2xl">
                Trusted by Nature, Loved by You
              </h3>
              <p className="text-lg text-muted-foreground lulu-subtitle">
                Our eco-certifications speak for themselves
              </p>
            </div>
            <EcoBadges />
          </div>
        </section>

        {/* Why Choose LULU */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="mosaic-border-small rounded-2xl overflow-hidden">
                  <img 
                    src={luluMascotCoast} 
                    alt="Lulu the Shearwater in Welsh coastal landscape"
                    className="w-full"
                  />
                </div>
              </div>
              <div className="space-y-6">
                <h3 className="lulu-title text-2xl text-foreground">
                  Why Choose LULU?
                </h3>
                <div className="space-y-4">
                  {[
                    {
                      icon: Heart,
                      title: "Welsh Wildlife Protection",
                      description: "Supporting Welsh seabird conservation with every purchase. Lulu represents our commitment to protecting coastal wildlife.",
                      color: "tile-coral"
                    },
                    {
                      icon: Shield,
                      title: "Supermarket Quality",
                      description: "Premium quality that matches leading brands, without the environmental cost.",
                      color: "tile-purple"
                    },
                    {
                      icon: Truck,
                      title: "Convenient Delivery",
                      description: "Subscribe and never run out. Delivered right to your door.",
                      color: "tile-turquoise"
                    }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-start space-x-4">
                        <div 
                          className="flex-shrink-0 p-3 rounded-lg text-white border-2 border-black"
                          style={{ backgroundColor: `hsl(var(--${item.color}))` }}
                        >
                          <Icon className="h-6 w-6" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-foreground mb-1 lulu-title text-base">
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
                <button className="btn-lulu-primary">
                  Start Your Subscription
                  <ArrowRight className="ml-2 h-5 w-5 inline" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h3 className="lulu-title text-2xl text-foreground mb-4">
                What Our Customers Say
              </h3>
              <p className="text-lg text-muted-foreground lulu-subtitle">
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
                  color: "tile-green"
                },
                {
                  name: "James T.",
                  location: "London",
                  rating: 5,
                  review: "Switched our office to LULU. Great quality, competitive pricing, and sustainable!",
                  color: "tile-pink"
                },
                {
                  name: "Emma W.",
                  location: "Edinburgh",
                  rating: 5,
                  review: "The subscription service is perfect - never run out and delivered on time.",
                  color: "tile-yellow"
                }
              ].map((review, index) => (
                <div key={index} className="card-lulu hover:transform hover:scale-105 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current text-tile-yellow" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-4 lulu-subtitle">
                    "{review.review}"
                  </p>
                  <div className="text-sm">
                    <p className="font-semibold text-foreground lulu-title text-sm">{review.name}</p>
                    <p className="text-muted-foreground">{review.location}</p>
                  </div>
                  <div 
                    className="absolute top-4 right-4 w-4 h-4 rounded-full border border-black"
                    style={{ backgroundColor: `hsl(var(--${review.color}))` }}
                  ></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-8 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="mosaic-border-small rounded-3xl bg-white p-6 sm:p-12 text-center space-y-4 sm:space-y-6">
              <h3 className="lulu-title text-2xl sm:text-3xl lg:text-4xl text-foreground">
                Ready to Join the Eco-Revolution?
              </h3>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto lulu-subtitle">
                Make the switch to sustainable paper products without compromising on quality. 
                Lulu and the planet will thank you!
              </p>
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <button className="btn-lulu-primary text-base sm:text-xl px-6 sm:px-12 py-3 sm:py-6">
                  Shop Now
                  <ArrowRight className="ml-2 h-4 sm:h-5 w-4 sm:w-5 inline" />
                </button>
                <button className="btn-lulu-secondary text-base sm:text-xl px-6 sm:px-12 py-3 sm:py-6">
                  Learn More About Us
                </button>
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