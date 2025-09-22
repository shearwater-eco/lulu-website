import { Calendar, User, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const Blog = () => {
  const blogPosts = [
    {
      id: 1,
      title: "The Secret Life of Shearwaters: Why We Chose Lulu",
      excerpt: "Discover the fascinating world of Manx Shearwaters and why these incredible seabirds inspire our sustainability mission.",
      author: "Lulu Team",
      date: "March 15, 2024",
      category: "Wildlife",
      readTime: "5 min read"
    },
    {
      id: 2,
      title: "5 Simple Ways to Reduce Plastic in Your Daily Routine",
      excerpt: "Small changes, big impact. Learn practical tips to eliminate single-use plastics from your home and lifestyle.",
      author: "Sarah Green",
      date: "March 10, 2024", 
      category: "Sustainability",
      readTime: "3 min read"
    },
    {
      id: 3,
      title: "From Forest to Bathroom: The Journey of Sustainable Toilet Paper",
      excerpt: "Ever wondered how eco-friendly toilet paper is made? Follow our transparent supply chain from forest to your home.",
      author: "Tom Davies",
      date: "March 5, 2024",
      category: "Behind the Scenes",
      readTime: "7 min read" 
    },
    {
      id: 4,
      title: "Why FSC Certification Matters for Our Forests",
      excerpt: "Understanding forest certification and why it's crucial for protecting biodiversity and fighting climate change.",
      author: "Dr. Emma Roberts",
      date: "February 28, 2024",
      category: "Education",
      readTime: "4 min read"
    },
    {
      id: 5,
      title: "Customer Spotlight: How Cardiff Primary School Went Plastic-Free",
      excerpt: "Read how one Welsh school transformed their supply choices and inspired students to think about sustainability.",
      author: "Community Team",
      date: "February 20, 2024",
      category: "Customer Stories",
      readTime: "6 min read"
    },
    {
      id: 6,
      title: "The Real Cost of Conventional Paper Products",
      excerpt: "Breaking down the hidden environmental and social costs of traditional paper manufacturing.",
      author: "Research Team", 
      date: "February 15, 2024",
      category: "Research",
      readTime: "8 min read"
    }
  ];

  const categories = ["All", "Wildlife", "Sustainability", "Behind the Scenes", "Education", "Customer Stories", "Research"];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-accent/20 to-primary-light/20 py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            LULU Blog & News
          </h1>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Discover the latest in sustainable living, learn about Welsh wildlife, 
            and stay updated with LULU's eco-friendly mission.
          </p>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={`${category === "All" ? "btn-hero" : ""} rounded-full`}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post) => (
              <Card key={post.id} className="mosaic-border hover:shadow-lg transition-all duration-300 group">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                      {post.category}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {post.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center space-x-3">
                      <span className="flex items-center">
                        <User className="h-3 w-3 mr-1" />
                        {post.author}
                      </span>
                      <span className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        {post.date}
                      </span>
                    </div>
                  </div>
                  
                  <Button variant="ghost" className="w-full justify-between p-0 h-auto text-primary hover:text-primary/80">
                    Read More
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Stay Updated with LULU
          </h2>
          <p className="text-lg mb-8 opacity-90">
            Get the latest blog posts, sustainability tips, and wildlife stories delivered to your inbox.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 px-4 py-3 rounded-lg text-foreground"
            />
            <Button variant="secondary" className="px-6 py-3 bg-background text-foreground hover:bg-background/90">
              Subscribe
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;