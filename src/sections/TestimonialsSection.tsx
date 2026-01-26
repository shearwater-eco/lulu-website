import { Star } from 'lucide-react';
import { RainbowBorder } from '../RainbowBorder';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
  dotColor: 'green' | 'pink' | 'yellow';
}

const testimonials: Testimonial[] = [
  {
    quote: "Love the quality and knowing I'm helping the environment. Lulu is adorable too!",
    author: 'SARAH M.',
    location: 'Cardiff',
    dotColor: 'green',
  },
  {
    quote: "Switched our office to LULU. Great quality, competitive pricing, and sustainable!",
    author: 'JAMES T.',
    location: 'London',
    dotColor: 'pink',
  },
  {
    quote: "The subscription service is perfect - never run out and delivered on time.",
    author: 'EMMA W.',
    location: 'Edinburgh',
    dotColor: 'yellow',
  },
];

const dotColorMap = {
  green: 'bg-[#4ADE80]',
  pink: 'bg-[#FF4D8D]',
  yellow: 'bg-[#FFE23E]',
};

function StarRating() {
  return (
    <div className="flex gap-1">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className="h-5 w-5 fill-[#FFE23E] text-[#FFE23E]" />
      ))}
    </div>
  );
}

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-28">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-serif tracking-wide">
            WHAT OUR CUSTOMERS SAY
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mt-4 font-serif italic">
            Join thousands of happy customers making the switch to sustainable
          </p>
        </div>

        {/* Testimonial cards */}
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <RainbowBorder key={index} animated>
              <div className="p-6 md:p-8 space-y-4 relative">
                {/* Decorative dot */}
                <div 
                  className={`absolute top-4 right-4 w-4 h-4 rounded-full ${dotColorMap[testimonial.dotColor]}`}
                />

                {/* Stars */}
                <StarRating />

                {/* Quote */}
                <p className="text-muted-foreground italic">
                  "{testimonial.quote}"
                </p>

                {/* Author */}
                <div>
                  <p className="font-bold">{testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            </RainbowBorder>
          ))}
        </div>
      </div>
    </section>
  );
}
