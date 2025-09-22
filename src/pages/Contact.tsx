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
      <section className="bg-gradient-to-br from-secondary/20 to-primary-light/20 py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Get in Touch with Lulu
              </h1>
              <p className="text-lg text-muted-foreground mb-8">
                Have questions about our products? Need help with your order? 
                Want to chat about sustainability? Lulu and the team are here to help!
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Email Us</p>
                    <p className="text-muted-foreground">hello@lulu.earth</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                    <Phone className="h-6 w-6 text-secondary" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Call Us</p>
                    <p className="text-muted-foreground">+44 (0) 29 2000 0000</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-success/10 flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-success" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Visit Us</p>
                    <p className="text-muted-foreground">Cardiff, Wales, UK</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                    <Clock className="h-6 w-6 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Support Hours</p>
                    <p className="text-muted-foreground">Mon-Fri, 9am-5pm GMT</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <div className="mosaic-border rounded-3xl bg-gradient-to-br from-primary-light/30 to-accent/20 p-8">
                <img 
                  src={luluMascot} 
                  alt="Lulu the Shearwater ready to help"
                  className="w-full max-w-sm mx-auto animate-bounce-gentle"
                />
                <div className="mt-4 bg-secondary/10 rounded-lg p-4">
                  <p className="text-foreground font-medium">
                    "I'm here to help! Drop us a line and let's make the world a little greener together! 🌱"
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground">
                  We'd love to hear from you. Send us a message and we'll respond as soon as possible.
                </p>
              </div>
              
              <Card className="mosaic-border">
                <CardContent className="p-6">
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          First Name *
                        </label>
                        <Input placeholder="John" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                          Last Name *
                        </label>
                        <Input placeholder="Smith" />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Email *
                      </label>
                      <Input type="email" placeholder="john@example.com" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Subject *
                      </label>
                      <Input placeholder="How can we help?" />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">
                        Message *
                      </label>
                      <Textarea 
                        placeholder="Tell us what's on your mind..."
                        rows={5}
                      />
                    </div>
                    
                    <Button className="btn-hero w-full text-lg py-3">
                      <MessageCircle className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* FAQ Section */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  Frequently Asked Questions
                </h2>
                <p className="text-muted-foreground">
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
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-foreground mb-2">
                        {faq.question}
                      </h4>
                      <p className="text-muted-foreground text-sm">
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