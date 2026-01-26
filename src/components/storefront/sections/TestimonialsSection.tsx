import { Star } from 'lucide-react';

export function TestimonialsSection() {
  const testimonials = [
    {
      name: 'Sarah M.',
      location: 'Cardiff',
      rating: 5,
      text: 'Finally, toilet paper that\'s soft AND sustainable! My whole family loves LULU products.',
    },
    {
      name: 'James T.',
      location: 'London',
      rating: 5,
      text: 'The quality is amazing. I switched from a major brand and haven\'t looked back.',
    },
    {
      name: 'Emma L.',
      location: 'Manchester',
      rating: 5,
      text: 'Love knowing I\'m making an eco-friendly choice without sacrificing quality.',
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/50">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Join thousands of happy customers who've made the switch to LULU.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 rounded-lg bg-background border"
            >
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  />
                ))}
              </div>
              <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-sm text-muted-foreground">{testimonial.location}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
