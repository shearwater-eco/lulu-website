import { Leaf, Recycle, Heart, MapPin } from 'lucide-react';

export function WhyChooseSection() {
  const features = [
    {
      icon: Leaf,
      title: 'Tree Free',
      description: 'Our products are made from 100% recycled materials, saving trees and reducing deforestation.',
    },
    {
      icon: Recycle,
      title: 'Fully Recyclable',
      description: 'Every LULU product and its packaging is fully recyclable, creating a circular economy.',
    },
    {
      icon: Heart,
      title: 'Gentle & Safe',
      description: 'Hypoallergenic and free from harsh chemicals, our products are gentle on sensitive skin.',
    },
    {
      icon: MapPin,
      title: 'Made in Wales',
      description: 'Proudly produced in Wales, supporting local jobs and reducing transport emissions.',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
            Why Choose LULU?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We believe in creating products that are good for people and the planet.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
