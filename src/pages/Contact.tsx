import { Mail, Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import luluMascot from "@/assets/lulu-mascot.png";

const Contact = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-secondary/20 to-primary-light/20 py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-foreground mb-4 sm:mb-6">
                Get in Touch with Lulu
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-6 sm:mb-8">
                Have questions about our products? Need help with your order? 
                Want to chat about sustainability? Lulu and the team are here to help!
              </p>
              
              <div className="space-y-4 sm:space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Mail className="h-5 sm:h-6 w-5 sm:w-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm sm:text-base">Email Us</p>
                    <p className="text-muted-foreground text-sm sm:text-base">hello@lulu.earth</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                    <Phone className="h-5 sm:h-6 w-5 sm:w-6 text-secondary" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm sm:text-base">Call Us</p>
                    <p className="text-muted-foreground text-sm sm:text-base">+44 (0) 29 2000 0000</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-success/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 sm:h-6 w-5 sm:w-6 text-success" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm sm:text-base">Visit Us</p>
                    <p className="text-muted-foreground text-sm sm:text-base">Cardiff, Wales, UK</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-10 sm:w-12 h-10 sm:h-12 rounded-full bg-accent/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 sm:h-6 w-5 sm:w-6 text-accent" />
                  </div>
                  <div className="text-left">
                    <p className="font-semibold text-foreground text-sm sm:text-base">Support Hours</p>
                    <p className="text-muted-foreground text-sm sm:text-base">Mon-Fri, 9am-5pm GMT</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center mt-8 lg:mt-0">
              <div className="mosaic-border rounded-3xl bg-gradient-to-br from-primary-light/30 to-accent/20 p-4 sm:p-8">
                <img 
                  src={luluMascot} 
                  alt="Lulu the Shearwater ready to help"
                  className="w-full max-w-xs sm:max-w-sm mx-auto animate-bounce-gentle"
                />
                <div className="mt-4 bg-secondary/10 rounded-lg p-3 sm:p-4">
                  <p className="text-foreground font-medium text-sm sm:text-base">
                    "I'm here to help! Drop us a line and let's make the world a little greener together! 🌱"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-8 sm:py-12 lg:py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center lg:text-left">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground text-center lg:text-left">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
              
              <Card className="mosaic-border">
                <CardContent className="p-4 sm:p-6">
                  <form className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <Input placeholder="John" className="h-11" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <Input placeholder="Smith" className="h-11" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input type="email" placeholder="john@example.com" className="h-11" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input placeholder="How can we help?" className="h-11" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea 
                        placeholder="Tell us what's on your mind..."
                        rows={5}
                        className="resize-none"
                      />
                    </div>
                    
                    <Button className="btn-hero w-full text-base sm:text-lg py-3 h-12">
                      <MessageCircle className="mr-2 h-4 sm:h-5 w-4 sm:w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4 text-center lg:text-left">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground text-center lg:text-left">
                  Quick answers to common questions. Can't find what you're looking for? Send us a message!
                </p>
              </div>
              
              <div className="space-y-4">
                {[
                  {
                    question: "How sustainable are LULU products really?",
                    answer: "Every LULU product is FSC-certified, plastic-free, and chemical-free. We're as transparent as Lulu's honest face! Check our sustainability page for full details."
                  },
                  {
                    question: "Do you deliver outside Wales?",
                    answer: "Absolutely! We deliver across the UK with carbon-neutral shipping. Because good things should fly everywhere, just like our shearwater friends!"
                  },
                  {
                    question: "Can I cancel my subscription anytime?",
                    answer: "Of course! We believe in freedom - just like Lulu soaring over the Welsh coast. Cancel online anytime, no hard feelings!"
                  },
                  {
                    question: "How does LULU compare to supermarket brands?",
                    answer: "Same quality, better conscience! Our products match leading brands for softness and strength, but with zero plastic and full sustainability credentials."
                  },
                  {
                    question: "What if I'm not satisfied with my order?",
                    answer: "If you're not happy, Lulu's not happy! We offer hassle-free returns and exchanges within 30 days. Your satisfaction is our mission."
                  }
                ].map((faq, index) => (
                  <Card key={index} className="mosaic-border hover:shadow-md transition-all duration-300">
                    <CardContent className="p-4 sm:p-6">
                      <h4 className="font-semibold text-foreground mb-2 text-sm sm:text-base">
                        {faq.question}
                      </h4>
                      <p className="text-muted-foreground text-xs sm:text-sm">
                        {faq.answer}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;